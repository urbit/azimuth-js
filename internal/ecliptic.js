
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

function txFromMethod(contracts, method, ...args) {
  let tx = (to, data, value) => ({
    to: to,
    data: data,
    value: value || 0x0
  })
  let addr = contracts.ecliptic._address
  let data = contracts.ecliptic.methods[method].apply(this, args)
  let abi  = data.encodeABI()
  return tx(addr, abi, 0)
}

module.exports.safeTransferFrom = (contracts, _from, _to, _point) =>
  txFromMethod(contracts, 'safeTransferFrom', _from, _to, _point)

module.exports.transferFrom = (contracts, _from, _to, _point) =>
  txFromMethod(contracts, 'transferFrom', _from, _to, _point)

module.exports.approve = (contracts, _approved, _point) =>
  txFromMethod(contracts, 'approve', _approved, _point)

module.exports.setApprovalForAll = (contracts, _operator, _approved) =>
  txFromMethod(contracts, 'setApprovalForAll', _operator, _approved)

module.exports.setManagementProxy = (contracts, _point, _manager) =>
  txFromMethod(contracts, 'setManagementProxy', _point, _manager)

module.exports.configureKeys =
    (contracts, _point, _encryptionKey,
    _authenticationKey, _cryptoSuiteVersion, _discontinuous) =>
  txFromMethod(
    contracts, 'configureKeys', _point, _encryptionKey,
    _authenticationKey, _cryptoSuiteVersion, _discontinuous)

module.exports.spawn = (contracts, _point, _target) =>
  txFromMethod(contracts, 'spawn', _point, _target)

module.exports.setSpawnProxy = (contracts, _prefix, _spawnProxy) =>
  txFromMethod(contracts, 'setSpawnProxy', _prefix, _spawnProxy)

module.exports.transferPoint = (contracts, _point, _target, _reset) =>
  txFromMethod(contracts, 'transferPoint', _point, _target, _reset)

module.exports.setTransferProxy = (contracts, _point, _transferProxy) =>
  txFromMethod(contracts, 'setTransferProxy', _point, _transferProxy)

module.exports.escape = (contracts, _point, _sponsor) =>
  txFromMethod(contracts, 'escape', _point, _sponsor)

module.exports.cancelEscape = (contracts, _point) =>
  txFromMethod(contracts, 'cancelEscape', _point)

module.exports.adopt = (contracts, _escapee) =>
  txFromMethod(contracts, 'adopt', _escapee)

module.exports.reject = (contracts, _escapee) =>
  txFromMethod(contracts, 'reject', _escapee)

module.exports.detach = (contracts, _point) =>
  txFromMethod(contracts, 'detach', _point)

module.exports.setVotingProxy = (contracts, _galaxy, _proxy) =>
  txFromMethod(contracts, 'setVotingProxy', _galaxy, _proxy)

module.exports.startUpgradePoll = (contracts, _galaxy, _proposal) =>
  txFromMethod(contracts, 'startUpgradePoll', _galaxy, _proposal)

module.exports.startDocumentPoll = (contracts, _galaxy, _proposal) =>
  txFromMethod(contracts, 'startDocumentPoll', _galaxy, _proposal)

module.exports.castUpgradeVote = (contracts, _galaxy, _proposal, _vote) =>
  txFromMethod(contracts, 'castUpgradeVote', _galaxy, _proposal, _vote)

module.exports.castDocumentVote = (contracts, _galaxy, _proposal, _vote) =>
  txFromMethod(contracts, 'castDocumentVote', _galaxy, _proposal, _vote)

module.exports.updateUpgradePoll = (contracts, _proposal) =>
  txFromMethod(contracts, 'updateUpgradePoll', _proposal)

module.exports.updateDocumentPoll = (contracts, _proposal) =>
  txFromMethod(contracts, 'updateDocumentPoll', _proposal)

module.exports.createGalaxy = (contracts, _galaxy, _target) =>
  txFromMethod(contracts, 'createGalaxy', _galaxy, _target)

module.exports.setDnsDomains = (contracts, _primary, _secondary, _tertiary) =>
  txFromMethod(contracts, 'setDnsDomains', _primary, _secondary, _tertiary)

