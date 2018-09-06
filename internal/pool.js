
module.exports.getOneStar = (contracts) => {
  return contracts.pool.methods.oneStar().call();
}

module.exports.getAllAssets = (contracts) => {
  return contracts.pool.methods.getAllAssets().call();
}

module.exports.getAssetCount = (contracts) => {
  return contracts.pool.methods.getAssetCount().call();
}

