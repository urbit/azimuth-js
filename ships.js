/**
 * Ships API
 * @module ships
 */

const internal = require('./internal/ships');
const utils = require('./utils');

//  Generic API for ships
//
//  Typically:
//
//  * if 'ship' is an object, will compute locally
//  * if 'ship' is a uint, will hit the network
//
//  Note that the type check for 'object' is weak, but intentionally so: the
//  type branch is intended to provide a generic API, and to work seamlessly
//  with Promises, rather than to prevent invalid inputs *per se*.

/**
 * Check if an address is the owner of a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @param {Number} address - Owner's address.
 * @return {Promise<Bool>} True if owner of the ship, false otherwise.
 */
function isOwner(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.owner, address);
  }
  return internal.isOwner(contracts, ship, address);
}

/**
 * Get the owner of a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Address>} The ship's owner.
 */
function getOwner(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.owner;
  }
  return internal.getOwner(contracts, ship);
}

/**
 * Check if a ship is active.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if the ship is active, false otherwise.
 */
function isActive(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.active;
  }
  return internal.isActive(contracts, ship);
}

/**
 * Get the key configuration for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Object>} The ship's key configuration.
 */
function getKeys(contracts, ship) {
  if (typeof ship === 'object') {
    return {
      encryptionKey:      ship.encryptionKey,
      authenticationKey:  ship.authenticationKey,
      cryptoSuiteVersion: ship.cryptoSuiteVersion,
      keyRevisionNumber:  ship.keyRevisionNumber
    };
  }
  return internal.getKeys(contracts, ship);
}

/**
 * Get the key revision number of a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Number>} The ship's key revision number.
 */
function getKeyRevisionNumber(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.keyRevisionNumber;
  }
  return internal.getKeyRevisionNumber(contracts, ship);
}

/**
 * Check if a ship has been booted.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if it has been booted, false otherwise.
 */
function hasBeenBooted(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.keyRevisionNumber > 0;
  }
  return internal.hasBeenBooted(contracts, ship);
}

/**
 * Check if a ship is live.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if the ship is live, false otherwise.
 */
function isLive(contracts, ship) {
  if (typeof ship === 'object') {
    let ekey = ship.encryptionKey;
    let akey = ship.authenticationKey;
    let crsv = ship.cryptoSuiteVersion;

    return ekey !== 0 && akey !== 0 && crsv !== 0;
  }
  return internal.isLive(contracts, ship);
}

/**
 * Get a ship's continuity number.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Number>} The ship's continuity number.
 */
function getContinuityNumber(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.continuityNumber;
  }
  return internal.getContinuityNumber(contracts, ship);
}

/**
 * Get a ship's spawn count.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @return {Promise<Number>} The ship's spawn count.
 */
function getSpawnCount(contracts, ship) {
  return internal.getSpawnCount(contracts, ship);
}

/**
 * Check if a ship has been spawned.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if the ship has been spawned, false
 *  otherwise.
 */
function getSpawned(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.spawned;
  }
  return internal.getSpawned(contracts, ship);
}

/**
 * Get a ship's sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Number>} The ship's sponsor.
 */
function getSponsor(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.sponsor;
  }
  return internal.getSponsor(contracts, ship);
}

/**
 * Check if a ship has a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if the ship has a sponsor, false otherwise.
 */
function hasSponsor(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.hasSponsor;
  }
  return internal.hasSponsor(contracts, ship);
}

/**
 * Check if a ship is the sponsor of another.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @param {Number} sponsor - The sponsor's ship token.
 * @return {Promise<Bool>} True if a sponsor, false otherwise.
 */
function isSponsor(contracts, ship, sponsor) {
  if (typeof ship === 'object') {
    return ship.hasSponsor && ship.sponsor === sponsor;
  }
  return internal.isSponsor(contracts, ship, sponsor);
}

/**
 * Check if a ship is requesting escape.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Bool>} True if requesting escape, false otherwise.
 */
function isEscaping(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.escapeRequested;
  }
  return internal.isEscaping(contracts, ship);
}

/**
 * Get the sponsor that another ship is requesting escape to.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<Number>} The sponsor ship token.
 */
function getEscapeRequest(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.escapeRequestedTo;
  }
  return internal.getEscapeRequest(contracts, ship);
}

/**
 * Check if a ship is requesting escape to another ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @return {Promise<Bool>} True if escape to sponsor requested, false
 *  otherwise.
 */
function isRequestingEscapeTo(contracts, ship, sponsor) {
  if (typeof ship === 'object') {
    return ship.escapeRequested && ship.escapeRequestedTo === sponsor;
  }
  return internal.isRequestingEscapeTo(contracts, ship, sponsor);
}

/**
 * Check if an address is a spawn proxy for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if address is spawn proxy, false otherwise.
 */
function isSpawnProxy(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.spawnProxy, address);
  }
  return internal.isSpawnProxy(contracts, ship, address);
}

/**
 * Get the spawn proxy for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<String>} The spawn proxy's address.
 */
function getSpawnProxy(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.spawnProxy;
  }
  return internal.getSpawnProxy(contracts, ship);
}

/**
 * Check if an address is a transfer proxy for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if the address is a transfer proxy, false
 *  otherwise.
 */
function isTransferProxy(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.transferProxy, address);
  }
  return internal.isTransferProxy(contracts, ship, address);
}

