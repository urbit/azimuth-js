
const gen = require('./genTransaction')

module.exports.getCommitment = (contracts, address) =>
  contracts.conditionalSR.methods.commitments(address).call()

module.exports.getRemainingStars = (contracts, address) =>
  contracts.conditionalSR.methods.getRemainingStars(address).call()

module.exports.getBatches = (contracts, address) =>
  contracts.conditionalSR.methods.getBatches(address).call()

module.exports.verifyBalance = (contracts, address) =>
  contracts.conditionalSR.methods.verifyBalance(address).call()

module.exports.getWithdrawLimit = (contracts, address, _batch) =>
  contracts.conditionalSR.methods.withdrawLimit(address, _batch).call()

module.exports.getApprovedTransfer = (contracts, address) =>
  contracts.conditionalSR.methods.transfers(address).call()

module.exports.getConditionsState = (contracts) =>
  contracts.conditionalSR.methods.getConditionsState().call()

module.exports.getWithdrawn = (contracts, address) =>
  contracts.conditionalSR.methods.getWithdrawn(address).call();

module.exports.approveCommitmentTransfer = (contracts, _to) =>
  gen.tx(contracts.conditionalSR, 'approveCommitmentTransfer', _to)

module.exports.transferCommitment = (contracts, _from) =>
  gen.tx(contracts.conditionalSR, 'transferCommitment', _from)

module.exports.withdraw = (contracts, _batch) =>
  gen.tx(contracts.conditionalSR, 'withdrawToSelf', _batch)

module.exports.withdrawTo = (contracts, _batch, _to) =>
  gen.tx(contracts.conditionalSR, 'withdraw', _batch, _to)

module.exports.forfeit = (contracts, _batch) =>
  gen.tx(contracts.conditionalSR, 'forfeit', _batch)

module.exports.analyzeCondition = (contracts, _condition) =>
  gen.tx(contracts.conditionalSR, 'analyzeCondition', _condition)

