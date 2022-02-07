
module.exports.owner = (contracts) =>
  contracts.azimuth.methods.owner().call()

module.exports.getPoint = (contracts, point) =>
  contracts.azimuth.methods.points(point).call()

module.exports.getRights = (contracts, point) =>
  contracts.azimuth.methods.rights(point).call()

module.exports.getOwnedPoints = (contracts, address) =>
  contracts.azimuth.methods.getOwnedPoints(address).call()

module.exports.getOwnedPointCount = (contracts, address) =>
  contracts.azimuth.methods.getOwnedPointCount(address).call()

module.exports.getOwnedPointAtIndex = (contracts, address, idx) =>
  contracts.azimuth.methods.getOwnedPointAtIndex(address, idx).call()

module.exports.isOwner = (contracts, point, address) =>
  contracts.azimuth.methods.isOwner(point, address).call()

module.exports.getOwner = (contracts, point) =>
  contracts.azimuth.methods.getOwner(point).call()

module.exports.isManagementProxy = (contracts, owner, manager) =>
  contracts.azimuth.methods.isManagementProxy(owner, manager).call()

module.exports.getManagementProxy = (contracts, point) =>
  contracts.azimuth.methods.getManagementProxy(point).call()

module.exports.canManage = (contracts, point, address) =>
  contracts.azimuth.methods.canManage(point, address).call()

module.exports.getManagerForCount = (contracts, address) =>
  contracts.azimuth.methods.getManagerForCount(address).call()

module.exports.getManagerFor = (contracts, address) =>
  contracts.azimuth.methods.getManagerFor(address).call()

module.exports.isVotingProxy = (contracts, owner, delegate) =>
  contracts.azimuth.methods.isVotingProxy(owner, delegate).call()

module.exports.canVoteAs = (contracts, point, address) =>
  contracts.azimuth.methods.canVoteAs(point, address).call()

module.exports.getVotingForCount = (contracts, address) =>
  contracts.azimuth.methods.getVotingForCount(address).call()

module.exports.getVotingFor = (contracts, address) =>
  contracts.azimuth.methods.getVotingFor(address).call()

module.exports.isActive = (contracts, point) =>
  contracts.azimuth.methods.isActive(point).call()

module.exports.getKeys = (contracts, point) =>
  contracts.azimuth.methods.getKeys(point).call()

module.exports.getKeyRevisionNumber = (contracts, point) =>
  contracts.azimuth.methods.getKeyRevisionNumber(point).call()

module.exports.hasBeenLinked = (contracts, point) =>
  contracts.azimuth.methods.hasBeenLinked(point).call()

module.exports.isLive = (contracts, point) =>
  contracts.azimuth.methods.isLive(point).call()

module.exports.getContinuityNumber = (contracts, point) =>
  contracts.azimuth.methods.getContinuityNumber(point).call()

module.exports.getSpawnCount = (contracts, point) =>
  contracts.azimuth.methods.getSpawnCount(point).call()

module.exports.getSpawned = (contracts, point) =>
  contracts.azimuth.methods.getSpawned(point).call()

module.exports.getSponsor = (contracts, point) =>
  contracts.azimuth.methods.getSponsor(point).call()

module.exports.getSponsoring = (contracts, point) =>
  contracts.azimuth.methods.getSponsoring(point).call()

module.exports.getSponsoringCount = (contracts, point) =>
  contracts.azimuth.methods.getSponsoringCount(point).call()

module.exports.hasSponsor = (contracts, point) =>
  contracts.azimuth.methods.hasSponsor(point).call()

module.exports.isSponsor = (contracts, point, sponsor) =>
  contracts.azimuth.methods.isSponsor(point, sponsor).call()

module.exports.isEscaping = (contracts, point) =>
  contracts.azimuth.methods.isEscaping(point).call()

module.exports.getEscapeRequest = (contracts, point) =>
  contracts.azimuth.methods.getEscapeRequest(point).call()

module.exports.getEscapeRequests = (contracts, point) =>
  contracts.azimuth.methods.getEscapeRequests(point).call()

module.exports.getEscapeRequestsCount = (contracts, point) =>
  contracts.azimuth.methods.getEscapeRequestsCount(point).call()

module.exports.isRequestingEscapeTo = (contracts, point, sponsor) =>
  contracts.azimuth.methods.isRequestingEscapeTo(point, sponsor).call()

module.exports.isSpawnProxy = (contracts, point, address) =>
  contracts.azimuth.methods.isSpawnProxy(point, address).call()

module.exports.getSpawnProxy = (contracts, point) =>
  contracts.azimuth.methods.getSpawnProxy(point).call()

module.exports.getSpawningForCount = (contracts, address) =>
  contracts.azimuth.methods.getSpawningForCount(address).call()

module.exports.getSpawningFor = (contracts, address) =>
  contracts.azimuth.methods.getSpawningFor(address).call()

module.exports.isTransferProxy = (contracts, point, address) =>
  contracts.azimuth.methods.isTransferProxy(point, address).call()

module.exports.getTransferProxy = (contracts, point) =>
  contracts.azimuth.methods.getTransferProxy(point).call()

module.exports.getTransferringForCount = (contracts, address) =>
  contracts.azimuth.methods.getTransferringForCount(address).call()

module.exports.getTransferringFor = (contracts, address) =>
  contracts.azimuth.methods.getTransferringFor(address).call()

module.exports.isOperator = (contracts, owner, operator) =>
  contracts.azimuth.methods.isOperator(owner, operator).call()
