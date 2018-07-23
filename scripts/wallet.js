'use strict';

var Wallet = function(privKey, address) {
  this.privKey = privKey;
  this.address = address;
};

Wallet.prototype.getPrivateKey = function() {
  return this.privKey;
};

Wallet.prototype.getPrivateKeyString = function() {
  if (typeof this.privKey != "undefined") {
    return this.getPrivateKey().toString('hex');
  } else {
    return "";
  }
};

Wallet.prototype.addressString = function() {
  return this.address;
}

module.exports = Wallet;