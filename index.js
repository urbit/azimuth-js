// urbit constitution client module

var globalFuncs = require('./scripts/globalFuncs');
var customNode = require('./scripts/customNode');

// var ajaxReq = require('./scripts/ajaxReq');
// var wallet = require('./scripts/myetherwallet');   // BENBEN

var wallet = require('./test/testWallet');
var ajaxReq = require('./test/testAjaxReq');

var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
ethUtil.solidityCoder = require('./scripts/solidity/coder');
ethUtil.solidityUtils = require('./scripts/solidity/utils');
var uiFuncs = require('./scripts/uiFuncs');
var ethFuncs = require('./scripts/ethFuncs');
var obService = require('urbit-ob');
var validator = require('./scripts/validator');

var contract = {
  // address: globalFuncs.urlGet('address') != null && validator.isValidAddress(globalFuncs.urlGet('address')) ? globalFuncs.urlGet('address') : '',
  address: '',
  abi: '',
  functions: [],
  selectedFunc: null
};

var contracts = {
  ships: "0xe0834579269eac6beca2882a6a21f6fb0b1d7196",
  polls: "0x0654b24a5da81f6ed1ac568e802a9d6b21483561",
  pool: "0x0724ee9912836c2563eee031a739dda6dd775333",
  constitution: "0x098b6cb45da68c31c751d9df211cbe3056c356d1"
};

var oneSpark = 1000000000000000000;

var tx = {
  gasLimit: '',
  data: '',
  to: '',
  unit: "ether",
  value: 0,
  nonce: null,
  gasPrice: null
};

var nonceDec;
var gasPriceDec;
var offline = false;
var poolAddress;
var ajaxReq;
var wallet;

var doTransaction = function(address, wallet, ajaxReq, func, input, callback, value) {
  if (wallet.getAddressString() == null) {
  return;
  }
  var data = buildTransactionData(func, input);
  tx.data = data;
  tx.value = value || 0;
  tx.unit = "wei";
  if (!offline) {
    var estObj = {
      from: wallet.getAddressString(),
      value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(tx.value)),
      data: ethFuncs.sanitizeHex(data),
    }
    estObj.to = address;
    ethFuncs.estimateGas(estObj, function(data) {
      if (data.error) {
        // Proper input validation should prevent this.
        console.log("Gas estimation error");
      } else {
      // to not fall victim to inaccurate estimates, allow slightly more gas to be used.
      //TODO 1.8 is a bit much though. consult experts on why this can be so
        //     unpredictable, and how to fix it.
      tx.gasLimit = Math.round(data.data * 1.8);
        try {
          if (wallet == null)   /// BENBEN
          { throw globalFuncs.errorMsgs[3]; }
          else if (!ethFuncs.validateHexString(tx.data))
          { throw globalFuncs.errorMsgs[9]; }
          else if (!globalFuncs.isNumeric(tx.gasLimit) || parseFloat(tx.gasLimit) <= 0)
          { throw globalFuncs.errorMsgs[8]; }
          tx.data = ethFuncs.sanitizeHex(tx.data);
          ajaxReq.getTransactionData(wallet.getAddressString(), function(data) {
            if (data.error) {
              callback({ error: { msg: data.msg }, data: '' });
            } else {
              data = data.data;
              tx.to = address;
              tx.contractAddr = tx.to;
              showRaw = false;
              // just generate transaction with default amount and gas
              generateTx(ajaxReq, wallet, callback);
            }
          });
        } catch (e) {
          callback({ error: { msg: e }, data: '' });
        }
      }
    });
  } else {
    tx.to = address;
    tokenTx = {
      to: '',
      value: 0,
      id: 'ether',
      gasLimit: 150000
    };
    localToken = {
      contractAdd: "",
      symbol: "",
      decimals: "",
      type: "custom",
    };
    generateTxOffline();
  }
}

