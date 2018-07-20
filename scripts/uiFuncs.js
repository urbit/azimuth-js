'use strict';
var uiFuncs = function() {}
uiFuncs.BigNumber = null;
uiFuncs.wallet = null;
uiFuncs.ajaxReq = null;
uiFuncs.ethFuncs = null;
uiFuncs.etherUnits = null;
uiFuncs.validator = null;
uiFuncs.ethTx = null;

uiFuncs.getTxData = function(tx, wallet) {
    return {
        to: tx.to,
        value: tx.value,
        unit: tx.unit,
        gasLimit: tx.gasLimit,
        data: tx.data,
        from: this.wallet.getAddressString(),
        privKey: this.wallet.privKey ? this.wallet.getPrivateKeyString() : '',
        path: this.wallet.getPath(),
        hwType: this.wallet.getHWType(),
        hwTransport: this.wallet.getHWTransport()
    };
};

uiFuncs.isTxDataValid = function(txData) {
    if (txData.to != "0xCONTRACT" && !this.ethFuncs.validateEtherAddress(txData.to)) throw this.validator.errorMsgs[5];
    else if (!this.validator.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw this.validator.errorMsgs[0];
    else if (!this.validator.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw this.validator.errorMsgs[8];
    else if (!this.ethFuncs.validateHexString(txData.data)) throw this.validator.errorMsgs[9];
    if (txData.to == "0xCONTRACT") txData.to = '';
};

uiFuncs.signTxTrezor = function(rawTx, txData, callback) {
    var localCallback = function(result) {
        if (!result.success) {
            if (callback !== undefined) {
                callback({
                    isError: true,
                    error: result.error
                });
            }
            return;
        }

        rawTx.v = "0x" + ethFuncs.decimalToHex(result.v);
        rawTx.r = "0x" + result.r;
        rawTx.s = "0x" + result.s;
        var eTx = new ethTx.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }

    TrezorConnect.signEthereumTx(
        txData.path,
        ethFuncs.getNakedAddress(rawTx.nonce),
        ethFuncs.getNakedAddress(rawTx.gasPrice),
        ethFuncs.getNakedAddress(rawTx.gasLimit),
        ethFuncs.getNakedAddress(rawTx.to),
        ethFuncs.getNakedAddress(rawTx.value),
        ethFuncs.getNakedAddress(rawTx.data),
        rawTx.chainId,
        localCallback
    );
};

uiFuncs.signTxLedger = function(app, eTx, rawTx, txData, old, callback) {
    eTx.raw[6] = Buffer.from([rawTx.chainId]);
    eTx.raw[7] = eTx.raw[8] = 0;
    var toHash = old ? eTx.raw.slice(0, 6) : eTx.raw;
    var txToSign = ethTx.rlp.encode(toHash);
    var localCallback = function(result, error) {
        if (typeof error != "undefined") {
            error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
            return;
        }
        rawTx.v = "0x" + result['v'];
        rawTx.r = "0x" + result['r'];
        rawTx.s = "0x" + result['s'];
        eTx = new ethTx.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }
    app.signTransaction(txData.path, txToSign.toString('hex'), localCallback);
};

uiFuncs.signTxDigitalBitbox = function(eTx, rawTx, txData, callback) {
    var localCallback = function(result, error) {
        if (typeof error != "undefined") {
            error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
            return;
        }
        rawTx.v = ethFuncs.sanitizeHex(result['v']);
        rawTx.r = ethFuncs.sanitizeHex(result['r']);
        rawTx.s = ethFuncs.sanitizeHex(result['s']);
        var eTx_ = new ethTx.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = ethFuncs.sanitizeHex(eTx_.serialize().toString('hex'));
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }
    var app = new DigitalBitboxEth(txData.hwTransport, '');
    app.signTransaction(txData.path, eTx, localCallback);
};

uiFuncs.trezorUnlockCallback = function(txData, callback) {
    TrezorConnect.open(function(error) {
        if (error) {
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
        } else {
            txData.trezorUnlocked = true;
            generateTx(txData, callback);
        }
    });
};

uiFuncs.generateTx = function(txData, callback) {
    if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor") && !txData.trezorUnlocked) {
        trezorUnlockCallback(txData, callback);
        return;
    }
    try {
        this.isTxDataValid(txData);
        var genTxWithInfo = function(data) {
            var rawTx = {
                nonce: uiFuncs.ethFuncs.sanitizeHex(data.nonce),
                gasPrice: data.isOffline ? uiFuncs.ethFuncs.sanitizeHex(data.gasprice) : uiFuncs.ethFuncs.sanitizeHex(uiFuncs.ethFuncs.addTinyMoreToGas(data.gasprice)),
                gasLimit: uiFuncs.ethFuncs.sanitizeHex(uiFuncs.ethFuncs.decimalToHex(txData.gasLimit)),
                to: uiFuncs.ethFuncs.sanitizeHex(txData.to),
                value: uiFuncs.ethFuncs.sanitizeHex(uiFuncs.ethFuncs.decimalToHex(uiFuncs.etherUnits.toWei(txData.value, txData.unit))),
                data: uiFuncs.ethFuncs.sanitizeHex(txData.data)
            }
            if (uiFuncs.ajaxReq.eip155) rawTx.chainId = uiFuncs.ajaxReq.chainId;
            var eTx = new uiFuncs.ethTx(rawTx);
            if ((typeof txData.hwType != "undefined") && (txData.hwType == "ledger")) {
                var app = new ledgerEth(txData.hwTransport);
                var EIP155Supported = false;
                var localCallback = function(result, error) {
                    if (typeof error != "undefined") {
                        if (callback !== undefined) callback({
                            isError: true,
                            error: error
                        });
                        return;
                    }
                    var splitVersion = result['version'].split('.');
                    if (parseInt(splitVersion[0]) > 1) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[1]) > 0) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[2]) > 2) {
                        EIP155Supported = true;
                    }
                    signTxLedger(app, eTx, rawTx, txData, !EIP155Supported, callback);
                }
                app.getAppConfiguration(localCallback);
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor")) {
                signTxTrezor(rawTx, txData, callback);
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "web3")) {
              // for web3, we dont actually sign it here
              // instead we put the final params in the "signedTx" field and
              // wait for the confirmation dialogue / sendTx method
              var txParams = Object.assign({ from: txData.from }, rawTx)
              rawTx.rawTx = JSON.stringify(rawTx);
              rawTx.signedTx = JSON.stringify(txParams);
              rawTx.isError = false;
              callback(rawTx)
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "digitalBitbox")) {
                signTxDigitalBitbox(eTx, rawTx, txData, callback);
            } else {
                eTx.sign(new Buffer(txData.privKey, 'hex'));
                rawTx.rawTx = JSON.stringify(rawTx);
                rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
                rawTx.isError = false;
                if (callback !== undefined) callback(rawTx);
            }
        }
        if (txData.nonce || txData.gasPrice) {
            var data = {
                nonce: txData.nonce,
                gasprice: txData.gasPrice
            }
            data.isOffline = txData.isOffline ? txData.isOffline : false;
            genTxWithInfo(data);
        } else {
            this.ajaxReq.getTransactionData(txData.from, function(data) {
                if (data.error && callback !== undefined) {
                    callback({
                        isError: true,
                        error: e
                    });
                } else {
                    data = data.data;
                    data.isOffline = txData.isOffline ? txData.isOffline : false;
                    genTxWithInfo(data);
                }
            });
        }
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
};

