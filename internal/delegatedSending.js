
module.exports.pools = (contracts, pool, prefix) =>
  contracts.delegatedSending.methods.pools(pool, prefix).call()

module.exports.getInvited = (contracts, point) =>
  contracts.delegatedSending.methods.getInvited(point).call()

module.exports.invitedBy = (contracts, point) =>
  contracts.delegatedSending.methods.invitedBy(point).call()

module.exports.canSend = (contracts, as, point) =>
  contracts.delegatedSending.methods.canSend(as, point).call()

module.exports.getPool = (contracts, point) =>
  contracts.delegatedSending.methods.getPool(point).call()

module.exports.getPoolStars = (contracts, pool) =>
  contracts.delegatedSending.methods.getPoolStars(pool).call()

module.exports.canReceive = (contracts, recipient) =>
  contracts.delegatedSending.methods.canReceive(recipient).call()

const tx = (to, data, value) => ({
  to: to,
  data: data,
  value: value || 0x0
});

module.exports.setPoolSize = (contracts, _as, _for, _size) => {
  let addr = contracts.delegatedSending._address;
  let data = contracts.delegatedSending.methods.setPoolSize(_as, _for, _size);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.sendPoint = (contracts, _as, _point, _to) => {
  let addr = contracts.delegatedSending._address;
  let data = contracts.delegatedSending.methods.sendPoint(_as, _point, _to);
  let abi  = data.encodeABI();
  return tx(addr, abi, 0);
}
