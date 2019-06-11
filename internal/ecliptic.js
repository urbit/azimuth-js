
const gen = require('./genTransaction')

module.exports.owner = (contracts) =>
  contracts.ecliptic.methods.owner().call()

module.exports.balanceOf = (contracts, address) =>
  contracts.ecliptic.methods.balanceOf(address).call()

module.exports.ownerOf = (contracts, point) =>
  contracts.ecliptic.methods.ownerOf(point).call()

module.exports.exists = (contracts, point) =>
  contracts.ecliptic.methods.exists(point).call()

module.exports.getApproved = (contracts, point) =>
  contracts.ecliptic.methods.getApproved(point).call()

module.exports.isApprovedForAll = (contracts, owner, operator) =>
  contracts.ecliptic.methods.isApprovedForAll(owner, operator).call()

module.exports.getSpawnLimit = (contracts, point, time) =>
  contracts.ecliptic.methods.getSpawnLimit(point, time).call()

module.exports.canEscapeTo = (contracts, point, sponsor) =>
  contracts.ecliptic.methods.canEscapeTo(point, sponsor).call()

module.exports.safeTransferFrom = (contracts, _from, _to, _point) =>
  gen.tx(contracts.ecliptic, 'safeTransferFrom', _from, _to, _point)

module.exports.transferFrom = (contracts, _from, _to, _point) =>
  gen.tx(contracts.ecliptic, 'transferFrom', _from, _to, _point)

module.exports.approve = (contracts, _approved, _point) =>
  gen.tx(contracts.ecliptic, 'approve', _approved, _point)

module.exports.setApprovalForAll = (contracts, _operator, _approved) =>
  gen.tx(contracts.ecliptic, 'setApprovalForAll', _operator, _approved)

module.exports.setManagementProxy = (contracts, _point, _manager) =>
  gen.tx(contracts.ecliptic, 'setManagementProxy', _point, _manager)

module.exports.configureKeys =
    (contracts, _point, _encryptionKey,
    _authenticationKey, _cryptoSuiteVersion, _discontinuous) =>
  gen.tx(
    contracts.ecliptic, 'configureKeys', _point, _encryptionKey,
    _authenticationKey, _cryptoSuiteVersion, _discontinuous)

module.exports.spawn = (contracts, _point, _target) =>
  gen.tx(contracts.ecliptic, 'spawn', _point, _target)

module.exports.setSpawnProxy = (contracts, _prefix, _spawnProxy) =>
  gen.tx(contracts.ecliptic, 'setSpawnProxy', _prefix, _spawnProxy)

module.exports.transferPoint = (contracts, _point, _target, _reset) =>
  gen.tx(contracts.ecliptic, 'transferPoint', _point, _target, _reset)

module.exports.setTransferProxy = (contracts, _point, _transferProxy) =>
  gen.tx(contracts.ecliptic, 'setTransferProxy', _point, _transferProxy)

module.exports.escape = (contracts, _point, _sponsor) =>
  gen.tx(contracts.ecliptic, 'escape', _point, _sponsor)

module.exports.cancelEscape = (contracts, _point) =>
  gen.tx(contracts.ecliptic, 'cancelEscape', _point)

module.exports.adopt = (contracts, _escapee) =>
  gen.tx(contracts.ecliptic, 'adopt', _escapee)

module.exports.reject = (contracts, _escapee) =>
  gen.tx(contracts.ecliptic, 'reject', _escapee)

module.exports.detach = (contracts, _point) =>
  gen.tx(contracts.ecliptic, 'detach', _point)

module.exports.setVotingProxy = (contracts, _galaxy, _proxy) =>
  gen.tx(contracts.ecliptic, 'setVotingProxy', _galaxy, _proxy)

module.exports.startUpgradePoll = (contracts, _galaxy, _proposal) =>
  gen.tx(contracts.ecliptic, 'startUpgradePoll', _galaxy, _proposal)

module.exports.startDocumentPoll = (contracts, _galaxy, _proposal) =>
  gen.tx(contracts.ecliptic, 'startDocumentPoll', _galaxy, _proposal)

module.exports.castUpgradeVote = (contracts, _galaxy, _proposal, _vote) =>
  gen.tx(contracts.ecliptic, 'castUpgradeVote', _galaxy, _proposal, _vote)

module.exports.castDocumentVote = (contracts, _galaxy, _proposal, _vote) =>
  gen.tx(contracts.ecliptic, 'castDocumentVote', _galaxy, _proposal, _vote)

module.exports.updateUpgradePoll = (contracts, _proposal) =>
  gen.tx(contracts.ecliptic, 'updateUpgradePoll', _proposal)

module.exports.updateDocumentPoll = (contracts, _proposal) =>
  gen.tx(contracts.ecliptic, 'updateDocumentPoll', _proposal)

module.exports.createGalaxy = (contracts, _galaxy, _target) =>
  gen.tx(contracts.ecliptic, 'createGalaxy', _galaxy, _target)

module.exports.setDnsDomains = (contracts, _primary, _secondary, _tertiary) =>
  gen.tx(contracts.ecliptic, 'setDnsDomains', _primary, _secondary, _tertiary)

