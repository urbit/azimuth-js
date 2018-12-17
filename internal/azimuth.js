
module.exports.owner = (contracts) => {
  return contracts.azimuth.methods.owner().call();
}

module.exports.getPoint = (contracts, point) => {
  return contracts.azimuth.methods.points(point).call();
}

module.exports.getRights = (contracts, point) => {
  return contracts.azimuth.methods.rights(point).call();
}

module.exports.getOwnedPointsByAddress = (contracts, address) => {
  return contracts.azimuth.methods.getOwnedPointsByAddress(address).call();
}

module.exports.getOwnedPointCount = (contracts, address) => {
  return contracts.azimuth.methods.getOwnedPointCount(address).call();
}

module.exports.getOwnedPointAtIndex = (contracts, address, idx) => {
  return contracts.azimuth.methods.getOwnedPointAtIndex(address, idx).call();
}

module.exports.isOwner = (contracts, point, address) => {
  return contracts.azimuth.methods.isOwner(point, address).call();
}

module.exports.getOwner = (contracts, point) => {
  return contracts.azimuth.methods.getOwner(point).call();
}

module.exports.isManagementProxy = (contracts, owner, manager) => {
  return contracts.azimuth.methods.isManagementProxy(owner, manager).call();
}

module.exports.canManage = (contracts, point, address) => {
  return contracts.azimuth.methods.canManage(point, address).call();
}

module.exports.getManagerForCount = (contracts, address) => {
  return contracts.azimuth.methods.getManagerForCount(address).call();
}

module.exports.getManagerFor = (contracts, address) => {
  return contracts.azimuth.methods.getManagerFor(address).call();
}

module.exports.isVotingProxy = (contracts, owner, delegate) => {
  return contracts.azimuth.methods.isVotingProxy(owner, delegate).call();
}

module.exports.canVoteAs = (contracts, point, address) => {
  return contracts.azimuth.methods.canVoteAs(point, address).call();
}

module.exports.getVotingForCount = (contracts, address) => {
  return contracts.azimuth.methods.getVotingForCount(address).call();
}

module.exports.getVotingFor = (contracts, address) => {
  return contracts.azimuth.methods.getVotingFor(address).call();
}

module.exports.isActive = (contracts, point) => {
  return contracts.azimuth.methods.isActive(point).call();
}

module.exports.getKeys = (contracts, point) => {
  return contracts.azimuth.methods.getKeys(point).call();
}

module.exports.getKeyRevisionNumber = (contracts, point) => {
  return contracts.azimuth.methods.getKeyRevisionNumber(point).call();
}

module.exports.hasBeenLinked = (contracts, point) => {
  return contracts.azimuth.methods.hasBeenLinked(point).call();
}

module.exports.isLive = (contracts, point) => {
  return contracts.azimuth.methods.isLive(point).call();
}

module.exports.getContinuityNumber = (contracts, point) => {
  return contracts.azimuth.methods.getContinuityNumber(point).call();
}

module.exports.getSpawnCount = (contracts, point) => {
  return contracts.azimuth.methods.getSpawnCount(point).call();
}

module.exports.getSpawned = (contracts, point) => {
  return contracts.azimuth.methods.getSpawned(point).call();
}

module.exports.getSponsor = (contracts, point) => {
  return contracts.azimuth.methods.getSponsor(point).call();
}

module.exports.hasSponsor = (contracts, point) => {
  return contracts.azimuth.methods.hasSponsor(point).call();
}

module.exports.isSponsor = (contracts, point, sponsor) => {
  return contracts.azimuth.methods.isSponsor(point, sponsor).call();
}

module.exports.isEscaping = (contracts, point) => {
  return contracts.azimuth.methods.isEscaping(point).call();
}

module.exports.getEscapeRequest = (contracts, point) => {
  return contracts.azimuth.methods.getEscapeRequest(point).call();
}

module.exports.isRequestingEscapeTo = (contracts, point, sponsor) => {
  return contracts.azimuth.methods.isRequestingEscapeTo(point, sponsor).call();
}

module.exports.isSpawnProxy = (contracts, point, address) => {
  return contracts.azimuth.methods.isSpawnProxy(point, address).call();
}

module.exports.getSpawnProxy = (contarct, point) => {
  return contracts.azimuth.methods.getSpawnProxy(point).call();
}

module.exports.getSpawningForCount = (contracts, address) => {
  return contracts.azimuth.methods.getSpawningForCount(address).call();
}

module.exports.getSpawningFor = (contracts, address) => {
  return contracts.azimuth.methods.getSpawningFor(address).call();
}

module.exports.isTransferProxy = (contracts, point, address) => {
  return contracts.azimuth.methods.isTransferProxy(point, address).call();
}

module.exports.getTransferProxy = (contracts, point) => {
  return contracts.azimuth.methods.getTransferProxy(point).call();
}

module.exports.getTransferringForCount = (contracts, address) => {
  return contracts.azimuth.methods.getTransferringForCount(address).call();
}

module.exports.getTransferringFor = (contracts, address) => {
  return contracts.azimuth.methods.getTransferringFor(address).call();
}

module.exports.isOperator = (contracts, owner, operator) => {
  return contracts.azimuth.methods.isOperator(owner, operator).call();
}
