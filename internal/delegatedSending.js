
const gen = require('./genTransaction')

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

module.exports.setPoolSize = (contracts, _as, _for, _size) =>
  gen.tx(contracts.delegatedSending, 'setPoolSize', _as, _for, _size)

module.exports.sendPoint = (contracts, _as, _point, _to) =>
  gen.tx(contracts.delegatedSending, 'sendPoint', _as, _point, _to)

