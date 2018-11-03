/**
 * Contract checks, assertions, and verifications
 * @module check
 */

const abis = require('./resources/abis.json');
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

// NB (jtobin):
//
//   Change the { result, reason } objects to use data.either or
//   folktale.Result at some point.

/**
 * Check if an address can create the specified galaxy.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
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
 * @return {Promise<Object>} A result and reason pair.
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
  let childClass = ships.getShipClass(prefix) + 1;
  let shipClass  = ships.getShipClass(ship);
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

async function canSetManagementProxy(contracts, ship, address) {
  return checkActiveShipOwner(contracts, ship, address);
}

async function canSetVotingProxy(contracts, ship, address) {
  if (!isGalaxy(ship)) return { result: false, reason: reasons.notGalaxy };
  return checkActiveShipOwner(contracts, ship, address);
}

/**
 * Check if an address can set a spawn proxy for the given ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canSetSpawnProxy(contracts, prefix, address) {
  return checkActiveShipOwner(contracts, prefix, address);
}

/**
 * Check if the sender address can send the provided ship to the target
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @param {String} sender - Sender's address.
 * @param {String} target - Target address.
 * @return {Promise<Object>} A result and reason pair.
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
 * @return {Promise<Object>} A result and reason pair.
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
 * Check if the target address can make a ship escape to the given sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {Number} sponsor - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canEscape(contracts, ship, sponsor, address) {
  let asm = await checkActiveShipManager(contracts, ship, address);
  if (!asm.result) {
    return asm;
  }
  let res = { result: false };
  let shipClass    = ships.getShipClass(ship);
  let sponsorClass = ships.getShipClass(sponsor);
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
 * Check if a ship is active and the target address is its owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function checkActiveShipOwner(contracts, ship, address) {
  let res = { result: false };
  let theShip = await ships.getShip(contracts, ship);
  // must be the owner of the ship
  if (!await ships.isOwner(contracts, theShip, address)) {
    res.reason = reasons.permission;
    return res;
  }
  // the ship must be active
  if (!await ships.isActive(contracts, theShip)) {
    res.reason = reasons.inactive;
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
 * @return {Promise<Object>} A result and reason pair.
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
 * Check if an address can configure public keys for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canConfigureKeys(contracts, ship, address) {
  return await checkActiveShipManager(contracts, ship, address);
}

/**
 * Check if the target address can adopt the escapee as its new sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canAdopt(contracts, escapee, address) {
  let res = { result: false };
  // escapee must currently be trying to escape
  let ship = await ships.getShip(contracts, escapee, 'state');
  if (!ship.escapeRequested) {
    res.reason = reasons.notEscape;
    return res;
  }
  // caller must manage the requested sponsor
  return await checkActiveShipManager(contracts, ship.escapeRequestedTo, address);
}

/**
 * Check if the target address can reject the escapee's request to the given
 * sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canReject(contracts, escapee, address) {
  // check is currently identical to adopt()'s.
  return await canAdopt(contracts, escapee, address);
}

/**
 * Check if the target address can detach a ship from its sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canDetach(contracts, ship, address)
{
  let res = { result: false };
  // ship must currently have a sponsor
  let theShip = await ships.getShip(contracts, ship, 'state');
  if (!theShip.hasSponsor) {
    res.reason = reasons.sponsorless;
    return res;
  }
  // caller must manage the requested sponsor
  return await checkActiveShipManager(contracts, theShip.sponsor, address);
}

/**
 * Check if a ship is active and an address can vote for it.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} voter - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function checkActiveShipVoter(contracts, galaxy, voter) {
  let res = { result: false }
  if (ships.getShipClass(galaxy) !== ships.ShipClass.Galaxy)
  {
    res.reason = reasons.notGalaxy;
    return res;
  }
  if (!await ships.canVoteAs(contracts, galaxy, voter))
  {
    res.reason = reasons.permission;
    return res;
  }
  if (!await ships.isActive(contracts, galaxy))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and ship can initiate a constitution poll at the
 *  given address.
 * @param {Object} web3 - A web3 object.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canStartConstitutionPoll(web3, contracts, galaxy, proposal, address) {
  let asv = await checkActiveShipVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false};
  let prop = new web3.eth.Contract(abis.constitution, proposal);
  let expected;
  try {
    expected = await prop.methods.previousConstitution().call()
  } catch(e) {
    expected = false;
  }
  if (contracts.constitution._address !== expected) // FIXME (jtobin): inappropriate comparison here
  {
    res.reason = reasons.upgradePath;
    return res;
  }
  if (await polls.constitutionHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  if (!canStartPoll(await polls.getConstitutionPoll(contracts, proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and ship can initiate the given proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canStartDocumentPoll(contracts, galaxy, proposal, address) {
  let asv = await checkActiveShipVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  if (await polls.documentHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  if (!canStartPoll(await polls.getDocumentPoll(contracts, proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and ship can vote on the proposal at the target
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canCastConstitutionVote(contracts, galaxy, proposal, address)
{
  let asv = await checkActiveShipVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await polls.constitutionHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await polls.getConstitutionPoll(contracts, proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await polls.hasVotedOnConstitutionPoll(contracts, galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and ship can vote on the proposal at the given
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canCastDocumentVote(contracts, galaxy, proposal, address)
{
  let asv = await checkActiveShipVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await polls.documentHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await polls.getDocumentPoll(contracts, proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await polls.hasVotedOnDocumentPoll(contracts, galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can set the DNS domains for the constitution.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
function canSetDnsDomains(contracts, address) {
  return isConstitutionOwner(contracts, address);
}

/**
 * Check if the target address can deposit the target star into the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} star - A (star) ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canDeposit(contracts, star, address)
{
  let ship = await ships.getShip(contracts, star);
  //
  let case1 = { result: false };
  let c1 = 0;
  if (!ships.isOwner(contracts, ship, address))
  {
    case1.reason = reasons.permission;
    c1 = 1;
  }
  else if (ships.hasBeenBooted(contracts, ship))
  {
    case1.reason = reasons.poolBoot;
    c1 = 2;
  }
  else if (!ships.isTransferProxy(contracts, ship, contracts.pool._address))
  {
    case1.reason = reasons.contractCant;
    c1 = 3;
  }
  else
  {
    case1.result = true;
  }
  if (case1.result) return case1;
  //
  let case2 = { result: false };
  let c2 = 0;
  let prefix = ships.getPrefix(star);
  if (!ships.isOwner(contracts, prefix, address))
  {
    case2.reason = reasons.permission;
    c2 = 1;
  }
  else if (ships.isActive(contracts, ship))
  {
    case2.reason = reasons.poolActive;
    c2 = 2;
  }
  else if (ships.isSpawnProxy(contracts, ship, contracts.pool._address))
  {
    case2.reason = reasons.contractCant;
    c2 = 3;
  }
  else
  {
    case2.result = true;
  }
  if (case2.result) return case2;
  //
  // give the error for the case that is closest to being possible,
  // or case 1 if they're equally close
  if (c2 > c1) return case2;
  return case1;
}

/**
 * Check if the target address can withdraw any star from the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canWithdrawAny(contracts, address)
{
  let res = { result: false };
  if (0 == await pool.getAssetCount(contracts))
  {
    res.reason = reasons.notInPool;
    return res;
  }
  let oneStar = await pool.getOneStar(contracts);
  let balance = await pool.getBalance(contracts, address);
  if (oneStar > balance)
  {
    res.reason = reasons.balance;
    return res;
  }
  res.result = true;
  return res;
}


/**
 * Check if the target address can withdraw the target star from the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} star - A (star) ship token.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canWithdraw(contracts, star, address)
{
  let res = { result: false };
  if (0 == await pool.getAssetIndex(contracts, star))
  {
    res.reason = reasons.notInPool;
    return res;
  }
  let oneStar = await pool.getOneStar(contracts);
  let balance = await pool.getBalance(contracts, address);
  if (oneStar > balance)
  {
    res.reason = reasons.balance;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their batch at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Object>} A result and reason pair.
 */