/**
 * Get the transfer proxy for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} ship - Ship token or ship object.
 * @return {Promise<String>} The transfer proxy's address.
 */
function getTransferProxy(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.transferProxy;
  }
  return internal.getTransferProxy(contracts, ship);
}

// NB (jtobin):
//
//   The following do not work with cached ship types, and AFAICT can not be
//   made to.

/**
 * Calculate the prefix of a ship.
 * @param {Number} ship - Ship token.
 * @return {Number} The ship's prefix.
 */
function getPrefix(ship) {
  if (ship < 65536) { return ship % 256; }
  return ship % 65536;
}

let ShipClass = {
  Galaxy: 0,
  Star:   1,
  Planet: 2
}

/**
 * Calculate the class of a ship.
 * @param {Number} ship - Ship token.
 * @return {Number} The ship's class.
 */
function getShipClass(ship) {
  if (ship < 256)   { return ShipClass.Galaxy; }
  if (ship < 65536) { return ShipClass.Star; }
  return ShipClass.Planet;
}

/**
 * Get the ships contract owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<String>} The contract owner's address.
 */
const owner = internal.owner;

/**
 * Get a ship object, given its token id.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {string} what - 'state', 'rights', defaults to 'both'
 * @return {Promise<Object>} A ship object with the requested data.
 */
async function getShip(contracts, ship, what) {
  what = what || 'both';
  let data = {};
  if (what === 'both' || what === 'state') {
    data = await internal.getShip(contracts, ship);
  }
  if (what === 'both' || what === 'rights') {
    Object.assign(data, await internal.getRights(contracts, ship));
  }
  return data;
}

/**
 * Get the ships that an address owns.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} An array of owned ships.
 */
const getOwnedShipsByAddress = internal.getOwnedShipsByAddress;

/**
 * Get a count of ships owned by an address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} Owned ship count for the address.
 */
const getOwnedShipCount = internal.getOwnedShipCount;

/**
 * Get the ship at the given index of the array containing an owner's ships.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @param {Number} index - The index of the array.
 * @return {Promise<Number>} The ship at the provided index.
 */
const getOwnedShipAtIndex = internal.getOwnedShipAtIndex;

/**
 * Check if an address is a manager for an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} owner - The owner's address.
 * @param {String} manager - The manager's address.
 * @return {Promise<Bool>} True if the address is a manager, false otherwise.
 */
const isManagementProxy = internal.isManagementProxy;

/**
 * Check if an address can manage a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - The manager's address.
 * @return {Promise<Bool>} True if the address can manage the ship, false
 *  otherwise.
 */
const canManage = internal.canManage;

/**
 * Get a count of the ships an address is managing.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of ships being managed.
 */
const getManagerForCount = internal.getManagerForCount;

/**
 * Get the ships an account is managing.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The ships being managed.
 */
const getManagerFor = internal.getManagerFor;

/**
 * Check if an address is a voting proxy for an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The owner's address.
 * @param {String} address - The voting proxy's address.
 * @return {Promise<Bool>} True is voting proxy, false otherwise.
 */
const isVotingProxy = internal.isVotingProxy;

/**
 * Check if an address can vote for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - The target address.
 * @return {Promise<Bool>} True is the address can vote for the ship, false
 *  otherwise.
 */
const canVoteAs = internal.canVoteAs;

/**
 * Get a count of the ships an address can vote for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of ships that can be voted for.
 */
const getVotingForCount = internal.getVotingForCount;

/**
 * Get the ships an account is voting for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The ships being voted for.
 */
const getVotingFor = internal.getVotingFor;

/**
 * Get a count of the ships an address is a spawn proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of ships.
 */
const getSpawningForCount = internal.getSpawningForCount;

/**
 * Get the ships an account is a spawn proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The ships.
 */
const getSpawningFor = internal.getSpawningFor;

/**
 * Get a count of the ships an address is a transfer proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of ships.
 */
const getTransferringForCount = internal.getTransferringForCount;

/**
 * Get the ships an account is a transfer proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The ships.
 */
const getTransferringFor = internal.getTransferringFor;

/**
 * Check if an address is an operator for another.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The owner's address.
 * @param {String} address - The operator's address.
 * @return {Promise<Bool>} True is operator, false otherwise.
 */
const isOperator = internal.isOperator;

module.exports = {
  owner,
  getShip,
  getOwnedShipsByAddress,
  getOwnedShipCount,
  getOwnedShipAtIndex,
  isManagementProxy,
  canManage,
  getManagerForCount,
  getManagerFor,
  isVotingProxy,
  canVoteAs,
  getVotingForCount,
  getVotingFor,
  isOwner,
  getOwner,
  isActive,
  getKeys,
  getKeyRevisionNumber,
  hasBeenBooted,
  isLive,
  getContinuityNumber,
  getSpawnCount,
  getSpawned,
  getSponsor,
  hasSponsor,
  isSponsor,
  isEscaping,
  getEscapeRequest,
  isRequestingEscapeTo,
  isSpawnProxy,
  getSpawnProxy,
  getSpawningForCount,
  getSpawningFor,
  isTransferProxy,
  getTransferProxy,
  getTransferringForCount,
  getTransferringFor,
  getPrefix,
  ShipClass,
  getShipClass,
  isOperator
}
