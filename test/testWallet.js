'use strict';

var ethUtil = require('ethereumjs-util');

// var pubKey = "0x07a5bb85bee2dff7ca9059eed9fcd3fb19e9c279e34efa07977b89f8eabcb762acd1e717298dd9db00eacc749b3ba9576795c5e19956f2385a00fd3cc2a6fda4";
var privKey = "a44de2416ee6beb2f323fab48b432925c9785808d33a6ca6d7ba00b45e9370c3";
var path;
var hwType;
var hwTransport;

var getBalance = function () {
    return balance;
}
var getPath = function () {
    return path;
}
var getHWType = function () {
    return hwType;
}
var getHWTransport = function () {
    return hwTransport;
}
var getPrivateKey = function () {
    return privKey;
}
var getPrivateKeyString = function () {
    if (typeof privKey != "undefined") {
        return getPrivateKey().toString('hex');
    } else {
        return "";
    }
}
var getPublicKey = function () {
    if (typeof pubKey == "undefined") {
        return ethUtil.privateToPublic(privKey);
    } else {
        return pubKey;
    }
}
var getPublicKeyString = function () {
    if (typeof pubKey == "undefined") {
        return '0x' + getPublicKey().toString('hex');
    } else {
        return "0x" + pubKey.toString('hex');
    }
}
var getAddress = function () {
    if (typeof pubKey == "undefined") {
        return ethUtil.privateToAddress(privKey);
    } else {
        return ethUtil.publicToAddress(pubKey, true);
    }
}
var getAddressString = function () {
    return '0x' + getAddress().toString('hex');
}
module.exports = {
    getAddressString: getAddressString
}