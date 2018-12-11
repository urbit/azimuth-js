
module.exports.owner = (contracts) => {
  return contracts.ecliptic.methods.owner().call();
}

module.exports.balanceOf = (contracts, address) => {
  return contracts.ecliptic.methods.balanceOf(address).call();
}

module.exports.ownerOf = (contracts, token) => {
  return contracts.ecliptic.methods.ownerOf(token).call();
}

module.exports.exists = (contracts, token) => {
  return contracts.ecliptic.methods.exists(token).call();
}

module.exports.getApproved = (contracts, token) => {
  return contracts.ecliptic.methods.getApproved(token).call();
}

module.exports.isApprovedForAll = (contracts, owner, operator) => {
  return contracts.ecliptic.methods.isApprovedForAll(owner, operator).call();
}

module.exports.getSpawnLimit = (contracts, ship, time) => {
  return contracts.ecliptic.methods.getSpawnLimit(ship, time).call();
}

module.exports.canEscapeTo = (contracts, ship, sponsor) => {
  return contracts.ecliptic.methods.canEscapeTo(ship, sponsor).call();
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

module.exports.safeTransferFrom = (contracts, _from, _to, _token) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.safeTransferFrom(
               _from, _to, _token);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferFrom = (contracts, _from, _to, _token) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.transferFrom(_from, _to, _token);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.approve = (contracts, _approved, _token) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.approve(_approved, _token);
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

module.exports.setManagementProxy = (contracts, _ship, _manager) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setManagementProxy(_ship, _manager);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.configureKeys =
  (contracts, _ship,
   _encryptionKey, _authenticationKey,
   _cryptoSuiteVersion, _discontinuous) => {
    let addr = contracts.ecliptic._address;
    let data = contracts.ecliptic.methods.configureKeys(
                 _ship, _encryptionKey, _authenticationKey,
                 _cryptoSuiteVersion, _discontinuous);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}

module.exports.spawn = (contracts, _ship, _target) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.spawn(_ship, _target);
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

module.exports.transferShip = (contracts, _ship, _target, _reset) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.transferShip(
               _ship, _target, _reset);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setTransferProxy = (contracts, _ship, _transferProxy) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setTransferProxy(
               _ship, _transferProxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.escape = (contracts, _ship, _sponsor) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.escape(_ship, _sponsor);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.cancelEscape = (contracts, _ship) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.cancelEscape(_ship);
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

module.exports.detach = (contracts, _ship) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.detach(_ship);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setVotingProxy = (contracts, _galaxy, _proxy) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.setVotingProxy(_galaxy, _proxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.startEclipticPoll = (contracts, _galaxy, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.startEclipticPoll(
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

module.exports.castEclipticVote =
  (contracts, _galaxy, _proposal, _vote) => {
    let addr = contracts.ecliptic._address;
    let data = contracts.ecliptic.methods.castEclipticVote(
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

module.exports.updateEclipticPoll = (contracts, _proposal) => {
  let addr = contracts.ecliptic._address;
  let data = contracts.ecliptic.methods.updateEclipticPoll(_proposal);
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
