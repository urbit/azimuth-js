'use strict';

var globalFuncs = require('../scripts/globalFuncs');

var SERVERURL = "http://localhost:8545";

var customNode = function(srvrUrl, port, httpBasicAuthentication) {
    this.SERVERURL = port ? srvrUrl + ':' + port : srvrUrl;
    if (httpBasicAuthentication) {
        var authorization = 'Basic ' + btoa(httpBasicAuthentication.user + ":" + httpBasicAuthentication.password);
        this.config.headers['Authorization'] = authorization;
    }
}
var config = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

var getCurrentBlock = function (callback) {
    this.post({
        method: 'eth_blockNumber'
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: new BigNumber(data.result).toString() });
    });
}
var getChainId = function (callback) {
    this.post({
        method: 'net_version'
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: parseInt(data.result) });
    });
}
var getBalance = function (addr, callback) {
    this.post({
        method: 'eth_getBalance',
        params: [addr, 'pending']
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: { address: addr, balance: new BigNumber(data.result).toString() } });
    });
}
var getTransaction = function (txHash, callback) {
    this.post({
        method: 'eth_getTransactionByHash',
        params: [txHash]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: data.result });
    });
}
var getTransactionData = function (addr, callback) {
    var response = { error: false, msg: '', data: { address: addr, balance: '', gasprice: '', nonce: '' } };
    var parentObj = this;
    var reqObj = [{ "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getBalance", "params": [addr, 'pending'] }, { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_gasPrice", "params": [] }, { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getTransactionCount", "params": [addr, 'pending'] }];
    this.rawPost(reqObj, function (data) {
        for (var i in data) {
            if (data[i].error) {
                callback({ error: true, msg: data[i].error.message, data: '' });
                return;
            }
        }
        response.data.balance = new BigNumber(data[0].result).toString();
        response.data.gasprice = data[1].result;
        response.data.nonce = data[2].result;
        callback(response);
    });
}
var sendRawTx = function (rawTx, callback) {
    this.post({
        method: 'eth_sendRawTransaction',
        params: [rawTx]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: data.result });
    });
}
var getEstimatedGas = function (txobj, callback) {
    txobj.value = ethFuncs.trimHexZero(txobj.value);
    this.post({
        method: 'eth_estimateGas',
        params: [{ from: txobj.from, to: txobj.to, value: txobj.value, data: txobj.data }]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: data.result });
    });
}
var ethCallArr = {
    calls: [],
    callbacks: [],
    timer: null
};
var getEthCall = function (txobj, callback) {
    var parentObj = this;
    if (!ethCallArr.calls.length) {
        ethCallArr.timer = setTimeout(function () {
            parentObj.rawPost(ethCallArr.calls, function (data) {
                ethCallArr.calls = [];
                var _callbacks = ethCallArr.callbacks.slice();
                ethCallArr.callbacks = [];
                for (var i in data) {
                    if (data[i].error) _callbacks[i]({ error: true, msg: data[i].error.message, data: '' });else _callbacks[i]({ error: false, msg: '', data: data[i].result });
                }
            });
        }, 500);
    }
    ethCallArr.calls.push({ "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_call", "params": [{ to: txobj.to, data: txobj.data }, 'pending'] });
    ethCallArr.callbacks.push(callback);
}
var getTraceCall = function (txobj, callback) {
    this.post({
        method: 'trace_call',
        params: [txobj, ["stateDiff", "trace", "vmTrace"]]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });else callback({ error: false, msg: '', data: data.result });
    });
}
var rawPost = function (data, callback) {
    console.log("RAWPOST");
    ajaxReq.http.post(this.SERVERURL, JSON.stringify(data), this.config).then(function (data) {
        callback(data.data);
    }, function (data) {
        callback({ error: true, msg: "connection error", data: "" });
    });
}
var getRandomID = function () {
    return globalFuncs.getRandomBytes(16).toString('hex');
}
var post = function (data, callback) {
    data.id = this.getRandomID();
    data.jsonrpc = "2.0";
    this.rawPost(data, callback);
}
var blockExplorerTX = "https://etherscan.io/tx/[[txHash]]";
var blockExplorerAddr = "https://etherscan.io/address/[[address]]";
var type = "ETH";
var eip155 = true;
var chainId = 1;
// abiList: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
var service = "Custom";

module.exports = {
  getEthCall: getEthCall,
  type: type,
  getRandomID: getRandomID
}