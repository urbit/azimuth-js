/**
 * Contract checks, assertions, and verifications
 * @module check
 */

const constitution = require('./constitution');
const ships = require('./ships');
const polls = require('./polls');
const pool = require('./pool');
const utils = require('./utils');
const reasons = require('./resources/reasons.json');

const MAXGALAXY = 255;
const MAXSTAR = 65535;
const MAXPLANET = 4294967295;

/**
 * Check if something is a ship.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a ship, false otherwise.
 */
function isShip(ship) {
  return (typeof ship === 'number' && ship >= 0 && ship <= MAXPLANET);
}

/**
 * Check if something is a galaxy.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a galaxy, false otherwise.
 */
function isGalaxy(ship) {
  return (typeof ship === 'number' && ship >= 0 && ship <= MAXGALAXY);
}

/**
 * Check if something is a star.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a star, false otherwise.
 */
function isStar(ship) {
  return (typeof ship === 'number' && ship > MAXGALAXY && ship <= MAXSTAR);
}

/**
 * Check if something is a planet.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a planet, false otherwise.
 */
function isPlanet(ship) {
  return (typeof ship === 'number' && ship > MAXSTAR && ship <= MAXPLANET);
}

/**
 * Check if a ship is a parent of another ship.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a parent, false otherwise.
 */
function isParent(ship) {
  return (typeof ship === 'number' && ship > 0 && ship <= MAXSTAR);
}

/**
 * Check if a ship is a child of another ship.
 * @param {Number} ship - Ship token.
 * @return {Bool} True if a child, false otherwise.
 */
function isChild(ship) {
  return (typeof ship === 'number' && ship > MAXGALAXY && ship <= MAXPLANET);
}

/**
 * Check if a poll is active.
 * @param {Object} poll - A poll object.
 * @return {Bool} True if active, false otherwise.
 */
function pollIsActive(poll) {
  let now = Math.round(new Date().getTime()/1000);
  let end = poll.start + poll.duration;
  return now < end;
}

/**
 * Check if a poll can be started.
 * @param {Object} poll - A poll object.
 * @return {Bool} True if so, false otherwise.
 */
function canStartPoll(poll) {
  let now   = Math.round(new Date().getTime()/1000);
  let start = poll.start + poll.duration + poll.coolDown;
  return now > start;
}