var generateTxOffline = function() {
  if (!ethFuncs.validateEtherAddress(tx.to)) {
    $scope.notifier.danger(globalFuncs.errorMsgs[5]);
    return;
  }
  var txData = uiFuncs.getTxData($scope);
  txData.isOffline = true;
  txData.nonce = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(nonceDec));
  txData.gasPrice = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(gasPriceDec));
  if (tokenTx.id != 'ether') {
    txData.data = $scope.tokenObjs[tokenTx.id].getData(tx.to, tx.value).data;
    txData.to = $scope.tokenObjs[tokenTx.id].getContractAddress();
    txData.value = '0x00';
  }
  uiFuncs.generateTx(txData, function(rawTx) {
    if (!rawTx.isError) {
      $scope.rawTx = rawTx.rawTx;
      $scope.signedTx = rawTx.signedTx;
      $scope.showRaw = true;
    } else {
      $scope.showRaw = false;
      $scope.notifier.danger(rawTx.error);
    }
    if (!$scope.$$phase) $scope.$apply();
  });
}

var generateTx = function(ajaxReq, wallet, callback) {
  try {
    if (wallet == null) {
      throw globalFuncs.errorMsgs[3];
    } else if (!ethFuncs.validateHexString(tx.data)) {
       throw globalFuncs.errorMsgs[9];
    } else if (!globalFuncs.isNumeric(tx.gasLimit) || parseFloat(tx.gasLimit) <= 0) {
      throw globalFuncs.errorMsgs[8];
    }
    tx.data = ethFuncs.sanitizeHex(tx.data);
    ajaxReq.getTransactionData(wallet.getAddressString(), function(data) {
      if (data.error) callback({ error: { msg: data.msg }, data: '' });
      data = data.data;
      tx.to = tx.to == '' ? '0xCONTRACT' : tx.to;
      tx.contractAddr = tx.to == '0xCONTRACT' ? ethFuncs.getDeteministicContractAddress(wallet.getAddressString(), data.nonce) : '';
      var txData = uiFuncs.getTxData(tx, wallet);
      uiFuncs.generateTx(txData, function(rawTx) {
        if (!rawTx.isError) {
          callback({ error: false, rawTx: rawTx.rawTx, signedTx: rawTx.signedTx, showRaw: true})
        } else {
          callback({ error: { msg: rawTx.error }, data: '' });
        }
      });
    });
  } catch (e) {
    callback({ error: { msg: e }, data: '' });
  }
}

var sendTx = function(signedTx, ajaxReq, callback) {
  uiFuncs.sendTx(signedTx, function(resp) {
    if (!resp.isError) {
      callback( { error: false, data: { resp: resp.data, tx: tx } })
    } else {
      callback( { error: { msg: resp.error } } );
    }
  });
}

var readContractData = function(address, ajaxReq, func, input, outTypes, callback) {
  contract.address = address;

  if (validator.isValidAddress(contract.address)) {
    for (var i in ajaxReq.abiList) {
      if (ajaxReq.abiList[i].address.toLowerCase() == contract.address.toLowerCase()) {
        contract.abi = ajaxReq.abiList[i].abi;
        break;
      }
    }
  }

  var call = buildTransactionData(func, input);
  ajaxReq.getEthCall({ to: contract.address, data: call }, function(data) {
    if (!data.error) {
      var decoded = ethUtil.solidityCoder.decodeParams(outTypes, data.data.replace('0x', ''));
      for (var i in decoded) {
        if (decoded[i] instanceof BigNumber) decoded[i] = decoded[i].toFixed(0);
      }
      callback(decoded);
    } else throw data.msg;
  });
}

var buildTransactionData = function(func, input) {
  var funcSig = ethFuncs.getFunctionSignature(func);
  var typeName = ethUtil.solidityUtils.extractTypeName(func);
  var types = typeName.split(',');
  types = types[0] == "" ? [] : types;
  return '0x' + funcSig + ethUtil.solidityCoder.encodeParams(types, input);
}
//
//// VALIDATE: validate input data
//
var validateShip = function(ship, callback, next) {
  if (ship < 0 || ship > 4294967295)
    callback({ error: { msg: "Ship " + ship + " not a galaxy, star or planet." }, data: '' });
  return next();
}

var validateParent = function(ship, callback, next) {
  if (ship < 0 || ship > 65535)
    callback({ error: { msg: "Ship " + ship + " not a galaxy or star." }, data: '' });
  return next();
}

var validateChild = function(ship, callback, next) {
  if (ship < 256 || ship > 4294967295)
    callback({ error: { msg: "Ship " + ship + " not a star or planet." }, data: '' });
  return next();
}

