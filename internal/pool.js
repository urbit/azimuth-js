
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

function tx(to, data, value) {
  return {
    to:    to,
    data:  data,
    value: value || 0x0
  };
}

module.exports.deposit = (contracts, _star) => {
  let addr = contracts.pool._address;
  let data = contracts.pool.methods.deposit(
               _star);
  let abi = data.encodeABI();
  return tx(addr, abi, 0);
}

