
const utils = require('./utils');

async function sendTransaction(web3, tx, privateKey) {
  if (!utils.isValidPrivate(privateKey)) {
    throw "Invalid key";
  }

  let addr = utils.privateToAddress(privateKey);

  // NB (jtobin):
  //
  //   Explicitly set the tx.from field to whoever owns the supplied private
  //   key.  We don't want to depend on the state of web3.eth.defaultAccount,
  //   implicitly or otherwise, ever.

  tx.from = utils.addHexPrefix(addr.toString('hex'));

  let stx  = await signTransaction(web3, tx, privateKey);
  return sendSignedTransaction(web3, stx);
}

async function signTransaction(web3, tx, privateKey) {
  if (!utils.isValidPrivate(privateKey)) {
    throw "Invalid key";
  }
  if (!tx.gas) {
    let preliminary = await web3.eth.estimateGas(tx);
    tx.gas          = Math.floor(preliminary * 2.1);
  }
  let pk = utils.addHexPrefix(privateKey.toString('hex'));
  return web3.eth.accounts.signTransaction(tx, pk);
}

function sendSignedTransaction(web3, signedTx) {
  let stx = signedTx.rawTransaction;
  return web3.eth.sendSignedTransaction(stx);
}

module.exports = {
  signTransaction,
  sendSignedTransaction,
  sendTransaction
}

