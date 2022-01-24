/**
 * Azimuth API
 * @module azimuth
 */

const internal = require('./internal/azimuth');
const utils = require('./utils');

//  Generic API for azimuth
//
//  Typically:
//
//  * if 'point' is an object, will compute locally
//  * if 'point' is a uint, will hit the network
//
//  Note that the type check for 'object' is weak, but intentionally so: the
//  type branch is intended to provide a generic API, and to work seamlessly
//  with Promises, rather than to prevent invalid inputs *per se*.

/**
 * The Azimuth contract's address on the Ethereum mainnet.
 *
 * Unlike that of the Ecliptic, Polls, etc. contracts, the Azimuth contract's
 * address never changes.  It is also registered as 'azimuth.eth' on ENS.
 */
const mainnet = '0x223c067f8cf28ae173ee5cafea60ca44c335fecb'

/**
 * Check if an address is the owner of a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @param {Number} address - Owner's address.
 * @return {Promise<Bool>} True if owner of the point, false otherwise.
 */
function isOwner(contracts, point, address) {
  if (typeof point === 'object') {
    return utils.addressEquals(point.owner, address);
  }
  return internal.isOwner(contracts, point, address);
}

/**
 * Get the owner of a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Address>} The point's owner.
 */
function getOwner(contracts, point) {
  if (typeof point === 'object') {
    return point.owner;
  }
  return internal.getOwner(contracts, point);
}

/**
 * Check if a point is active.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Bool>} True if the point is active, false otherwise.
 */
function isActive(contracts, point) {
  if (typeof point === 'object') {
    return point.active;
  }
  return internal.isActive(contracts, point);
}

/**
 * Get the key configuration for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Object>} The point's key configuration.
 */
function getKeys(contracts, point) {
  if (typeof point === 'object') {
    return {
      encryptionKey:      point.encryptionKey,
      authenticationKey:  point.authenticationKey,
      cryptoSuiteVersion: point.cryptoSuiteVersion,
      keyRevisionNumber:  point.keyRevisionNumber
    };
  }
  return internal.getKeys(contracts, point);
}

/**
 * Get the key revision number of a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Number>} The point's key revision number.
 */
function getKeyRevisionNumber(contracts, point) {
  if (typeof point === 'object') {
    return point.keyRevisionNumber;
  }
  return internal.getKeyRevisionNumber(contracts, point);
}

/**
 * Check if a point has been booted.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Bool>} True if it has been booted, false otherwise.
 */
function hasBeenLinked(contracts, point) {
  if (typeof point === 'object') {
    return point.keyRevisionNumber > 0;
  }
  return internal.hasBeenLinked(contracts, point);
}

/**
 * Check if a point is live.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Bool>} True if the point is live, false otherwise.
 */
function isLive(contracts, point) {
  if (typeof point === 'object') {
    let ekey = point.encryptionKey;
    let akey = point.authenticationKey;
    let crsv = point.cryptoSuiteVersion;

    return ekey !== 0 && akey !== 0 && crsv !== 0;
  }
  return internal.isLive(contracts, point);
}

/**
 * Get a point's continuity number.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Number>} The point's continuity number.
 */
function getContinuityNumber(contracts, point) {
  if (typeof point === 'object') {
    return point.continuityNumber;
  }
  return internal.getContinuityNumber(contracts, point);
}

/**
 * Get a point's spawn count.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Number>} The point's spawn count.
 */
function getSpawnCount(contracts, point) {
  return internal.getSpawnCount(contracts, point);
}

/**
 * Get an array of all child points the target point has spawned.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Array<Number>>} The spawned points.
 */
async function getSpawned(contracts, point) {
  //There is an inconsistency in the web3 library: in some versions 
  // getSpawned returns Array<Number>, in others Array<String>,
  // so map to Number to be on the safe side.
  return (await internal.getSpawned(contracts, point)).map(Number);
}

/**
 * Get a point's sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Number>} The point's sponsor.
 */
function getSponsor(contracts, point) {
  if (typeof point === 'object') {
    return point.sponsor;
  }
  return internal.getSponsor(contracts, point);
}

/**
 * Get an array of all points the target point is sponsoring.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Array<String>>} The points being sponsored.
 */
const getSponsoring = internal.getSponsoring;

/**
 * Get the number of points the target point is sponsoring.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Number>} The amount of points being sponsored.
 */
