
module.exports.getCommitment = (contracts, address) =>
  contracts.conditionalSR.methods.commitments(address).call()

module.exports.getRemainingStars = (contracts, address) =>
  contracts.conditionalSR.methods.getRemainingStars(address).call()

module.exports.getBatches = (contracts, address) =>
  contracts.conditionalSR.methods.getBatches(address).call()

module.exports.verifyBalance = (contracts, address) =>
  contracts.conditionalSR.methods.verifyBalance(address).call()

module.exports.getWithdrawLimit = (contracts, address) =>
  contracts.conditionalSR.methods.withdrawLimit(address).call()

module.exports.getApprovedTransfer = (contracts, address) =>
  contracts.conditionalSR.methods.transfers(address).call()

module.exports.getConditionsState = (contracts) =>
  contracts.conditionalSR.methods.getConditionsState().call()

const tx = (to, data, value) => ({
  to: to,
  data: data,
  value: value || 0x0
})

module.exports.approveCommitmentTransfer = (contracts, _to) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.approveCommitmentTransfer(_to);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferCommitment = (contracts, _from) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.transferCommitment(_from);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdraw = (contracts) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.withdraw();
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdrawTo = (contracts, _to) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.withdrawTo(_to);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.forfeit = (contracts, _batch) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.forfeit(_batch);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.analyzeCondition = (contracts, _condition) => {
  let addr = contracts.conditionalSR._address;
  let data = contracts.conditionalSR.methods.analyzeCondition(_condition);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}
