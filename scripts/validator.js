'use strict';
var validator = function() {}

validator.ethFuncs = null;
validator.ethUtil = null;

validator.isValidAddress = function(address) {
    if (address && address == "0x0000000000000000000000000000000000000000") return false;
    if (address)
        return this.ethFuncs.validateEtherAddress(address);
    return false;
};

validator.isChecksumAddress = function(address) {
    return this.ethFuncs.isChecksumAddress(address);
};

validator.isValidENSorEtherAddress = function(address) {
    return (this.isValidAddress(address) || this.isValidENSAddress(address));
};

validator.isValidENSName = function(str) {
    try {
        return (str.length > 6 && ens.normalise(str) != '' && str.substring(0, 2) != '0x');
    } catch (e) {
        return false;
    }
};

validator.isValidTxHash = function(txHash) {
    return txHash.substring(0, 2) == "0x" && txHash.length == 66 && this.isValidHex(txHash);
};

validator.isValidENSAddress = function(address) {
    address = ens.normalise(address);
    var tld = address.substr(address.lastIndexOf('.') + 1);
    var _ens = new ens();
    var validTLDs = {
        eth: true,
        test: true,
        reverse: true
    }
    if (validTLDs[tld]) return true;
    return false;
};

validator.isValidBTCAddress = function(address) {
    return this.ethUtil.WAValidator.validate(address, 'BTC');
};

validator.isPositiveNumber = function(value) {
    return this.isNumeric(value) && parseFloat(value) >= 0;
};

validator.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

validator.isValidHex = function(hex) {
    return this.ethFuncs.validateHexString(hex);
};

validator.isValidPrivKey = function(privkeyLen) {
    return privkeyLen == 64 || privkeyLen == 66 || privkeyLen == 128 || privkeyLen == 132;
};

validator.isValidMnemonic = function(mnemonic) {
    return hd.bip39.validateMnemonic(mnemonic);
};

validator.isPasswordLenValid = function(pass, len) {
    if (pass === 'undefined' || pass == null) return false;
    return pass.length > len;
};

validator.isAlphaNumeric = function(value) {
    return this.isAlphaNumeric(value);
};

validator.isAlphaNumericSpace = function(value) {
    if (!value) return false;
    return this.isAlphaNumeric(value.replace(/ /g, ''));
};

validator.isAlphaNumeric = function(value) {
    return !/[^a-zA-Z0-9]/.test(value);
};

validator.isJSON = function(json) {
    return this.ethUtil.solidityUtils.isJson(json);
};

validator.isValidURL = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
};

validator.errorMsgs = [
    'Please enter a valid amount.', // 0
    'Your password must be at least 9 characters. Please ensure it is a strong password. ', // 1
    'Sorry! We don\'t recognize this type of wallet file. ', // 2
    'This is not a valid wallet file. ', // 3
    'This unit doesn\'t exists, please use the one of the following units ', // 4
    'Please enter a valid address. ', // 5
    'Please enter a valid password. ', // 6
    'Please enter valid decimals (Must be integer, 0-18). ', // 7
    'Please enter a valid gas limit (Must be integer. Try 21000-4000000). ', // 8
    'Please enter a valid data value (Must be hex). ', // 9
    'Please enter a valid gas price. ', // 10 - NOT USED
    'Please enter a valid nonce (Must be integer).', // 11
    'Invalid signed transaction. ', // 12
    'A wallet with this nickname already exists. ', // 13
    'Wallet not found. ', // 14
    'Whoops. It doesn\'t look like a proposal with this ID exists yet or there is an error reading this proposal. ', // 15 - NOT USED
    'A wallet with this address already exists in storage. Please check your wallets page. ', // 16
    'Insufficient funds. Account you try to send transaction from does not have enough funds. Required {} wei and got: {} wei. If sending tokens, you must have 0.01 ETH in your account to cover the cost of gas. ', // 17
    'All gas would be used on this transaction. This means you have already voted on this proposal or the debate period has ended.', // 18
    'Please enter a valid symbol', // 19
    'Not a valid ERC-20 token', // 20
    'Could not estimate gas. There are not enough funds in the account, or the receiving contract address would throw an error. Feel free to manually set the gas and proceed. The error message upon sending may be more informative.', // 21
    'Please enter valid node name', // 22
    'Enter valid URL. If you are on https, your URL must be https', // 23
    'Please enter a valid port. ', // 24
    'Please enter a valid chain ID. ', // 25
    'Please enter a valid ABI. ', // 26
    'Minimum amount: 0.01. Max amount: ', // 27
    'You need this `Keystore File + Password` or the `Private Key` (next page) to access this wallet in the future. ', // 28
    'Please enter a valid user and password. ', // 29
    'Please enter a valid name (7+ characters, limited punctuation) ', // 30
    'Please enter a valid secret phrase. ', // 31
    'Could not connect to the node. Try refreshing, using different node in upper right corner, and checking firewall settings. If custom node, check your configs.', // 32
    'The wallet you have unlocked does not match the owner\'s address. ', // 33
    'The name you are attempting to reveal does not match the name you have entered. ', // 34
    'Input address is not checksummed. <a href="https://myetherwallet.groovehq.com/knowledge_base/topics/not-checksummed-shows-when-i-enter-an-address" target="_blank" rel="noopener"> More info</a>', // 35
    'Enter valid TX hash', // 36
    'Enter valid hex string (0-9, a-f)' // 37
];

module.exports = validator;