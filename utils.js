/**
 * Utilities
 * @module utils
 */

const ethUtil = require('ethereumjs-util');

/**
 * Check if two addresses are equal.
 * @param {String} a1 - an Ethereum address.
 * @param {String} a2 - an Ethereum address.
 * @return {Bool} True if the addresses are equal, false otherwise.
 */
function addressEquals(a1, a2) {
  return (ethUtil.toChecksumAddress(a1) === ethUtil.toChecksumAddress(a2));
}

module.exports = ethUtil;
module.exports.addressEquals = addressEquals;

