
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
  return contracts.pool.methods.balances(address).call();
}

