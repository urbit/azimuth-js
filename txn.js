/**
 * Transaction handling
 * @module txn
 */

const utils = require('./utils');

function renderAsHex(value) {
  return utils.addHexPrefix(value.toString('hex'));
}

/**
 * Sign an unsigned transaction with the provided private key.
 *
 * If `tx.gas` is undefined, it will be estimated.  If `tx.gasPrice` is
 * undefined, a default is used.  If `tx.nonce` is undefined, Web3 will
 * retrieve the next nonce.  And if `tx.chainId` is undefined, Web3 fills it
 * in.
 *
 * Note that Web3 cannot fill in most of those blanks when not connected to
 * a functioning node (i.e. "offline mode"), so those will have to be filled
 * in by the UI or user prior to signing.
 *
 * @param {Web3} web3 - a web3 object.
 * @param {Object} tx - an unsigned transaction.
 * @param {Buffer} privateKey - a private key.
 * @return {Promise<Object>} A signed transaction object with `messageHash`,
 *  `v`, `r`, `s`, and `rawTransaction` fields.
 */
async function signTransaction(web3, tx, privateKey) {
  if (!utils.isValidPrivate(privateKey)) {
    throw "Invalid key";
  }
  if (!tx.gas) {
    let preliminary = await web3.eth.estimateGas(tx);
    tx.gas          = Math.floor(preliminary * 2.1);
  }
  let pk = renderAsHex(privateKey);
  return web3.eth.accounts.signTransaction(tx, pk);
}

/**
 * Forward a signed transaction to the blockchain.
 * @param {Web3} web3 - a web3 object.
 * @param {Object} signedTx - a signed transaction.
 * @return {Promise}
 */
function sendSignedTransaction(web3, signedTx) {
  let stx = signedTx.rawTransaction;
  return new Promise((resolve, reject) => {
    web3.eth
      .sendSignedTransaction(stx)
      .once('confirmation', (n, receipt) => {
        if (receipt.status) {
          resolve();
        } else {
          reject();
        }
      })
      .on('error', (e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        reject();
      });
  });
}

module.exports = {
  signTransaction,
  sendSignedTransaction
}

