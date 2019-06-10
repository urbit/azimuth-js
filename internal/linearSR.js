
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

const tx = (to, data, value) => ({
  to: to,
  data: data,
  value: value || 0x0
});

module.exports.approveBatchTransfer = (contracts, _to) => {
  let addr = contracts.linearSR._address;
  let data = contracts.linearSR.methods.approveBatchTransfer(_to);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.transferBatch = (contracts, _from) => {
  let addr = contracts.linearSR._address;
  let data = contracts.linearSR.methods.transferBatch(_from);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdraw = (contracts) => {
  let addr = contracts.linearSR._address;
  let data = contracts.linearSR.methods.withdraw();
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdrawTo = (contracts, _to) => {
  let addr = contracts.linearSR._address;
  let data = contracts.linearSR.methods.withdrawTo(_to);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}