var validateGalaxy = function(galaxy, callback, next) {
  if (galaxy < 0 || galaxy > 255)
    callback({ error: { msg: "Ship " + galaxy + " not a galaxy." }, data: '' });
  return next();
}

var validateStar = function(star, callback, next) {
  if (star < 256 || star > 65535)
    callback({ error: { msg: "Ship " + star + " not a star." }, data: '' });
  return next();
}

var validateAddress = function(address, callback, next) {
  if (!ethFuncs.validateEtherAddress(address))
    callback({ error: { msg: address + " is not a valid Ethereum address." }, data: '' });
  return next();
}

var validateTimestamp = function(timestamp, callback, next) {
  if (timestamp < 0 || timestamp > 4200000000)
    callback({ error: { msg: "Weird timestamp: " + timestamp }, data: '' });
  return next();
}

var validateBytes32 = function(bytes, callback, next) {
  if (bytes.length > 32)
    callback({ error: { msg: "Input too long: " + bytes }, data: '' });
  return next();
}
//
// UI Validators
//
var valGalaxy = function(galaxy) {
  if (galaxy < 0 || galaxy > 255 || typeof galaxy !== 'number') {
    return true;
  } else {
    return false;
  }
}

var valStar = function(star) {
  if (star < 256 || star > 65535 || typeof star !== 'number') {
    return true;
  } else {
    return false;
  }
}

var valShip = function(ship) {
  if (ship < 0 || ship > 4294967295 || typeof ship !== 'number') {
    return true;
  } else {
    return false;
  }
}

var valAddress = function(address) {
  if (!ethFuncs.validateEtherAddress(address)) {
    return true;
  } else {
    return false;
  }
}
//
// UI Conveniences
//
var formatShipName = function(ship) {
  if (!ship) {
    return ship;
  } 
  if (ship.length < 2) {
    return ship;
  }
  if (ship[0] != '~') {
    return '~' + ship;
  } else {
    return ship;
  }
}

var buildOwnedShips = function(address, ajaxReq, callback) {
  tmp = {}
  // zero out struct?
  getOwnedShips(address, ajaxReq, function(data) {
    // if no ships returns, just zero this out, otherwise, wait until all 
    // ships have loaded
    if (data[0].length < 1) {
      ownedShips = {};
    }
    var x = data[0]
    for (var i in x) {
      if (i == x.length - 1) {
        // transfer shiplist once built
        buildShipData(x[i], ajaxReq, true, callback);
      } else {
        // transfer shiplist once built
        buildShipData(x[i], ajaxReq, false, callback);
      }
    }
  });
}

var buildShipData = function(address, ajaxReq, terminate, callback) {
  function put(data) {
    tmp[address] = {};
    tmp[address]['name'] = '~' + toShipName(address);
    tmp[address]['address'] = address['c'][0];
    tmp[address]['hasBeenBooted'] = data[0];
    if (terminate) {
      callback(tmp);
    }
  }
  getHasBeenBooted(address, ajaxReq, put);
}

var toAddress = function(name) {
  return obService.toAddress(name);
}

var toShipName = function(address) {
  if (address > -1 && address < 256) {
    return obService.toGalaxyName(address);
  } else if (address > 255 && address < 65536) {
    return obService.toStarName(address);
  } else {
    return obService.toPlanetName(address);
  }
}

var getSpawnCandidate = function(address) {
  var candidate;
  if (address > -1 && address < 256) {
    candidate = ((Math.floor(Math.random() * 255) + 1) * 256 + address);
    return candidate;
  } else if (address > 255 && address < 65536) {
    candidate = ((Math.floor(Math.random() * 65535) + 1) * 65536 + address);
    return candidate;
  } else {
    return;
  }
}

var generateShipList = function(shipListString, cb) {
  var t = shipListString.split('\n');
  var r = {};
  for (var i = 0; i < t.length; i ++) {
    if (t[i]) {
      r[t[i]] = { address: t[i], name: '~' + toShipName(t[i])};
    }
  };
  if (cb) {
    cb(r);
  } else {
    return r;
  }
}
//
// GET: read contract data, pass the result to callback
//
var getConstitutionOwner = function(ajaxReq, callback) {
  readContractData(contracts.constitution,
    ajaxReq,
    "owner()",
    [],
    ["address"],
    callback
  );
}

var getVotesAddress = function(ajaxReq, callback) {
  readContractData(contracts.constitution,
    ajaxReq,
    "votes()",
    [],
    ["address"],
    callback
  );
}

