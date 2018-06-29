'use strict';

var ethUtil = require('ethereumjs-util');

var pubKey = "0x07a5bb85bee2dff7ca9059eed9fcd3fb19e9c279e34efa07977b89f8eabcb762acd1e717298dd9db00eacc749b3ba9576795c5e19956f2385a00fd3cc2a6fda4";
// path: undefined
// hwType: undefined
// hwTransport: undefined
// var type = default;
var gbpBalance = 32885.52753;
var repBalance = 1436.06215;
var chfBalance = 46928.77634;
var btcBalance = 6.99206;
var eurBalance = 36958.14854;
var usdBalance = 42736.89417;
var balance = 98.5629478;
var usdPrice = 433.6;
var gbpPrice = 333.65;
var eurPrice = 374.97;
var btcPrice = 0.07094;
var chfPrice = 476.13;
var repPrice = 14.57;
var setTokens = function () {
    this.tokenObjs = [];
    var defaultTokensAndNetworkType = globalFuncs.getDefaultTokensAndNetworkType();
    var tokens = Token.popTokens;

    for (var i = 0; i < tokens.length; i++) {
        this.tokenObjs.push(new Token(tokens[i].address, this.getAddressString(), tokens[i].symbol, tokens[i].decimal, tokens[i].type));
        this.tokenObjs[this.tokenObjs.length - 1].setBalance();
    }

    var storedTokens = globalFuncs.localStorage.getItem('localTokens', null) != null ? JSON.parse(globalFuncs.localStorage.getItem('localTokens')) : [];

    var conflictWithDefaultTokens = [];
    for (var e = 0; e < storedTokens.length; e++) {
        if (globalFuncs.doesTokenExistInDefaultTokens(storedTokens[e], defaultTokensAndNetworkType)) {
            conflictWithDefaultTokens.push(storedTokens[e]);
            // don't push to tokenObjs if token is default; continue to next element
            continue;
        }

        this.tokenObjs.push(new Token(storedTokens[e].contractAddress, this.getAddressString(), globalFuncs.stripTags(storedTokens[e].symbol), storedTokens[e].decimal, storedTokens[e].type));
        this.tokenObjs[this.tokenObjs.length - 1].setBalance();
    }
    removeAllTokenConflicts(conflictWithDefaultTokens, storedTokens);
}
var setBalance = function (callback) {
    var parentObj = this;
    this.balance = this.usdBalance = this.eurBalance = this.btcBalance = this.chfBalance = this.repBalance = this.gbpBalance = 'loading';
    ajaxReq.getBalance(parentObj.getAddressString(), function (data) {
        if (data.error) parentObj.balance = data.msg;else {
            parentObj.balance = etherUnits.toEther(data.data.balance, 'wei');
            ajaxReq.getETHvalue(function (data) {
                parentObj.usdPrice = etherUnits.toFiat('1', 'ether', data.usd);
                parentObj.gbpPrice = etherUnits.toFiat('1', 'ether', data.gbp);
                parentObj.eurPrice = etherUnits.toFiat('1', 'ether', data.eur);
                parentObj.btcPrice = etherUnits.toFiat('1', 'ether', data.btc);
                parentObj.chfPrice = etherUnits.toFiat('1', 'ether', data.chf);
                parentObj.repPrice = etherUnits.toFiat('1', 'ether', data.rep);

                parentObj.usdBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.usd);
                parentObj.gbpBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.gbp);
                parentObj.eurBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.eur);
                parentObj.btcBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.btc);
                parentObj.chfBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.chf);
                parentObj.repBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.rep);
                if (callback) callback();
            });
        }
    });
}
var getBalance = function () {
    return this.balance;
}
var getPath = function () {
    return this.path;
}
var getHWType = function () {
    return this.hwType;
}
var getHWTransport = function () {
    return this.hwTransport;
}
var getPrivateKey = function () {
    return this.privKey;
}
var getPrivateKeyString = function () {
    if (typeof this.privKey != "undefined") {
        return this.getPrivateKey().toString('hex');
    } else {
        return "";
    }
}
var getPublicKey = function () {
    if (typeof this.pubKey == "undefined") {
        return ethUtil.privateToPublic(this.privKey);
    } else {
        return this.pubKey;
    }
}
var getPublicKeyString = function () {
    if (typeof this.pubKey == "undefined") {
        return '0x' + this.getPublicKey().toString('hex');
    } else {
        return "0x" + this.pubKey.toString('hex');
    }
}
var getAddress = function () {
    if (typeof pubKey == "undefined") {
        return ethUtil.privateToAddress(this.privKey);
    } else {
        return ethUtil.publicToAddress(pubKey, true);
    }
}
var getAddressString = function () {
    return '0x' + getAddress().toString('hex');
}
var getChecksumAddressString = function () {
    return ethUtil.toChecksumAddress(this.getAddressString());
}
var toV3 = function (password, opts) {
    opts = opts || {};
    var salt = opts.salt || ethUtil.crypto.randomBytes(32);
    var iv = opts.iv || ethUtil.crypto.randomBytes(16);
    var derivedKey;
    var kdf = opts.kdf || 'scrypt';
    var kdfparams = {
        dklen: opts.dklen || 32,
        salt: salt.toString('hex')
    };
    if (kdf === 'pbkdf2') {
        kdfparams.c = opts.c || 262144;
        kdfparams.prf = 'hmac-sha256';
        derivedKey = ethUtil.crypto.pbkdf2Sync(new Buffer(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
    } else if (kdf === 'scrypt') {
        // FIXME: support progress reporting callback
        kdfparams.n = opts.n || 262144;
        kdfparams.r = opts.r || 8;
        kdfparams.p = opts.p || 1;
        derivedKey = ethUtil.scrypt(new Buffer(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    } else {
        throw new Error('Unsupported kdf');
    }
    var cipher = ethUtil.crypto.createCipheriv(opts.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
    if (!cipher) {
        throw new Error('Unsupported cipher');
    }
    var ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()]);
    var mac = ethUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), new Buffer(ciphertext, 'hex')]));
    return {
        version: 3,
        id: ethUtil.uuid.v4({
            random: opts.uuid || ethUtil.crypto.randomBytes(16)
        }),
        address: this.getAddress().toString('hex'),
        Crypto: {
            ciphertext: ciphertext.toString('hex'),
            cipherparams: {
                iv: iv.toString('hex')
            },
            cipher: opts.cipher || 'aes-128-ctr',
            kdf: kdf,
            kdfparams: kdfparams,
            mac: mac.toString('hex')
        }
    };
}
var toJSON = function () {
    return {
        address: this.getAddressString(),
        checksumAddress: this.getChecksumAddressString(),
        privKey: this.getPrivateKeyString(),
        pubKey: this.getPublicKeyString(),
        publisher: "MyEtherWallet",
        encrypted: false,
        version: 2
    };
}
var toV3String = function (password, opts) {
    return JSON.stringify(this.toV3(password, opts));
}
var getV3Filename = function (timestamp) {
    var ts = timestamp ? new Date(timestamp) : new Date();
    return ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', this.getAddress().toString('hex')].join('');
}

module.exports = {
    getAddressString: getAddressString
}