
const ethUtil = require('ethereumjs-util');

function addressEquals(a1, a2) {
  return (ethUtil.toChecksumAddress(a1) === ethUtil.toChecksumAddress(a2));
}

module.exports = ethUtil;
module.exports.addressEquals = addressEquals;

