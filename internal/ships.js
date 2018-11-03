
module.exports.owner = (contracts) => {
  return contracts.ships.methods.owner().call();
}

module.exports.getShip = (contracts, ship) => {
  return contracts.ships.methods.ships(ship).call();
}

module.exports.getRights = (contracts, ship) => {
  return contracts.ships.methods.rights(ship).call();
}

module.exports.getOwnedShipsByAddress = (contracts, address) => {
  return contracts.ships.methods.getOwnedShipsByAddress(address).call();
}

module.exports.getOwnedShipCount = (contracts, address) => {
  return contracts.ships.methods.getOwnedShipCount(address).call();
}

module.exports.getOwnedShipAtIndex = (contracts, address, idx) => {
  return contracts.ships.methods.getOwnedShipAtIndex(address, idx).call();
}

module.exports.isOwner = (contracts, ship, address) => {
  return contracts.ships.methods.isOwner(ship, address).call();
}

module.exports.getOwner = (contracts, ship) => {
  return contracts.ships.methods.getOwner(ship).call();
}

module.exports.isManagementProxy = (contracts, owner, manager) => {
  return contracts.ships.methods.isManagementProxy(owner, manager).call();
}

module.exports.canManage = (contracts, ship, address) => {
  return contracts.ships.methods.canManage(ship, address).call();
}

module.exports.getManagerForCount = (contracts, address) => {
  return contracts.ships.methods.getManagerForCount(address).call();
}

module.exports.getManagerFor = (contracts, address) => {
  return contracts.ships.methods.getManagerFor(address).call();
}

module.exports.isVotingProxy = (contracts, owner, delegate) => {
  return contracts.ships.methods.isVotingProxy(owner, delegate).call();
}

module.exports.canVoteAs = (contracts, ship, address) => {
  return contracts.ships.methods.canVoteAs(ship, address).call();
}

module.exports.getVotingForCount = (contracts, address) => {
  return contracts.ships.methods.getVotingForCount(address).call();
}

module.exports.getVotingFor = (contracts, address) => {
  return contracts.ships.methods.getVotingFor(address).call();
}

module.exports.isActive = (contracts, ship) => {
  return contracts.ships.methods.isActive(ship).call();
}

module.exports.getKeys = (contracts, ship) => {
  return contracts.ships.methods.getKeys(ship).call();
}

module.exports.getKeyRevisionNumber = (contracts, ship) => {
  return contracts.ships.methods.getKeyRevisionNumber(ship).call();
}

module.exports.hasBeenBooted = (contracts, ship) => {
  return contracts.ships.methods.hasBeenBooted(ship).call();
}

module.exports.isLive = (contracts, ship) => {
  return contracts.ships.methods.isLive(ship).call();
}

module.exports.getContinuityNumber = (contracts, ship) => {
  return contracts.ships.methods.getContinuityNumber(ship).call();
}

module.exports.getSpawnCount = (contracts, ship) => {
  return contracts.ships.methods.getSpawnCount(ship).call();
}

module.exports.getSpawned = (contracts, ship) => {
  return contracts.ships.methods.getSpawned(ship).call();
}

module.exports.getSponsor = (contracts, ship) => {
  return contracts.ships.methods.getSponsor(ship).call();
}

module.exports.hasSponsor = (contracts, ship) => {
  return contracts.ships.methods.hasSponsor(ship).call();
}

module.exports.isSponsor = (contracts, ship, sponsor) => {
  return contracts.ships.methods.isSponsor(ship, sponsor).call();
}

module.exports.isEscaping = (contracts, ship) => {
  return contracts.ships.methods.isEscaping(ship).call();
}

module.exports.getEscapeRequest = (contracts, ship) => {
  return contracts.ships.methods.getEscapeRequest(ship).call();
}

module.exports.isRequestingEscapeTo = (contracts, ship, sponsor) => {
  return contracts.ships.methods.isRequestingEscapeTo(ship, sponsor).call();
}

module.exports.isSpawnProxy = (contracts, ship, address) => {
  return contracts.ships.methods.isSpawnProxy(ship, address).call();
}

module.exports.getSpawnProxy = (contarct, ship) => {
  return contracts.ships.methods.getSpawnProxy(ship).call();
}

module.exports.getSpawningForCount = (contracts, address) => {
  return contracts.ships.methods.getSpawningForCount(address).call();
}

module.exports.getSpawningFor = (contracts, address) => {
  return contracts.ships.methods.getSpawningFor(address).call();
}

module.exports.isTransferProxy = (contracts, ship, address) => {
  return contracts.ships.methods.isTransferProxy(ship, address).call();
}

module.exports.getTransferProxy = (contracts, ship) => {
  return contracts.ships.methods.getTransferProxy(ship).call();
}

module.exports.getTransferringForCount = (contracts, address) => {
  return contracts.ships.methods.getTransferringForCount(address).call();
}

module.exports.getTransferringFor = (contracts, address) => {
  return contracts.ships.methods.getTransferringFor(address).call();
}

module.exports.isOperator = (contracts, owner, operator) => {
  return contracts.ships.methods.isOperator(owner, operator).call();
}