var getCanEscapeTo = function(ship, sponsor, ajaxReq, callback) {
  readContractData(contracts.constitution,
    ajaxReq,
    "canEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
}

var getShipsOwner = function(ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "owner()",
    [],
    ["address"],
    callback
  );
}

var getOwnedShips = function(address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getOwnedShipsByAddress(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getOwner = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getOwner(uint32)",
    [ship],
    ["address"],
    callback
  );
}

var getIsOwner = function(ship, address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "isOwner(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getIsActive = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "isActive(uint32)",
    [ship],
    ["bool"],
    callback
  );
}

var getSponsor = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getSponsor(uint32)",
    [ship],
    ["uint32"],
    callback
  );
}

var getIsRequestingEscapeTo = function(ship, sponsor, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "isRequestingEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
}

var getHasBeenBooted = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "hasBeenBooted(uint32)",
    [ship],
    ["bool"],
    callback
  );
}

var getKeys = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getKeys(uint32)",
    [ship],
    ["bytes32"],
    callback
  );
}

var getIsTransferProxy = function(ship, address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "isTransferProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getIsSpawnProxy = function(ship, address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "isSpawnProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getEscapeRequest = function(ship, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getEscapeRequest(uint32)",
    [ship],
    ["uint32"],
    callback
  );
}

var getTransferringFor = function(address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getTransferringFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getSpawningFor = function(address, ajaxReq, callback) {
  readContractData(contracts.ships,
    ajaxReq,
    "getSpawningFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getPoolAssets = function(poolAddress, ajaxReq, callback) {
  readContractData(poolAddress,
    ajaxReq,
    "getAllAssets()",
    [],
    ["uint16[]"],
    callback
  );
}

var getSparkBalance = function(poolAddress, ajaxReq, wallet, callback) {
  readContractData(poolAddress,
    ajaxReq,
    "balanceOf(address)",
    [wallet.getAddressString()],
    ["uint256"],
    callback
  );
}

var getHasVotedOnConstitutionPoll = function(galaxy, address, ajaxReq, callback) {
  readContractData(contracts.polls,
    ajaxReq,
    "hasVotedOnConstitutionPoll(uint8,address)",
    [galaxy, address],
    ["bool"],
    callback
  );
}

var getDocumentHasAchievedMajority = function(proposal, ajaxReq, callback) {
  readContractData(contracts.polls,
    ajaxReq,
    "documentHasAchievedMajority(bytes32)",
    [proposal],
    ["bool"],
    callback
  );
}

var getHasVotedOnDocumentPoll = function(galaxy, proposal, ajaxReq, callback) {
  readContractData(contracts.polls,
    ajaxReq,
    "hasVotedOnDocumentPoll(uint8,bytes32)",
    [galaxy, proposal],
    ["bool"],
    callback
  );
}
//
// READ: fill fields with requested data
//
var readShipData = function(ship, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    getHasBeenBooted(ship, ajaxReq, put);
  });
  function put(data) {
    callback({ ship: ship, hasBeenBooted: data[0] });
  }
}

var readOwnedShips = function(addr, ajaxReq, callback) {
  if (!addr) {
    return;
  }
  getOwnedShips(addr, ajaxReq, function(data) {
    var res = "";
    for (var i in data[0]) {
      res = res + data[0][i] + "\n";
    }
    callback(generateShipList(res));
  });
}

var readHasOwner = function(ship, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    getOwner(ship, ajaxReq, put);
  });
  function put(data) {
    callback(data[0] == '0x0000000000000000000000000000000000000000' ? false : true);
  }
}

