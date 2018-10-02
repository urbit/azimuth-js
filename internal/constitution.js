
module.exports.owner = (contracts) => {
  return contracts.constitution.methods.owner().call();
}

module.exports.balanceOf = (contracts, address) => {
  return contracts.constitution.methods.balanceOf(address).call();
}

module.exports.ownerOf = (contracts, token) => {
  return contracts.constitution.methods.ownerOf(token).call();
}

module.exports.exists = (contracts, token) => {
  return contracts.constitution.methods.exists(token).call();
}

module.exports.getApproved = (contracts, token) => {
  return contracts.constitution.methods.getApproved(token).call();
}

module.exports.isApprovedForAll = (contracts, owner, operator) => {
  return contracts.constitution.methods.isApprovedForAll(owner, operator).call();
}

module.exports.getSpawnLimit = (contracts, ship, time) => {
  return contracts.constitution.methods.getSpawnLimit(ship, time).call();
}

module.exports.canEscapeTo = (contracts, ship, sponsor) => {
  return contracts.constitution.methods.canEscapeTo(ship, sponsor).call();
}

// NB (jtobin):
//
//   The following is extremely repetitive.  Could obviously abstract via
//   function pointers/variadic arguments, e.g. something like:
//
//     function txFromMethod(method, ...args) {
//       let addr = contracts.constitution._address;
//       let data = contracts.constitution.methods.method.apply(this, args);
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
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.safeTransferFrom(
               _from, _to, _token);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferFrom = (contracts, _from, _to, _token) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.transferFrom(_from, _to, _token);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.approve = (contracts, _approved, _token) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.approve(_approved, _token);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setApprovalForAll = (contracts, _operator, _approved) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.setApprovalForAll(
               _operator, _approved);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setManagementProxy = (contracts, _ship, _manager) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.setManagementProxy(_ship, _manager);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.configureKeys =
  (contracts, _ship,
   _encryptionKey, _authenticationKey,
   _cryptoSuiteVersion, _discontinuous) => {
    let addr = contracts.constitution._address;
    let data = contracts.constitution.methods.configureKeys(
                 _ship, _encryptionKey, _authenticationKey,
                 _cryptoSuiteVersion, _discontinuous);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}

module.exports.spawn = (contracts, _ship, _target) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.spawn(_ship, _target);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setSpawnProxy = (contracts, _prefix, _spawnProxy) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.setSpawnProxy(
               _prefix, _spawnProxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferShip = (contracts, _ship, _target, _reset) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.transferShip(
               _ship, _target, _reset);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setTransferProxy = (contracts, _ship, _transferProxy) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.setTransferProxy(
               _ship, _transferProxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.escape = (contracts, _ship, _sponsor) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.escape(_ship, _sponsor);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.cancelEscape = (contracts, _ship) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.cancelEscape(_ship);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.adopt = (contracts, _sponsor, _escapee) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.adopt(_sponsor, _escapee);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.reject = (contracts, _sponsor, _escapee) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.reject(_sponsor, _escapee);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.detach = (contracts, _sponsor, _ship) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.detach(_sponsor, _ship);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setVotingProxy = (contracts, _galaxy, _proxy) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.setVotingProxy(_galaxy, _proxy);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.startConstitutionPoll = (contracts, _galaxy, _proposal) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.startConstitutionPoll(
               _galaxy, _proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.startDocumentPoll = (contracts, _galaxy, _proposal) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.startDocumentPoll(
               _galaxy, _proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.castConstitutionVote =
  (contracts, _galaxy, _proposal, _vote) => {
    let addr = contracts.constitution._address;
    let data = contracts.constitution.methods.castConstitutionVote(
                 _galaxy, _proposal, _vote);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}

module.exports.castDocumentVote = (contracts, _galaxy, _proposal, _vote) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.castDocumentVote(
               _galaxy, _proposal, _vote);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.updateConstitutionPoll = (contracts, _proposal) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.updateConstitutionPoll(_proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.updateDocumentPoll = (contracts, _proposal) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.updateDocumentPoll(_proposal);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.createGalaxy = (contracts, _galaxy, _target) => {
  let addr = contracts.constitution._address;
  let data = contracts.constitution.methods.createGalaxy(_galaxy, _target);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.setDnsDomains =
  (contracts, _primary, _secondary, _tertiary) => {
    let addr = contracts.constitution._address;
    let data = contracts.constitution.methods.setDnsDomains(
                 _primary, _secondary, _tertiary);
    let abi  = data.encodeABI();
    return tx(addr, abi, 0);
}
