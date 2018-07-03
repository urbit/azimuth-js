'use strict';

var globalFuncs = require('../scripts/globalFuncs');
var parentObj = require('./testParentObj');

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
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: new BigNumber(data.result).toString() });
    });
}
var getChainId = function (callback) {
    this.post({
        method: 'net_version'
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: parseInt(data.result) });
    });
}
var getBalance = function (addr, callback) {
    this.post({
        method: 'eth_getBalance',
        params: [addr, 'pending']
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: { address: addr, balance: new BigNumber(data.result).toString() } });
    });
}
var getTransaction = function (txHash, callback) {
    this.post({
        method: 'eth_getTransactionByHash',
        params: [txHash]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
}
var getTransactionData = function (addr, callback) {
    var response = { error: false, msg: '', data: { address: addr, balance: '', gasprice: '', nonce: '' } };
    // var parentObj = this;
    var reqObj = [
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getBalance", "params": [addr, 'pending'] }, 
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_gasPrice", "params": [] }, 
        { "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_getTransactionCount", "params": [addr, 'pending'] }
    ];
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
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
}
var getEstimatedGas = function (txobj, callback) {
    txobj.value = ethFuncs.trimHexZero(txobj.value);
    this.post({
        method: 'eth_estimateGas',
        params: [{ from: txobj.from, to: txobj.to, value: txobj.value, data: txobj.data }]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
    });
}
var ethCallArr = {
    calls: [],
    callbacks: [],
    timer: null
};
var getEthCall = function (txobj, callback) {
    // var parentObj = this;
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
}
var getTraceCall = function (txobj, callback) {
    this.post({
        method: 'trace_call',
        params: [txobj, ["stateDiff", "trace", "vmTrace"]]
    }, function (data) {
        if (data.error) callback({ error: true, msg: data.error.message, data: '' });
        else callback({ error: false, msg: '', data: data.result });
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
abiList: [{
    "name": "Constitution",
    "address": "0x098b6cb45da68c31c751d9df211cbe3056c356d1",
    "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "interfaceID",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "onUpgrade",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ens",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "subNode",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "subLabel",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ships",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "claims",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "baseNode",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "polls",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "previousConstitution",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_previous",
          "type": "address"
        },
        {
          "name": "_ships",
          "type": "address"
        },
        {
          "name": "_polls",
          "type": "address"
        },
        {
          "name": "_ensRegistry",
          "type": "address"
        },
        {
          "name": "_baseEns",
          "type": "string"
        },
        {
          "name": "_subEns",
          "type": "string"
        },
        {
          "name": "_claims",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_approved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "name": "doesExist",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_approved",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_operator",
          "type": "address"
        },
        {
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "approved",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_encryptionKey",
          "type": "bytes32"
        },
        {
          "name": "_authenticationKey",
          "type": "bytes32"
        },
        {
          "name": "_discontinuous",
          "type": "bool"
        }
      ],
      "name": "configureKeys",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_target",
          "type": "address"
        }
      ],
      "name": "spawn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_time",
          "type": "uint256"
        }
      ],
      "name": "getSpawnLimit",
      "outputs": [
        {
          "name": "limit",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_prefix",
          "type": "uint16"
        },
        {
          "name": "_spawnProxy",
          "type": "address"
        }
      ],
      "name": "setSpawnProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_target",
          "type": "address"
        },
        {
          "name": "_reset",
          "type": "bool"
        }
      ],
      "name": "transferShip",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_transferProxy",
          "type": "address"
        }
      ],
      "name": "setTransferProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_sponsor",
          "type": "uint32"
        }
      ],
      "name": "canEscapeTo",
      "outputs": [
        {
          "name": "canEscape",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_sponsor",
          "type": "uint32"
        }
      ],
      "name": "escape",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "cancelEscape",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_sponsor",
          "type": "uint32"
        },
        {
          "name": "_escapee",
          "type": "uint32"
        }
      ],
      "name": "adopt",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_sponsor",
          "type": "uint32"
        },
        {
          "name": "_escapee",
          "type": "uint32"
        }
      ],
      "name": "reject",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_sponsor",
          "type": "uint32"
        },
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "detach",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "address"
        }
      ],
      "name": "startConstitutionPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "bytes32"
        }
      ],
      "name": "startDocumentPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "address"
        },
        {
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "castConstitutionVote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "bytes32"
        },
        {
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "castDocumentVote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "address"
        }
      ],
      "name": "updateConstitutionPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "bytes32"
        }
      ],
      "name": "updateDocumentPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_target",
          "type": "address"
        }
      ],
      "name": "createGalaxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_primary",
          "type": "string"
        },
        {
          "name": "_secondary",
          "type": "string"
        },
        {
          "name": "_tertiary",
          "type": "string"
        }
      ],
      "name": "setDnsDomains",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
},{
    "name": "Ships",
    "address": "0xe0834579269eac6beca2882a6a21f6fb0b1d7196",
    "abi": [{
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transferringFor",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "shipOwnerIndexes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "operators",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "ships",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "active",
          "type": "bool"
        },
        {
          "name": "encryptionKey",
          "type": "bytes32"
        },
        {
          "name": "authenticationKey",
          "type": "bytes32"
        },
        {
          "name": "keyRevisionNumber",
          "type": "uint32"
        },
        {
          "name": "continuityNumber",
          "type": "uint32"
        },
        {
          "name": "spawnCount",
          "type": "uint32"
        },
        {
          "name": "sponsor",
          "type": "uint32"
        },
        {
          "name": "hasSponsor",
          "type": "bool"
        },
        {
          "name": "escapeRequested",
          "type": "bool"
        },
        {
          "name": "escapeRequestedTo",
          "type": "uint32"
        },
        {
          "name": "spawnProxy",
          "type": "address"
        },
        {
          "name": "transferProxy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "transferringForIndexes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "shipsOwnedBy",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "dnsDomains",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnerChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        }
      ],
      "name": "Activated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "parent",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "child",
          "type": "uint32"
        }
      ],
      "name": "Spawned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "sponsor",
          "type": "uint32"
        }
      ],
      "name": "EscapeRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "sponsor",
          "type": "uint32"
        }
      ],
      "name": "EscapeCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "sponsor",
          "type": "uint32"
        }
      ],
      "name": "EscapeAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "sponsor",
          "type": "uint32"
        }
      ],
      "name": "LostSponsor",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "encryptionKey",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "authenticationKey",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "keyRevisionNumber",
          "type": "uint32"
        }
      ],
      "name": "ChangedKeys",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "number",
          "type": "uint32"
        }
      ],
      "name": "BrokeContinuity",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "spawnProxy",
          "type": "address"
        }
      ],
      "name": "ChangedSpawnProxy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "ship",
          "type": "uint32"
        },
        {
          "indexed": true,
          "name": "transferProxy",
          "type": "address"
        }
      ],
      "name": "ChangedTransferProxy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "primary",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "secondary",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "tertiary",
          "type": "string"
        }
      ],
      "name": "ChangedDns",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_primary",
          "type": "string"
        },
        {
          "name": "_secondary",
          "type": "string"
        },
        {
          "name": "_tertiary",
          "type": "string"
        }
      ],
      "name": "setDnsDomains",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getOwnedShips",
      "outputs": [
        {
          "name": "ownedShips",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "address"
        }
      ],
      "name": "getOwnedShipsByAddress",
      "outputs": [
        {
          "name": "ownedShips",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "address"
        }
      ],
      "name": "getOwnedShipCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getOwnedShipAtIndex",
      "outputs": [
        {
          "name": "ship",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isOwner",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getOwner",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "isActive",
      "outputs": [
        {
          "name": "equals",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "activateShip",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getKeys",
      "outputs": [
        {
          "name": "crypt",
          "type": "bytes32"
        },
        {
          "name": "auth",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getKeyRevisionNumber",
      "outputs": [
        {
          "name": "revision",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "hasBeenBooted",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_encryptionKey",
          "type": "bytes32"
        },
        {
          "name": "_authenticationKey",
          "type": "bytes32"
        }
      ],
      "name": "setKeys",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getContinuityNumber",
      "outputs": [
        {
          "name": "continuityNumber",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "incrementContinuityNumber",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getSpawnCount",
      "outputs": [
        {
          "name": "spawnCount",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getSpawned",
      "outputs": [
        {
          "name": "spawned",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getSponsor",
      "outputs": [
        {
          "name": "sponsor",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "hasSponsor",
      "outputs": [
        {
          "name": "has",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_sponsor",
          "type": "uint32"
        }
      ],
      "name": "isSponsor",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "loseSponsor",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "isEscaping",
      "outputs": [
        {
          "name": "escaping",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getEscapeRequest",
      "outputs": [
        {
          "name": "escape",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_sponsor",
          "type": "uint32"
        }
      ],
      "name": "isRequestingEscapeTo",
      "outputs": [
        {
          "name": "equals",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_sponsor",
          "type": "uint32"
        }
      ],
      "name": "setEscapeRequest",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "cancelEscape",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "doEscape",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_spawner",
          "type": "address"
        }
      ],
      "name": "isSpawnProxy",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getSpawnProxy",
      "outputs": [
        {
          "name": "spawnProxy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_spawner",
          "type": "address"
        }
      ],
      "name": "setSpawnProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_transferrer",
          "type": "address"
        }
      ],
      "name": "isTransferProxy",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getTransferProxy",
      "outputs": [
        {
          "name": "transferProxy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_transferrer",
          "type": "address"
        }
      ],
      "name": "setTransferProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proxy",
          "type": "address"
        }
      ],
      "name": "getTransferringForCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_proxy",
          "type": "address"
        }
      ],
      "name": "getTransferringFor",
      "outputs": [
        {
          "name": "tfor",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isOperator",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_operator",
          "type": "address"
        },
        {
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getPrefix",
      "outputs": [
        {
          "name": "parent",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "getShipClass",
      "outputs": [
        {
          "name": "_class",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ]
},{
    "name": "Polls",
    "address": "0x0654b24a5da81f6ed1ac568e802a9d6b21483561",
    "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "pollDuration",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "constitutionHasAchievedMajority",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalVoters",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "constitutionPolls",
      "outputs": [
        {
          "name": "start",
          "type": "uint256"
        },
        {
          "name": "yesVotes",
          "type": "uint8"
        },
        {
          "name": "noVotes",
          "type": "uint8"
        },
        {
          "name": "duration",
          "type": "uint256"
        },
        {
          "name": "cooldown",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "documentHasAchievedMajority",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "documentPolls",
      "outputs": [
        {
          "name": "start",
          "type": "uint256"
        },
        {
          "name": "yesVotes",
          "type": "uint8"
        },
        {
          "name": "noVotes",
          "type": "uint8"
        },
        {
          "name": "duration",
          "type": "uint256"
        },
        {
          "name": "cooldown",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "pollCooldown",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documentMajorities",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_pollDuration",
          "type": "uint256"
        },
        {
          "name": "_pollCooldown",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "proposal",
          "type": "address"
        }
      ],
      "name": "ConstitutionPollStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "proposal",
          "type": "bytes32"
        }
      ],
      "name": "DocumentPollStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "proposal",
          "type": "address"
        }
      ],
      "name": "ConstitutionMajority",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "proposal",
          "type": "bytes32"
        }
      ],
      "name": "DocumentMajority",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_pollDuration",
          "type": "uint256"
        },
        {
          "name": "_pollCooldown",
          "type": "uint256"
        }
      ],
      "name": "reconfigure",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "incrementTotalVoters",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDocumentMajorities",
      "outputs": [
        {
          "name": "majorities",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "address"
        }
      ],
      "name": "hasVotedOnConstitutionPoll",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_galaxy",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "bytes32"
        }
      ],
      "name": "hasVotedOnDocumentPoll",
      "outputs": [
        {
          "name": "result",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "address"
        }
      ],
      "name": "startConstitutionPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "bytes32"
        }
      ],
      "name": "startDocumentPoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_as",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "address"
        },
        {
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "castConstitutionVote",
      "outputs": [
        {
          "name": "majority",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_as",
          "type": "uint8"
        },
        {
          "name": "_proposal",
          "type": "bytes32"
        },
        {
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "castDocumentVote",
      "outputs": [
        {
          "name": "majority",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "address"
        }
      ],
      "name": "updateConstitutionPoll",
      "outputs": [
        {
          "name": "majority",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_proposal",
          "type": "bytes32"
        }
      ],
      "name": "updateDocumentPoll",
      "outputs": [
        {
          "name": "majority",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
},{
    "name": "Claims",
    "address": "0x56db68f29203ff44a803faa2404a44ecbb7a7480",
    "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "claims",
      "outputs": [
        {
          "name": "protocol",
          "type": "string"
        },
        {
          "name": "claim",
          "type": "string"
        },
        {
          "name": "dossier",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ships",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_ships",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "by",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "_protocol",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_claim",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_dossier",
          "type": "bytes"
        }
      ],
      "name": "ClaimAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "by",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "_protocol",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_claim",
          "type": "string"
        }
      ],
      "name": "ClaimRemoved",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_protocol",
          "type": "string"
        },
        {
          "name": "_claim",
          "type": "string"
        },
        {
          "name": "_dossier",
          "type": "bytes"
        }
      ],
      "name": "addClaim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        },
        {
          "name": "_protocol",
          "type": "string"
        },
        {
          "name": "_claim",
          "type": "string"
        }
      ],
      "name": "removeClaim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_ship",
          "type": "uint32"
        }
      ],
      "name": "clearClaims",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "uint32"
        },
        {
          "name": "_protocol",
          "type": "string"
        },
        {
          "name": "_claim",
          "type": "string"
        }
      ],
      "name": "findClaim",
      "outputs": [
        {
          "name": "index",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
},{
    "name": "Censures",
    "address": "0xefb7cbcf2b8631ff3d4b6b5a7073e292b2bf2387",
    "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint16"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "censuring",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "name": "censuredByIndexes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ships",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint16"
        },
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "censuringIndexes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint32"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "censuredBy",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_ships",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "by",
          "type": "uint16"
        },
        {
          "indexed": true,
          "name": "who",
          "type": "uint32"
        }
      ],
      "name": "Censured",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "by",
          "type": "uint16"
        },
        {
          "indexed": true,
          "name": "who",
          "type": "uint32"
        }
      ],
      "name": "Forgiven",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "uint16"
        }
      ],
      "name": "getCensuringCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_whose",
          "type": "uint16"
        }
      ],
      "name": "getCensuring",
      "outputs": [
        {
          "name": "cens",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_who",
          "type": "uint16"
        }
      ],
      "name": "getCensuredByCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_who",
          "type": "uint16"
        }
      ],
      "name": "getCensuredBy",
      "outputs": [
        {
          "name": "cens",
          "type": "uint16[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_as",
          "type": "uint16"
        },
        {
          "name": "_who",
          "type": "uint32"
        }
      ],
      "name": "censure",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_as",
          "type": "uint16"
        },
        {
          "name": "_who",
          "type": "uint32"
        }
      ],
      "name": "forgive",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
},{
   "name": "Pool",
    "address": "0x0724ee9912836c2563eee031a739dda6dd775333",
    "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "oneStar",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ships",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "assets",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "name": "assetIndexes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_ships",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllAssets",
      "outputs": [
        {
          "name": "allAssets",
          "type": "uint16[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_star",
          "type": "uint16"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawAny",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_star",
          "type": "uint16"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}];
var service = "Custom";

module.exports = {
  getEthCall: getEthCall,
  type: type,
  getRandomID: getRandomID,
  rawPost: rawPost
}