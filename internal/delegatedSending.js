
//TODO ordering

module.exports.pools = (contracts, point) => {
  return contracts.delegatedSending.methods.pools(point).call();
}

module.exports.getInvited = (contracts, point) => {
  return contracts.delegatedSending.methods.getInvited(point).call();
}

module.exports.invitedBy = (contracts, point) => {
  return contracts.delegatedSending.methods.invitedBy(point).call();
}

module.exports.canSend = (contracts, as, point) => {
  return contracts.delegatedSending.methods.canSend(as, point).call();
}

module.exports.getPool = (contracts, point) => {
  return contracts.delegatedSending.methods.getPool(point).call();
}

module.exports.canReceive = (contracts, recipient) => {
  return contracts.delegatedSending.methods.canReceive(recipient).call();
}

// NB (jtobin):
//
//   The following is extremely repetitive.  Could obviously abstract via
//   function pointers/variadic arguments, e.g. something like:
//
//     function txFromMethod(method, ...args) {
//       let addr = contracts.delegatedSending.address;
//       let data = contracts.delegatedSending.methods.method.apply(this, args);
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

module.exports.setPoolSize = (contracts, _for, _size) => {
  let addr = contracts.delegatedSending._address;
  let data = contracts.delegatedSending.methods.setPoolSize(_for, _size);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.sendPoint = (contracts, _as, _point, _to) => {
  let addr = contracts.delegatedSending._address;
  let data = contracts.delegatedSending.methods.sendPoint(_as, _point, _to);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}