uiFuncs.sendTx = function(signedTx, callback) {
  // check for web3 late signed tx
    if (signedTx.slice(0,2) !== '0x') {
      var txParams = JSON.parse(signedTx)
      window.web3.eth.sendTransaction(txParams, function(err, txHash){
        if (err) {
          return callback({
            isError: true,
            error: err.stack,
          })
        }
        callback({ data: txHash })
      });
      return
    }

    this.ajaxReq.sendRawTx(signedTx, function(data) {
        var resp = {};
        if (data.error) {
            resp = {
                isError: true,
                error: data.msg
            };
        } else {
            resp = {
                isError: false,
                data: data.data
            };
        }
        if (callback !== undefined) callback(resp);
    });
};

uiFuncs.transferAllBalance = function(fromAdd, gasLimit, callback) {
    try {
        this.ajaxReq.getTransactionData(fromAdd, function(data) {
            if (data.error) throw data.msg;
            data = data.data;
            var gasPrice = new BigNumber(this.ethFuncs.sanitizeHex(this.ethFuncs.addTinyMoreToGas(data.gasprice))).times(gasLimit);
            var maxVal = new BigNumber(data.balance).minus(gasPrice);
            maxVal = etherUnits.toEther(maxVal, 'wei') < 0 ? 0 : this.etherUnits.toEther(maxVal, 'wei');
            if (callback !== undefined) callback({
                isError: false,
                unit: "ether",
                value: maxVal
            });
        });
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
};

module.exports = uiFuncs;