const getSponsoringCount = internal.getSponsoringCount;

/**
 * Check if a point has a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Bool>} True if the point has a sponsor, false otherwise.
 */
function hasSponsor(contracts, point) {
  if (typeof point === 'object') {
    return point.hasSponsor;
  }
  return internal.hasSponsor(contracts, point);
}

/**
 * Check if a point is the sponsor of another.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @param {Number} sponsor - The sponsor's point number.
 * @return {Promise<Bool>} True if a sponsor, false otherwise.
 */
function isSponsor(contracts, point, sponsor) {
  if (typeof point === 'object') {
    return point.hasSponsor && point.sponsor === sponsor;
  }
  return internal.isSponsor(contracts, point, sponsor);
}

/**
 * Check if a point is requesting escape.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Bool>} True if requesting escape, false otherwise.
 */
function isEscaping(contracts, point) {
  if (typeof point === 'object') {
    return point.escapeRequested;
  }
  return internal.isEscaping(contracts, point);
}

/**
 * Get the sponsor that another point is requesting escape to.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<Number>} The sponsor point number.
 */
function getEscapeRequest(contracts, point) {
  if (typeof point === 'object') {
    return point.escapeRequestedTo;
  }
  return internal.getEscapeRequest(contracts, point);
}

/**
 * Get a list of points that are requesting escape to a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Array<Number>>} An array of points requesting escape
 */
const getEscapeRequests = internal.getEscapeRequests;

/**
 * Get the number of points that are requesting escape to a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Number>} The number of points requesting escape
 */
const getEscapeRequestsCount = internal.getEscapeRequestsCount;

/**
 * Check if a point is requesting escape to another point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @param {Number} sponsor - Sponsor's point number.
 * @return {Promise<Bool>} True if escape to sponsor requested, false
 *  otherwise.
 */
function isRequestingEscapeTo(contracts, point, sponsor) {
  if (typeof point === 'object') {
    return point.escapeRequested && point.escapeRequestedTo === sponsor;
  }
  return internal.isRequestingEscapeTo(contracts, point, sponsor);
}

/**
 * Check if an address is a spawn proxy for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if address is spawn proxy, false otherwise.
 */
function isSpawnProxy(contracts, point, address) {
  if (typeof point === 'object') {
    return utils.addressEquals(point.spawnProxy, address);
  }
  return internal.isSpawnProxy(contracts, point, address);
}

/**
 * Get the spawn proxy for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<String>} The spawn proxy's address.
 */
function getSpawnProxy(contracts, point) {
  if (typeof point === 'object') {
    return point.spawnProxy;
  }
  return internal.getSpawnProxy(contracts, point);
}

/**
 * Check if an address is a transfer proxy for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if the address is a transfer proxy, false
 *  otherwise.
 */
function isTransferProxy(contracts, point, address) {
  if (typeof point === 'object') {
    return utils.addressEquals(point.transferProxy, address);
  }
  return internal.isTransferProxy(contracts, point, address);
}

/**
 * Get the transfer proxy for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number | Object} point - Point number or point object.
 * @return {Promise<String>} The transfer proxy's address.
 */
function getTransferProxy(contracts, point) {
  if (typeof point === 'object') {
    return point.transferProxy;
  }
  return internal.getTransferProxy(contracts, point);
}

// NB (jtobin):
//
//   The following do not work with cached point types, and AFAICT can not be
//   made to.

/**
 * Calculate the prefix of a point.
 * @param {Number} point - Point number.
 * @return {Number} The point's prefix.
 */
function getPrefix(point) {
  if (point < 65536) { return point % 256; }
  return point % 65536;
}

let PointSize = {
  Galaxy: 0,
  Star:   1,
  Planet: 2
}

/**
 * Calculate the size of a point.
 * @param {Number} point - Point number.
 * @return {Number} The point's size.
 */
function getPointSize(point) {
  if (point < 256)   { return PointSize.Galaxy; }
  if (point < 65536) { return PointSize.Star; }
  return PointSize.Planet;
}

/**
 * Get the azimuth contract owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<String>} The contract owner's address.
 */
const owner = internal.owner;

/**
 * Get a point object, given its point id.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {string} what - 'state', 'rights', defaults to 'both'
 * @return {Promise<Object>} A point object with the requested data.
 */