/**
 * Check if a ship has an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function hasOwner(contracts, ship) {
  if (typeof ship === 'object') {
    return !utils.addressEquals(ship.owner, utils.zeroAddress());
  }
  return !await ships.isOwner(contracts, ship, utils.zeroAddress());
}

/**
 * Check if an address is the constitution owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Owner's address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function isConstitutionOwner(contracts, address) {
  return utils.addressEquals(address, await constitution.owner(contracts));
}

/**
 * Check if an address can create the specified galaxy.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canCreateGalaxy(contracts, galaxy, address) {
  let res = { result: false };
  // can't target zero address
  if (utils.isZeroAddress(address)) {
    res.reason = reasons.zero;
    return res;
  }
  // must be constitution owner
  if (!await isConstitutionOwner(contracts, address)) {
    res.reason = reasons.permission;
    return res;
  }
  // can't already exist
  if (await hasOwner(contracts, galaxy)) {
    res.reason = reasons.spawned;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if an address can spawn the given ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canSpawn(contracts, ship, target) {
  let res = { result: false };

  // prevents targeting the zero address
  if (utils.isZeroAddress(target)) {
    res.reason = reasons.zero;
    return res;
  }
  let prefix        = ships.getPrefix(ship);
  let parentShipObj = await ships.getShip(contracts, prefix);

  // must either be the owner of the parentShipObj, or a spawn proxy for it
  if (!ships.isOwner(contracts, parentShipObj, target) &&
      !ships.isSpawnProxy(contracts, parentShipObj, target))
  {
    res.reason = reasons.permission;
    return res;
  }

  // only currently unowned ships can be spawned
  if (await hasOwner(contracts, ship)) {
    res.reason = reasons.spawned;
    return res;
  }

  // only allow spawning of ships of the class directly below the prefix
  let childClass = ships.getShipClass(contracts, prefix) + 1;
  let shipClass  = ships.getShipClass(contracts, ship);
  if (childClass !== shipClass) {
    res.reason = reasons.spawnClass;
    return res;
  }

  // parent must be live and able to spawn
  let ts         = Math.round(new Date().getTime() / 1000);
  let spawnLimit = await constitution.getSpawnLimit(contracts, prefix, ts);
  if (!ships.hasBeenBooted(contracts, parentShipObj) ||
      parentShipObj.spawnCount >= spawnLimit)
  {
    res.reason = reasons.spawnPrefix;
    return res;
  }

  res.result = true
  return res;
}

/**
 * Check if an address can set a spawn proxy for the given ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canSetSpawnProxy(contracts, prefix, address) {
  let res = { result: false };
  let parentShip = await ships.getShip(contracts, prefix);
  // must be the owner of the ship
  if (!await ships.isOwner(contracts, parentShip, address)) {
    res.reason = reasons.permission;
    return res;
  }
  // the ship must be active
  if (!await ships.isActive(contracts, parentShip)) {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the sender address can send the provided ship to the target
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} sender - Sender's address.
 * @param {String} target - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canTransferShip(contracts, ship, source, target) {
  let res     = { result: false };
  // prevent burning of ships
  if (utils.isZeroAddress(target))
  {
    res.reason = reasons.zero;
    return res;
  }

  let shipObj = await ships.getShip(contracts, ship);
  // must be either the owner of the ship,
  // a transfer proxy for the ship,
  // or an operator for the owner
  if (!ships.isOwner(contracts, shipObj, source) &&
      !ships.isTransferProxy(contracts, shipObj, source) &&
      !await ships.isOperator(contracts, shipObj.owner, source))
  {
    res.reason = reasons.permission;
    return res;
  }

  res.result = true;
  return res;
}

/**
 * Check if the address can set a transfer proxy for the ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canSetTransferProxy(contracts, ship, address) {
  let res     = { result: false };
  let shipObj = await ships.getShip(contracts, ship);
  // must be either the owner of the ship,
  // or an operator for the owner
  if (!ships.isOwner(contracts, shipObj, address) &&
      !await ships.isOperator(contracts, shipObj.owner, address))
  {
    res.reason = reasons.permission;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can configure public keys for the ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canConfigureKeys(contracts, ship, address) {
  let res = { result: false };
  // must be able to manage ship
  if (!await ships.canManage(contracts, ship, address))
  {
    res.reason = reasons.permission;
    return res;
  }
  // ship must be active
  if (!await ships.isActive(contracts, ship))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can make a ship escape to the given sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {Number} sponsor - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canEscape(contracts, ship, sponsor, address) {
  let asm = await checkActiveShipManager(contracts, ship, address);
  if (!asm.result) {
    return asm;
  }
  let res = { result: false };
  let shipClass    = ships.getShipClass(contracts, ship);
  let sponsorClass = ships.getShipClass(contracts, sponsor);
  // can only escape to a ship one class higher than ourselves,
  // except in the special case where the escaping ship hasn't
  // been booted yet -- in that case we may escape to ships of
  // the same class, to support lightweight invitation chains.
  if (sponsorClass + 1 !== shipClass &&
      !(sponsorClass === shipClass &&
        !await ships.hasBeenBooted(contracts, ship)))
  {
    res.reason = reasons.sponsor;
    return res;
  }
  // can't escape to a sponsor that hasn't been booted
  if (!await ships.hasBeenBooted(contracts, sponsor))
  {
    res.reason = reasons.sponsorBoot;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a ship is active and the target address can manage it.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function checkActiveShipManager(contracts, ship, address) {
  res = { result: false };
  if (!await ships.canManage(contracts, ship, address))
  {
    res.reason = reasons.permission;
    return res;
  }
  if (!await ships.isActive(contracts, ship))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can adopt the escapee as its new sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's ship token.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canAdopt(contracts, sponsor, escapee, address) {
  let asm = await checkActiveShipManager(contracts, sponsor, address);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await ships.isRequestingEscapeTo(contracts, escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can reject the escapee's request to the given
 * sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {Number} escapee - Escapee's ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canReject(contracts, sponsor, escapee, address) {
  let asm = await checkActiveShipManager(contracts, sponsor, address);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await ships.isRequestingEscapeTo(contracts, escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can detach a ship from its sponsor.
 * sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {Number} ship - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function canDetach(contracts, sponsor, ship, address)
{
  let asm = await checkActiveShipManager(contracts, ship, address);
  if (!asm.result) return asm;
  let res = { result: false };
  // ship must currently be sponsored by sponsor
  if (!await ships.isSponsor(contracts, ship, sponsor))
  {
    res.reason = reasons.notSponsor;
    return res;
  }
  res.result = true;
  return res;
}

module.exports = {
  constitution,
  ships,
  polls,
  pool,
  isShip,
  isGalaxy,
  isStar,
  isPlanet,
  isParent,
  isChild,
  pollIsActive,
  canStartPoll,
  hasOwner,
  isConstitutionOwner,
  canCreateGalaxy,
  canSpawn,
  canSetSpawnProxy,
  canTransferShip,
  canSetTransferProxy,
  canConfigureKeys,
  canEscape,
  checkActiveShipManager,
  canAdopt,
  canReject,
  canDetach
}