async function lsrCanWithdraw(contracts, address) {
  let res = { result: false };
  let rem = await linearSR.getRemainingStars(contracts, address);
  if (rem.length === 0) {
    res.reason = reasons.noRemaining;
    return res;
  }
  let bas = await linearSR.getBatch(contracts, address);
  let lim = await linearSR.getWithdrawLimit(contracts, address);
  if (bas.withdrawn >= lim) {
    res.reason = reasons.withdrawLimit;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their batch at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - The participant/registered address for the batch.
 * @param {String} to - The intended new address of the participant.
 * @return {Promise<Object>} A result and reason pair.
 */
async function lsrCanTransferBatch(contracts, from, to) {
  let res = { result: false };
  let apr = await linearSR.getApprovedTransfer(contracts, from);
  if (to !== apr) {
    res.reason = reasons.notApproved;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their commitment at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the commitment.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanWithdraw(contracts, address) {
  let res = { result: false };
  let rem = await conditionalSR.getRemainingStars(contracts, address);
  if (rem.length === 0) {
    res.reason = reasons.noRemaining;
    return res;
  }
  let com = await conditionalSR.getCommitment(contracts, address);
  let lim = await conditionalSR.getWithdrawLimit(contracts, address);
  // cannot withdraw more than the limit
  if (com.withdrawn >= lim) {
    res.reason = reasons.withdrawLimit;
    return res;
  }
  // cannot withdraw forfeited stars
  if (com.forfeit && rem.length <= com.forfeited) {
    res.reason = reasons.forfeitLimit;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their commitment at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - The participant/registered address for the commitment.
 * @param {String} to - The intended new address of the participant.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanTransferBatch(contracts, from, to) {
  let res = { result: false };
  let apr = await conditionalSR.getApprovedTransfer(contracts, from);
  if (to !== apr) {
    res.reason = reasons.notApproved;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can forfeit their commitment starting at the batch.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} batch - The batch they want to forfeit from.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanForfeit(contracts, batch, address) {
  let res = { result: false };
  let com = await conditionalSR.getCommitment(contracts, address);
  // can only forfeit if not yet forfeited,
  if (com.forfeit) {
    res.reason = reasons.hasForfeited;
    return res;
  }
  let det = await conditionalSR.getConditionsState(contracts);
  // and deadline has been missed.
  if (det.deadlines[batch] !== det.timestamps[batch]) {
    res.reason = reasons.notMissed;
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
  canSetManagementProxy,
  canSetVotingProxy,
  canSetSpawnProxy,
  canTransferShip,
  canSetTransferProxy,
  canConfigureKeys,
  canEscape,
  canAdopt,
  canReject,
  canDetach,
  checkActiveShipManager,
  checkActiveShipVoter,
  canStartConstitutionPoll,
  canStartDocumentPoll,
  canCastConstitutionVote,
  canCastDocumentVote,
  canSetDnsDomains,
  canDeposit,
  canWithdrawAny,
  canWithdraw,
  lsrCanWithdraw,
  lsrCanTransferBatch,
  csrCanWithdraw,
  csrCanTransferBatch,
  csrCanForfeit
}