async function getPoint(contracts, point, what) {
  what = what || 'both';
  let data = {};
  if (what === 'both' || what === 'state') {
    data = await internal.getPoint(contracts, point);
  }
  if (what === 'both' || what === 'rights') {
    Object.assign(data, await internal.getRights(contracts, point));
  }
  return data;
}

/**
 * Get a list of unspawned/spawnable points
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Array<Number>>} - Unspawned children of point
 */
async function getUnspawnedChildren(contracts, point) {
  let size = getPointSize(point);
  if (size >= PointSize.Planet) {
    return [];
  }
  let spawned = await getSpawned(contracts, point);
  let unspawned = [];
  let childSpace = (size === PointSize.Galaxy) ? 0x100 : 0x10000;
  for (let i = 1; i < childSpace; i++) {
    let child = point + (i*childSpace);
    if (spawned.indexOf(child) < 0) {
      unspawned.push(child);
    }
  }
  return unspawned;
}

/**
 * Get the block at which the point was activated. Returns zero if it hasn't
 * been activated yet.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {Number} minBlock - (optional) Block to start search at. (Default 0.)
 * @param {Number} maxBlock - (optional) Block to end search at. (Default latest.)
 * @return {Promise<Number>} - Block of activation.
 */
async function getActivationBlock(contracts, point, minBlock, maxBlock) {
  minBlock = minBlock || 0;
  maxBlock = maxBlock || 'latest';
  const logs = await contracts.azimuth.getPastEvents('Activated', {
    fromBlock: minBlock,
    toBlock: maxBlock,
    filter: { point: [point] },
  });
  if (logs.length === 0) {
    return 0;
  } else {
    return logs[0].blockNumber;
  }
}

/**
 * Get the points that an address owns.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} An array of owned azimuth.
 */
const getOwnedPoints = internal.getOwnedPoints;

/**
 * Get a count of points owned by an address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} Owned point count for the address.
 */
const getOwnedPointCount = internal.getOwnedPointCount;

/**
 * Get the point at the given index of the array containing an owner's azimuth.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @param {Number} index - The index of the array.
 * @return {Promise<Number>} The point at the provided index.
 */
const getOwnedPointAtIndex = internal.getOwnedPointAtIndex;

/**
 * Check if an address is a manager for an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} owner - The owner's address.
 * @param {String} manager - The manager's address.
 * @return {Promise<Bool>} True if the address is a manager, false otherwise.
 */
const isManagementProxy = internal.isManagementProxy;

/**
 * Check if an address can manage a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - The manager's address.
 * @return {Promise<Bool>} True if the address can manage the point, false
 *  otherwise.
 */
const canManage = internal.canManage;

/**
 * Get a count of the points an address is managing.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of points being managed.
 */
const getManagerForCount = internal.getManagerForCount;

/**
 * Get the points an account is managing.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The points being managed.
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
 * Check if an address can vote for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - The target address.
 * @return {Promise<Bool>} True is the address can vote for the point, false
 *  otherwise.
 */
const canVoteAs = internal.canVoteAs;

/**
 * Get a count of the points an address can vote for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of points that can be voted for.
 */
const getVotingForCount = internal.getVotingForCount;

/**
 * Get the points an account is voting for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The points being voted for.
 */
const getVotingFor = internal.getVotingFor;

/**
 * Get a count of the points an address is a spawn proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of azimuth.
 */
const getSpawningForCount = internal.getSpawningForCount;

/**
 * Get the points an account is a spawn proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The azimuth.
 */
const getSpawningFor = internal.getSpawningFor;

/**
 * Get a count of the points an address is a transfer proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Number>} The count of azimuth.
 */
const getTransferringForCount = internal.getTransferringForCount;

/**
 * Get the points an account is a transfer proxy for.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Promise<Array<Number>>} The azimuth.
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
  mainnet,
  owner,
  getPoint,
  getOwnedPoints,
  getOwnedPointCount,
  getOwnedPointAtIndex,
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
  hasBeenLinked,
  isLive,
  getContinuityNumber,
  getSpawnCount,
  getSpawned,
  getUnspawnedChildren,
  getActivationBlock,
  getSponsor,
  getSponsoring,
  getSponsoringCount,
  hasSponsor,
  isSponsor,
  isEscaping,
  getEscapeRequest,
  getEscapeRequests,
  getEscapeRequestsCount,
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
  PointSize,
  getPointSize,
  isOperator
}
