
module.exports.getOneStar = (contracts) => {
  return contracts.pool.methods.oneStar().call();
}

module.exports.getAllAssets = (contracts) => {
  return contracts.pool.methods.getAllAssets().call();
}

module.exports.getAssetCount = (contracts) => {
  return contracts.pool.methods.getAssetCount().call();
}

module.exports.getBalance = (contracts, address) => {
  return contracts.pool.methods.balanceOf(address).call();
}

module.exports.getAssetIndex = (contracts, star) => {
  return contracts.pool.methods.assetIndexes(star).call();
}

const tx = (to, data, value) => ({
  to: to,
  data: data,
  value: value || 0x0
});

module.exports.deposit = (contracts, _star) => {
  let addr = contracts.pool._address;
  let data = contracts.pool.methods.deposit(
               _star);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdraw = (contracts, _star) => {
  let addr = contracts.pool._address;
  let data = contracts.pool.methods.withdraw(
               _star);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

module.exports.withdrawAny = (contracts) => {
  let addr = contracts.pool._address;
  let data = contracts.pool.methods.withdrawAny();
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

