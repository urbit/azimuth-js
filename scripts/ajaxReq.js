'use strict';
var ajaxReq = function() {}
ajaxReq.crypto = null;
ajaxReq.BigNumber = null;
ajaxReq.request = null;

ajaxReq.serverURL = 'http://localhost:8545';

ajaxReq.getCurrentBlock = function (callback) {
    this.post({
        method: 'eth_blockNumber'
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: new BigNumber(data.result).toString() });
    });
};

ajaxReq.getChainId = function (callback) {
    this.post({
        method: 'net_version'
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: parseInt(data.result) });
    });
};

ajaxReq.getBalance = function (addr, callback) {
    this.post({
        method: 'eth_getBalance',
        params: [addr, 'pending']
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: { address: addr, balance: new BigNumber(data.result).toString() } });
    });
};

ajaxReq.getTransaction = function (txHash, callback) {
    this.post({
        method: 'eth_getTransactionByHash',
        params: [txHash]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
};

ajaxReq.getTransactionData = function (addr, callback) {
    var response = { error: false, msg: '', data: { address: addr, balance: '', gasprice: '', nonce: '' } };
    var parentObj = this;
    var reqObj = [
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getBalance", "params": [addr, 'pending'] }, 
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_gasPrice", "params": [] }, 
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getTransactionCount", "params": [addr, 'pending'] }
    ];
    this.post(reqObj, function (data) {
        for (var i in data) {
            if (data[i].error) {
                callback({ error: true, msg: data[i].error.message, data: '' });
                return;
            }
        }
        response.data.balance = new ajaxReq.BigNumber(data[0].result).toString();
        response.data.gasprice = data[1].result;
        response.data.nonce = data[2].result;
        callback(response);
    });
};

ajaxReq.sendRawTx = function (rawTx, callback) {
    this.post({
        method: 'eth_sendRawTransaction',
        params: [rawTx]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
};

ajaxReq.getEstimatedGas = function (txobj, callback) {
    txobj.value = this.trimHexZero(txobj.value);
    this.post({
        method: 'eth_estimateGas',
        params: [{ from: txobj.from, to: txobj.to, value: txobj.value, data: txobj.data }]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
};

var ethCallArr = {
    calls: [],
    callbacks: [],
    timer: null
};

ajaxReq.trimHexZero = function (hex) {
    if (hex == "0x00" || hex == "0x0") return "0x0";
    hex = this.sanitizeHex(hex);
    hex = hex.substring(2).replace(/^0+/, '');
    return '0x' + hex;
};

ajaxReq.getEthCall = function (txobj, callback) {
    var parentObj = this;
    if (!ethCallArr.calls.length) {
        ethCallArr.timer = setTimeout(function () {
            parentObj.rawPost(ethCallArr.calls, function (data) {
                ethCallArr.calls = [];
                var _callbacks = ethCallArr.callbacks.slice();
                ethCallArr.callbacks = [];
                for (var i in data) {
                    if (data[i].error) _callbacks[i]({ error: true, msg: data[i].error.message, data: '' });
                    else _callbacks[i]({ error: false, msg: '', data: data[i].result });
                }
            });
        }, 500);
    }
    ethCallArr.calls.push({ "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_call", "params": [{ to: txobj.to, data: txobj.data }, 'pending'] });
    ethCallArr.callbacks.push(callback);
};

ajaxReq.getTraceCall = function (txobj, callback) {
    this.post({
        method: 'trace_call',
        params: [txobj, ["stateDiff", "trace", "vmTrace"]]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
};

ajaxReq.getRandomID = function () {
  return this.crypto.randomBytes(16).toString('hex');
};

ajaxReq.post = function(data, callback) {
  data.id = this.getRandomID();
  data.jsonrpc = "2.0";
  this.rawPost(data, callback);
};

ajaxReq.rawPost = function(data, callback) {
  const options = {
    json: true,
    uri: this.serverURL,
    body: data,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };
  var rawData = '';
  this.request.post(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else return console.error('Call failed:', body[0].error)
  }).on('data', (chunk) => { 
    rawData += chunk;
  }).on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
    } catch (e) {
      console.error(e.message);
    }
  });
};

ajaxReq.type = "ETH";
ajaxReq.eip155 = true;
ajaxReq.chainId = 1;
ajaxReq.service = "Custom";

module.exports = ajaxReq;