var readIsOwner = function(ship, addr, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    validateAddress(addr, callbac, function() {
      getIsOwner(ship, addr, ajaxReq, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
}

var readPoolAssets = function(poolAddress, ajaxReq, callback) {
  getPoolAssets(poolAddress, ajaxReq, put);
  function put(data) {
    var t = [];
    for (var i = 0; i < data[0].length; i++) {
      t.push(formatShipName(toShipName(data[0][i].toFixed(0))));
    }
    callback(t);
  };
}

var readParent = function(ship, ajaxReq, callback) {
  validateChild(ship, callback, function() {
    getSponsor(ship, ajaxReq, put);
  });
  function put(data) {
    callback(data[0]);
  }
}

var readIsRequestingEscapeTo = function(ship, sponsor, ajaxReq, callback) {
  validateChild(ship, callback, function() {
    validateParent(sponsor, callback, function () {
      getIsRequestingEscapeTo(ship, sponsor, ajaxReq, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
}

var readKeys = function(ship, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    getKeys(ship, ajaxReq, put);
  });
  function put(data) {
    callback(data[0]);
  }
}

var readIsSpawnProxy = function(ship, addr, ajaxReq, callback) {
  validateParent(ship, callback, function() {
    validateAddress(addr, callback, function () {
      getIsSpawnProxy(ship, addr, ajaxReq, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
}

var readBalance = function(poolAddress, ajaxReq, wallet, callback) {
  if (poolAddress) {
    getSparkBalance(poolAddress, ajaxReq, wallet, function(data) {
      callback(data[0] / oneSpark);
    });
  } else {
    // throw an error here
  }
}
//
// CHECK: verify if conditions for a transaction are met
//
var checkOwnership = function(ship, wallet, ajaxReq, callback, next) {
  getIsOwner(ship, wallet.getAddressString(), ajaxReq, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Not your ship. " + ship }, data: '' });
  });
}

var checkIsTransferProxy = function(ship, addr, ajaxReq, callback, next) {
  getIsTransferProxy(ship, addr, ajaxReq, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship is not transferable by " + addr }, data: '' });
  });
}

var checkIsUnlocked = function(ship, ajaxReq, callback, next) {
  getIsActive(ship, ajaxReq, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship is not active." }, data: '' });
  });
}

var checkIsLatent = function(ship, ajaxReq, callback, next) {
  getIsActive(ship, ajaxReq, function(data) {
    if (!data[0]) return next();
    callback({ error: { msg: "Ship is active." }, data: '' });
  });
}

var checkCanEscapeTo = function(ship, sponsor, ajaxReq, callback, next) {
  getCanEscapeTo(ship, sponsor, ajaxReq, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship " + ship + " cannot escape to ship " + sponsor + "." }, data: '' });
  });
}

var checkEscape = function(ship, sponsor, ajaxReq, callback, next) {
  getIsRequestingEscapeTo(ship, sponsor, ajaxReq, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Escape doesn't match." }, data: '' });
  });
}

var checkHasBeenBooted = function(sponsor, ajaxReq, callback, next) {
  getHasBeenBooted(sponsor, ajaxReq, function(data) {
    if (data[0]) return next() 
    callback({ error: { msg: "Ship has not been booted." }, data: '' });
  });
}
//
// DO: do transactions that modify the blockchain
//
var doCreateGalaxy = function(galaxy, wallet, ajaxReq, callback) {
  validateGalaxy(galaxy, callback, function() {
    validateAddress(wallet.getAddressString(), callback, function() {
      if (offline) return transact();
      getConstitutionOwner(ajaxReq, checkPermission);
    });
  });
  function checkPermission(data) {
    if (data[0] != wallet.getAddressString())
      callback({ error: { msg: "Insufficient permissions." }, data: '' });
    getIsOwner(galaxy, address, ajaxReq, checkAvailable);
  }
  function checkAvailable(data) {
    if (data[0].length > 0)
      callback({ error: { msg: "Galaxy already owned." }, data: '' });
    transact();
  }
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "createGalaxy(uint8,address)",
      [galaxy, address],
      callback
    );
  }
}

var doDeposit = function(star, poolAddress, wallet, ajaxReq, callback) {
  validateStar(star, callback, function() {
    if (offline) return transact();
      checkIsTransferProxy(star, poolAddress, ajaxReq, callback, function() {
        checkOwnership(star, wallet, ajaxReq, callback, checkHasNotBeenBooted);
      });
  });
  // star cannot be booted
  function checkHasNotBeenBooted() {
    getHasBeenBooted(star, ajaxReq, function(data) {
      if (data[0])
        callback({ error: { msg: "Ship has been booted." }, data: '' });
      transact();
    });
  }
  function transact() {
    // will this bork if you enter a new pool address on the deposit screen?
    doTransaction(poolAddress,
      wallet,
      ajaxReq,
      "deposit(uint16)",
      [star],
      callback
    );
  }
}

var doWithdraw = function(star, poolAddress, wallet, ajaxReq, callback) {
  validateStar(star, callback, function() {
    return transact();
  });
  function transact() {
    doTransaction(poolAddress,
      wallet,
      ajaxReq,
      "withdraw(uint16)",
      [star],
      callback
    );
  }
}

var doSpawn = function(ship, wallet, ajaxReq, callback) {
  var sponsor = ship % 256;
  if (ship > 65535) sponsor = ship % 65536;
  addr = wallet.getAddressString();
  validateShip(ship, callback, function() {
    validateAddress(addr, callback, function() {
      if (offline) return transact();
      checkIsLatent(ship, ajaxReq, callback, function() {
        checkHasBeenBooted(sponsor, ajaxReq, callback, checkParent);
      });
    });
  });
  // ship needs to be galaxy, or its parent needs to be living
  function checkParent() {
    if (ship < 256) return checkRights();
    checkIsUnlocked(sponsor, ajaxReq, callback, checkRights);
  }
  // user needs to be owner of sponsor or spawn proxy of sponsor
  function checkRights() {
    getIsSpawnProxy(sponsor, addr, ajaxReq, function(data) {
      if (data[0]) return transact();
      checkOwnership(sponsor, wallet, ajaxReq, callback, transact);
    });
  }
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "spawn(uint32,address)",
      [ship, addr],
      callback
    );
  }
}

var doSetSpawnProxy = function(ship, addr, wallet, ajaxReq, callback) {
  validateParent(ship, callback, function() {
    validateAddress(addr, callback, function() {
      if (offline) return transact();
      checkOwnership(ship, wallet, ajaxReq, callback, function() {
        checkIsUnlocked(ship, ajaxReq, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "setSpawnProxy(uint16,address)",
      [ship, addr],
      callback
    );
  }
}

var doConfigureKeys = function(ship, encryptionKey, authenticationKey, discontinuous, wallet, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    validateBytes32(encryptionKey, callback, function() {
      validateBytes32(authenticationKey, callback, function() {
        if (offline) return transact();
        checkOwnership(ship, wallet, ajaxReq, callback, function() {
          checkIsUnlocked(ship, ajaxReq, callback, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "configureKeys(uint32,bytes32,bytes32,bool)",
      [ship, encryptionKey, authenticationKey, discontinuous],
      callback
    );
  }
}

var doTransferShip = function(ship, addr, reset, wallet, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    validateAddress(addr, callback, function() {
      if (offline) return transact();
      checkOwnership(ship, wallet, ajaxReq, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "transferShip(uint32,address,bool)",
      [ship, addr, reset],
      callback
    );
  }
}

var doSetTransferProxy = function(ship, addr, wallet, ajaxReq, callback) {
  validateShip(ship, callback, function() {
    validateAddress(addr, callback, function() {
      if (offline) return transact();
      checkOwnership(ship, wallet, ajaxReq, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "setTransferProxy(uint32,address)",
      [ship, addr],
      callback
    );
  }
}

var doEscape = function(ship, sponsor, wallet, ajaxReq, callback) {
  validateChild(ship, callback, function() {
    validateParent(sponsor, callback, function() {
      if (offline) return transact();
      checkOwnership(ship, wallet, ajaxReq, callback, function() {
        checkHasBeenBooted(sponsor, callback, function() {
          checkCanEscapeTo(ship, sponsor, ajaxReq, callback, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "escape(uint32,uint32)",
      [ship, sponsor],
      callback
    );
  }
}

var doAdopt = function(sponsor, escapee, wallet, ajaxReq, callback) {
  validateParent(sponsor, callback, function() {
    validateChild(escapee, callback, function () {
      if (offline) return transact();
      checkOwnership(escapee, wallet, ajaxReq, callback, function() {
        checkEscape(escapee, sponsor, ajaxReq, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "adopt(uint32,uint32)",
      [sponsor, escapee],
      callback
    );
  }
}

var doReject = function(sponsor, escapee, wallet, ajaxReq, callback) {
  validateParent(sponsor, callback, function() {
    validateChild(escapee, callback, function () {
      if (offline) return transact();
      checkOwnership(escapee, wallet, ajaxReq, callback, function() {
        checkEscape(escapee, sponsor, ajaxReq, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "reject(uint32,uint32)",
      [sponsor, escapee],
      callback
    );
  }
}

var doApprove = function(address, ship, wallet, ajaxReq, callback) {
  validateAddress(address, callback, function () {
    validateShip(ship, callback, function () {
      if (offline) return transact();
      checkOwnership(ship, wallet, ajaxReq, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "approve(address,uint256)",
      [address, ship],
      callback
    );
  }
}

var doSafeTransferFrom = function(fromAddr, toAddr, ship, wallet, ajaxReq, callback) {
  validateAddress(fromAddr, callback, function () {
    validateAddress(toAddr, callback, function () {
      validateShip(ship, callback, function () {
        if (offline) return transact();
        // TODO: add check to validate that the caller has been approved to initiate transfer
        transact();
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "safeTransferFrom(address,address,uint256)",
      [fromAddr, toAddr, ship],
      callback
    );
  }
}

var doCastConstitutionVote = function(galaxy, prop, vote, wallet, ajaxReq, callback) {
  validateGalaxy(galaxy, callback, function() {
    validateAddress(prop, callback, function() {
      if (offline) return transact();
      checkOwnership(galaxy, wallet, ajaxReq, callback, function() {
        checkIsUnlocked(galaxy, ajaxReq, callback, function() {
          getHasVotedOnConstitutionPoll(galaxy, prop, ajaxReq, checkVote);
        });
      });
    });
  });
  function checkVote(data) {
    if (!data[0]) return transact();
    callback({ error: { msg: "Vote already registered." }, data: '' });
  }
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "castConstitutionVote(uint8,address,bool)",
      [galaxy, prop, vote],
      callback
    );
  }
}

var doCastDocumentVote = function(galaxy, prop, vote, wallet, ajaxReq, callback) {
  validateGalaxy(galaxy, function() {
    validateBytes32(prop, function() {
      if (offline) return transact();
      checkOwnership(galaxy, wallet, ajaxReq, function() {
        checkIsUnlocked(galaxy, ajaxReq, callback, function() {
          getDocumentHasAchievedMajority(prop, checkMajority);
        });
      });
    });
  });
  function checkMajority(data) {
    if (!data[0]) return getHasVotedOnDocumentPoll(galaxy, prop, checkVote);
    return callback({ error: { msg: "Document already has majority." }, data: '' });
  }
  function checkVote(data) {
    if (!data[0]) return transact();
    callback({ error: { msg: "Vote already registered." }, data: '' });
  }
  function transact() {
    doTransaction(contracts.constitution,
      wallet,
      ajaxReq,
      "castDocumentVote(uint8,bytes32,bool)",
      [galaxy, prop, vote],
      callback
    );
  }
}

module.exports = {
  offline: offline,
  poolAddress: poolAddress,
  ajaxReq: ajaxReq,
  wallet: wallet,
  validator: validator,
  toAddress: toAddress,
  valGalaxy: valGalaxy,
  valStar: valStar,
  valShip: valShip,
  valAddress: valAddress,
  formatShipName: formatShipName,
  toShipName: toShipName,
  buildOwnedShips: buildOwnedShips,
  getSpawnCandidate: getSpawnCandidate,
  getConstitutionOwner: getConstitutionOwner,
  readShipData: readShipData,
  readHasOwner: readHasOwner,
  readIsOwner: readIsOwner,
  readPoolAssets: readPoolAssets,
  readBalance: readBalance,
  readParent: readParent,
  readOwnedShips: readOwnedShips,
  readIsRequestingEscapeTo: readIsRequestingEscapeTo,
  readKeys: readKeys,
  readIsSpawnProxy: readIsSpawnProxy,
  doCreateGalaxy: doCreateGalaxy,
  doDeposit: doDeposit,
  doWithdraw: doWithdraw,
  doSpawn: doSpawn,
  doSetSpawnProxy: doSetSpawnProxy,
  doConfigureKeys: doConfigureKeys,
  doTransferShip: doTransferShip,
  doSetTransferProxy: doSetTransferProxy,
  doEscape: doEscape,
  doAdopt: doAdopt,
  doReject: doReject,
  doApprove: doApprove,
  doSafeTransferFrom: doSafeTransferFrom,
  doCastConstitutionVote: doCastConstitutionVote,
  doCastDocumentVote: doCastDocumentVote,
  sendTx: sendTx
}