
module.exports.owner = (contracts) => {
  return contracts.ecliptic.methods.owner().call();
}

module.exports.balanceOf = (contracts, address) => {
  return contracts.ecliptic.methods.balanceOf(address).call();
}

module.exports.ownerOf = (contracts, point) => {
  return contracts.ecliptic.methods.ownerOf(point).call();
}

module.exports.exists = (contracts, point) => {
  return contracts.ecliptic.methods.exists(point).call();
}

module.exports.getApproved = (contracts, point) => {
  return contracts.ecliptic.methods.getApproved(point).call();
}

module.exports.isApprovedForAll = (contracts, owner, operator) => {
  return contracts.ecliptic.methods.isApprovedForAll(owner, operator).call();
}

module.exports.getSpawnLimit = (contracts, point, time) => {
  return contracts.ecliptic.methods.getSpawnLimit(point, time).call();
}

module.exports.canEscapeTo = (contracts, point, sponsor) => {
  return contracts.ecliptic.methods.canEscapeTo(point, sponsor).call();
}

// NB (jtobin):
//
//   The following is extremely repetitive.  Could obviously abstract via
//   function pointers/variadic arguments, e.g. something like:
//
//     function txFromMethod(method, ...args) {
//       let addr = contracts.ecliptic._address;
//       let data = contracts.ecliptic.methods.method.apply(this, args);
//       let abi  = data.encodeABI();
//       return tx(addr, abi, 0);
//     }
//
//   Except handling 'method' appropriately.  But, given there are only a
//   handful of functions, it's probably not worth doing any metaprogramming.

const tx = (to, data, value) => ({
  to: to,
  data: data,
  value: value || 0x0
});

module.exports.safeTransferFrom = (contracts, _from, _to, _point) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.safeTransferFrom(
               _from, _to, _point);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferFrom = (contracts, _from, _to, _point) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.transferFrom(_from, _to, _point);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.approve = (contracts, _approved, _point) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.approve(_approved, _point);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setApprovalForAll = (contracts, _operator, _approved) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setApprovalForAll(
               _operator, _approved);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setManagementProxy = (contracts, _point, _manager) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setManagementProxy(_point, _manager);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.configureKeys =
  (contracts, _point,
   _encryptionKey, _authenticationKey,
   _cryptoSuiteVersion, _discontinuous) => {
    let addr = contracts.ecliptic._address;
    let data = contracts.ecliptic.methods.configureKeys(
                 _point, _encryptionKey, _authenticationKey,
                 _cryptoSuiteVersion, _discontinuous);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}

module.exports.spawn = (contracts, _point, _target) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.spawn(_point, _target);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setSpawnProxy = (contracts, _prefix, _spawnProxy) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setSpawnProxy(
               _prefix, _spawnProxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferPoint = (contracts, _point, _target, _reset) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.transferPoint(
               _point, _target, _reset);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setTransferProxy = (contracts, _point, _transferProxy) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setTransferProxy(
               _point, _transferProxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.escape = (contracts, _point, _sponsor) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.escape(_point, _sponsor);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.cancelEscape = (contracts, _point) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.cancelEscape(_point);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.adopt = (contracts, _escapee) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.adopt(_escapee);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.reject = (contracts, _escapee) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.reject(_escapee);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.detach = (contracts, _point) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.detach(_point);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setVotingProxy = (contracts, _galaxy, _proxy) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setVotingProxy(_galaxy, _proxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.startUpgradePoll = (contracts, _galaxy, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.startUpgradePoll(
               _galaxy, _proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.startDocumentPoll = (contracts, _galaxy, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.startDocumentPoll(
               _galaxy, _proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.castUpgradeVote =
  (contracts, _galaxy, _proposal, _vote) => {
    let addr = contracts.ecliptic._address;
    let data = contracts.ecliptic.methods.castUpgradeVote(
                 _galaxy, _proposal, _vote);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}

module.exports.castDocumentVote = (contracts, _galaxy, _proposal, _vote) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.castDocumentVote(
               _galaxy, _proposal, _vote);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.updateUpgradePoll = (contracts, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.updateUpgradePoll(_proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.updateDocumentPoll = (contracts, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.updateDocumentPoll(_proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.createGalaxy = (contracts, _galaxy, _target) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.createGalaxy(_galaxy, _target);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setDnsDomains =
  (contracts, _primary, _secondary, _tertiary) => {
    let addr = contracts.ecliptic._address;
    let data = contracts.ecliptic.methods.setDnsDomains(
                 _primary, _secondary, _tertiary);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}
