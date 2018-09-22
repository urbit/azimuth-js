/**
 * Account handling
 * @module accounts
 */

const utils = require('./utils');

/**
 * Get an address and private key pair, given the provided HD path.
 * @param {Object} hd - a HD (hdkey) object.
 * @param {String} path - a valid HD path.
 * @param {Number} index - an index into the HD path.
 * @return {Object} The address and private key pair.
 */
function getKeyPair(hd, path, index) {
  let derived = hd.derive(path + '/' + index);
  let sk      = derived.privateKey;
  let address = utils.privateToAddress(sk);
  return {
    address: address,
    privateKey: sk
  };
}

module.exports = {
  getKeyPair
}
