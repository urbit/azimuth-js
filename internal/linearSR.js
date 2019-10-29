
const gen = require('./genTransaction')

module.exports.getBatch = (contracts, address) =>
  contracts.linearSR.methods.batches(address).call()

module.exports.getRemainingStars = (contracts, address) =>
  contracts.linearSR.methods.getRemainingStars(address).call()

module.exports.verifyBalance = (contracts, address) =>
  contracts.linearSR.methods.verifyBalance(address).call()

module.exports.getStartTime = (contracts) =>
  contracts.linearSR.methods.start().call()

module.exports.getWithdrawLimit = (contracts, address) =>
  contracts.linearSR.methods.withdrawLimit(address).call()

module.exports.getApprovedTransfer = (contracts, address) =>
  contracts.linearSR.methods.transfers(address).call()

module.exports.approveBatchTransfer = (contracts, _to) =>
  gen.tx(contracts.linearSR, 'approveBatchTransfer', _to)

module.exports.transferBatch = (contracts, _from) =>
  gen.tx(contracts.linearSR, 'transferBatch', _from)

module.exports.withdraw = (contracts) =>
  gen.tx(contracts.linearSR, 'withdraw')

module.exports.withdrawTo = (contracts, _to) =>
  gen.tx(contracts.linearSR, 'withdraw', _to)

