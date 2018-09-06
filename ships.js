
const internal     = require('./internal/ships');
const utils        = require('./utils');

// generic API for ships
//
// typically:
//
// * if 'ship' is an object, will compute locally
// * if 'ship' is a uint, will hit the network
//
// NB (jtobin):
//
//   I'm not crazy about these things and am inclined to remove them.

function isOwner(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.owner, address);
  }
  return internal.isOwner(contracts, ship, address);
}

function getOwner(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.owner;
  }
  return internal.getOwner(contracts, ship);
}

function isActive(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.active;
  }
  return internal.isActive(contracts, ship);
}

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

function getKeyRevisionNumber(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.keyRevisionNumber;
  }
  return internal.getKeyRevisionNumber(contracts, ship);
}

function hasBeenBooted(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.keyRevisionNumber > 0;
  }
  return internal.hasBeenBooted(contracts, ship);
}

function isLive(contracts, ship) {
  if (typeof ship === 'object') {
    let ekey = ship.encryptionKey;
    let akey = ship.authenticationKey;
    let crsv = ship.cryptoSuiteVersion;

    return ekey !== 0 && akey !== 0 && crsv !== 0;
  }
  return internal.isLive(contracts, ship);
}

function getContinuityNumber(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.continuityNumber;
  }
  return internal.getContinuityNumber(contracts, ship);
}

function getSpawnCount(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.spawnCount;
  }
  return internal.getSpawnCount(contracts, ship);
}

function getSpawned(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.spawned;
  }
  return internal.getSpawned(contracts, ship);
}

function getSponsor(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.sponsor;
  }
  return internal.getSponsor(contracts, ship);
}

function hasSponsor(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.hasSponsor;
  }
  return internal.hasSponsor(contracts, ship);
}

function isSponsor(contracts, ship, address) {
  if (typeof ship === 'object') {
    return ship.hasSponsor && utils.addressEquals(ship.sponsor, address);
  }
  return internal.isSponsor(contracts, ship, address);
}

function isEscaping(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.escapeRequested;
  }
  return internal.isEscaping(contracts, ship);
}

function getEscapeRequest(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.escapeRequestedTo;
  }
  return internal.getEscapeRequest(contracts, ship);
}

function isRequestingEscapeTo(contracts, ship, sponsor) {
  if (typeof ship === 'object') {
    return ship.escapeRequested && ship.escapeRequestedTo === sponsor;
  }
  return internal.isRequestingEscapeTo(contracts, ship, sponsor);
}

function isSpawnProxy(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.spawnProxy, address);
  }
  return internal.isSpawnProxy(contracts, ship, address);
}

function getSpawnProxy(contracts, ship) {
  if (typeof ship === 'object') {
    return ship.spawnProxy;
  }
  return internal.getSpawnProxy(contracts, ship);
}

function isTransferProxy(contracts, ship, address) {
  if (typeof ship === 'object') {
    return utils.addressEquals(ship.transferProxy, address);
  }
  return internal.isTransferProxy(contracts, ship, address);
}

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

// first argument thrown out to keep API consistent
function getPrefix(_, ship) {
  if (ship < 65536) { return ship % 256; }
  return ship % 65536;
}

let ShipClass = {
  Galaxy: 0,
  Star:   1,
  Planet: 2
}

// first argument thrown out to keep API consistent
function getShipClass(_, ship) {
  if (ship < 256)   { return ShipClass.Galaxy; }
  if (ship < 65536) { return ShipClass.Star; }
  return ShipClass.Planet;
}

module.exports = {
  owner: internal.owner,
  getShip: internal.getShip,
  getOwnedByAddress: internal.getOwnedByAddress,
  getOwnedShipCount: internal.getOwnedShipCount,
  getOwnedShipsAtIndex: internal.getOwnedShipsAtIndex,
  isManager: internal.isManager,
  canManage: internal.canManage,
  getManagingForCount: internal.getManagingForCount,
  getManagingFor: internal.getManagingFor,
  isDelegate: internal.isDelegate,
  canVoteAs: internal.canVoteAs,
  getVotingForCount: internal.getVotingForCount,
  getVotingFor: internal.getVotingFor,
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
  getSpawningForCount: internal.getSpawningForCount,
  getSpawningFor: internal.getSpawningFor,
  isTransferProxy,
  getTransferProxy,
  getTransferringForCount: internal.getTransferringForCount,
  getTransferringFor: internal.getTransferringFor,
  getPrefix,
  getShipClass,
  isOperator: internal.isOperator
}

