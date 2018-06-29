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
  // address: globalFuncs.urlGet('address') != null && validator.isValidAddress(globalFuncs.urlGet('address')) ? globalFuncs.urlGet('address') : '',   //  BENBEN
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
// var offline;  //  BENBEN
var offline = false;
var poolAddress;
var isEscape;
var isSpawnProxy;
var key;
var balance;
var tokenTx = {};
var localToken = {};
var tmp = {};
var ownedShips = {};
var tempOwnedShips = {};
var ship = {};
var parentShip = {};

var doTransaction = function(address, func, input, value) {
  if (wallet == null) {
	return;
  }
  var data = buildTransactionData(func, input);
  tx.data = data;
  tx.value = value || 0;
  tx.unit = "wei";
  if (offline) {
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
          if (wallet == null)
          { throw globalFuncs.errorMsgs[3]; }
          else if (!ethFuncs.validateHexString(tx.data))
          { throw globalFuncs.errorMsgs[9]; }
          else if (!globalFuncs.isNumeric(tx.gasLimit) || parseFloat(tx.gasLimit) <= 0)
          { throw globalFuncs.errorMsgs[8]; }
          tx.data = ethFuncs.sanitizeHex(tx.data);
          ajaxReq.getTransactionData(wallet.getAddressString(), function(data) {
            if (data.error) $scope.notifier.danger(data.msg);
            data = data.data;
            tx.to = address;
            tx.contractAddr = tx.to;
            $scope.showRaw = false;
            // just generate transaction with default amount and gas
            generateTx();
          });
        } catch (e) {
          $scope.notifier.danger(e);
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

var generateTx = function() {
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
      if (data.error) $scope.notifier.danger(data.msg);
      data = data.data;
      tx.to = tx.to == '' ? '0xCONTRACT' : tx.to;
      tx.contractAddr = tx.to == '0xCONTRACT' ? ethFuncs.getDeteministicContractAddress(wallet.getAddressString(), data.nonce) : '';
      var txData = uiFuncs.getTxData($scope);
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
    });
  } catch (e) {
    $scope.notifier.danger(e);
  }
}

var readContractData = function(address, func, input, outTypes, callback) {
  contract.address = address;
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
var validateShip = function(ship, next) {
  if (ship < 0 || ship > 4294967295)
    return $scope.notifier.danger("Ship " + ship + " not a galaxy, star or planet.");
  return next();
}

var validateParent = function(ship, next) {
  if (ship < 0 || ship > 65535)
    return $scope.notifier.danger("Ship " + ship + " not a galaxy or star.");
  return next();
}

var validateChild = function(ship, next) {
  if (ship < 256 || ship > 4294967295)
    return $scope.notifier.danger("Ship " + ship + " not a star or planet.");
  return next();
}

var validateGalaxy = function(galaxy, next) {
  if (galaxy < 0 || galaxy > 255)
    return $scope.notifier.danger("Ship " + galaxy + " not a galaxy.");
  return next();
}

var validateStar = function(star, next) {
  if (star < 256 || star > 65535)
    return $scope.notifier.danger("Ship " + star + " not a star.");
  return next();
}

var validateAddress = function(address, next) {
  if (!ethFuncs.validateEtherAddress(address))
    return $scope.notifier.danger(address + " is not a valid Ethereum address.");
  return next();
}

var validateTimestamp = function(timestamp, next) {
  if (timestamp < 0 || timestamp > 4200000000)
    return $scope.notifier.danger("Weird timestamp: " + timestamp);
  return next();
}

var validateBytes32 = function(bytes, next) {
  if (bytes.length > 32)
    return $scope.notifier.danger("Input too long: " + bytes);
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

var buildOwnedShips = function(address) {
  tmp = {}
  // zero out struct?
  getOwnedShips(address, function(data) {
    // if no ships returns, just zero this out, otherwise, wait until all 
    // ships have loaded
    if (data[0].length < 1) {
      ownedShips = {};
    }
    var x = data[0]
    for (var i in x) {
      if (i == x.length - 1) {
    // transfer shiplist once built
    buildShipData(x[i], true);
      } else {
    // transfer shiplist once built
    buildShipData(x[i], false);
      }
    }
  });
}

var buildShipData = function(address, terminate) {
  function put(data) {
    tmp[address] = {};
    tmp[address]['name'] = '~' + toShipName(address);
    tmp[address]['address'] = address;
    tmp[address]['hasBeenBooted'] = data[0];
    if (terminate) {
      tempOwnedShips = tmp;
      if (!angular.equals(ownedShips, tempOwnedShips)) {
    	// assign
        angular.copy(tempOwnedShips, ownedShips);
      }
    }
  }
  getHasBeenBooted(address, put);
}

var setPoolAddress = function(address) {
  poolAddress = address;
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
var getConstitutionOwner = function(callback) {
  readContractData(contracts.constitution,
    "owner()",
    [],
    ["address"],
    callback
  );
}

var getVotesAddress = function(callback) {
  readContractData(contracts.constitution,
    "votes()",
    [],
    ["address"],
    callback
  );
}

var getCanEscapeTo = function(ship, sponsor, callback) {
  readContractData(contracts.constitution,
    "canEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
}

var getShipsOwner = function(callback) {
  readContractData(contracts.ships,
    "owner()",
    [],
    ["address"],
    callback
  );
}

var getOwnedShips = function(address, callback) {
  readContractData(contracts.ships,
    "getOwnedShipsByAddress(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getOwner = function(ship, callback) {
  readContractData(contracts.ships,
    "getOwner(uint32)",
    [ship],
    ["address"],
    callback
  );
}

var getIsOwner = function(ship, address, callback) {
  readContractData(contracts.ships,
    "isOwner(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getIsActive = function(ship, callback) {
  readContractData(contracts.ships,
    "isActive(uint32)",
    [ship],
    ["bool"],
    callback
  );
}

var getSponsor = function(ship, callback) {
  readContractData(contracts.ships,
    "getSponsor(uint32)",
    [ship],
    ["uint32"],
    callback
  );
}

var getIsRequestingEscapeTo = function(ship, sponsor, callback) {
  readContractData(contracts.ships,
    "isRequestingEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
}

var getHasBeenBooted = function(ship, callback) {
  readContractData(contracts.ships,
    "hasBeenBooted(uint32)",
    [ship],
    ["bool"],
    callback
  );
}

var getKey = function(ship, callback) {
  readContractData(contracts.ships,
    "getKey(uint32)",
    [ship],
    ["bytes32"],
    callback
  );
}

var getIsTransferProxy = function(ship, address, callback) {
  readContractData(contracts.ships,
    "isTransferProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getIsSpawnProxy = function(ship, address, callback) {
  readContractData(contracts.ships,
    "isSpawnProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
}

var getEscapeRequest = function(ship, callback) {
  readContractData(contracts.ships,
    "getEscapeRequest(uint32)",
    [ship],
    ["uint32"],
    callback
  );
}

var getTransferringFor = function(address, callback) {
  readContractData(contracts.ships,
    "getTransferringFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getSpawningFor = function(address, callback) {
  readContractData(contracts.ships,
    "getSpawningFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
}

var getPoolAssets = function(callback) {
  readContractData(poolAddress,
    "getAllAssets()",
    [],
    ["uint16[]"],
    callback
  );
}

var getSparkBalance = function(callback) {
  readContractData(poolAddress,
    "balanceOf(address)",
    [wallet.getAddressString()],
    ["uint256"],
    callback
  );
}

var getHasVotedOnConstitutionPoll = function(galaxy, address, callback) {
  readContractData(contracts.polls,
    "hasVotedOnConstitutionPoll(uint8,address)",
    [galaxy, address],
    ["bool"],
    callback
  );
}

var getDocumentHasAchievedMajority = function(proposal, callback) {
  readContractData(contracts.polls,
    "documentHasAchievedMajority(bytes32)",
    [proposal],
    ["bool"],
    callback
  );
}

var getHasVotedOnDocumentPoll = function(galaxy, proposal, callback) {
  readContractData(contracts.polls,
    "hasVotedOnDocumentPoll(uint8,bytes32)",
    [galaxy, proposal],
    ["bool"],
    callback
  );
}
//
// READ: fill fields with requested data
//
var readShipData = function(ship) {
  validateShip(ship, function() {
    getHasBeenBooted(ship, put);
  });
  function put(data) {
    ownedShips[ship]['hasBeenBooted'] = data[0];
  }
}

var readOwnedShips = function(addr) {
  if (!addr) {
    return;
  }
  getOwnedShips(addr, function(data) {
    var res = "";
    for (var i in data[0]) {
      res = res + data[0][i] + "\n";
    }
    ownedShips = generateShipList(res);
  });
}

var readHasOwner = function(ship) {
  validateShip(ship, function() {
    getOwner(ship, put);
  });
  function put(data) {
    return data[0] == '0x0000000000000000000000000000000000000000' ? false : true;
  }
}

var readIsOwner = function(ship, addr) {
  validateShip(ship, function() {
    validateAddress(addr, function() {
      getIsOwner(ship, addr, put);
    });
  });
  function put(data) {
    return data[0];
  }
}

var readPoolAssets = function() {
  getPoolAssets(put);
  function put(data) {
    var t = [];
    for (var i = 0; i < data[0].length; i++) {
      t.push(formatShipName(toShipName(data[0][i].toFixed(0))));
    }
    poolAssets = t;
    if (poolAssets.length > 0) {
      ship = poolAssets[0];
    } else {
      // trigger an error?
    }
  };
}

var readParent = function(ship) {
  validateChild(ship, function() {
    getSponsor(ship, put);
  });
  function put(data) {
    parentShip = data[0];
  }
}

var readIsRequestingEscapeTo = function(ship, sponsor) {
  validateChild(ship, function() {
    validateParent(sponsor, function () {
      getIsRequestingEscapeTo(ship, sponsor, put);
    });
  });
  function put(data) {
    isEscape = data[0];
  }
}

var readKey = function(ship) {
  validateShip(ship, function() {
    getKey(ship, put);
  });
  function put(data) {
    key = data[0];
  }
}

var readIsSpawnProxy = function(ship, addr) {
  validateParent(ship, function() {
    validateAddress(addr, function () {
      getIsSpawnProxy(ship, addr, put);
    });
  });
  function put(data) {
    isSpawnProxy = data[0];
  }
}

var readBalance = function() {
  if (poolAddress) {
    getSparkBalance(function(data) {
      balance = data[0] / oneSpark;
    });
  } else {
    // throw an error here
  }
}
//
// CHECK: verify if conditions for a transaction are met
//
var checkOwnership = function(ship, next) {
  getIsOwner(ship, wallet.getAddressString(), function(data) {
    if (data[0]) return next();
    $scope.notifier.danger("Not your ship. " + ship);
  });
}

var checkIsTransferProxy = function(ship, addr, next) {
  getIsTransferProxy(ship, addr, function(data) {
    if (data[0]) return next();
    $scope.notifier.danger("Ship is not transferable by " + addr);
  });
}

var checkIsUnlocked = function(ship, next) {
  getIsActive(ship, function(data) {
    if (data[0]) return next();
    $scope.notifier.danger("Ship is not active.");
  });
}

var checkIsLatent = function(ship, next) {
  getIsActive(ship, function(data) {
    if (!data[0]) return next();
    $scope.notifier.danger("Ship is active.");
  });
}

var checkCanEscapeTo = function(ship, sponsor, next) {
  getCanEscapeTo(ship, sponsor, function(data) {
    if (data[0]) return next();
    $scope.notifier.danger("Ship " + ship + " cannot escape to ship " + sponsor + ".");
  });
}

var checkEscape = function(ship, sponsor, next) {
  getIsRequestingEscapeTo(ship, sponsor, function(data) {
    if (data[0]) return next();
    $scope.notifier.danger("Escape doesn't match.");
  });
}

var checkHasBeenBooted = function(sponsor, next) {
  getHasBeenBooted(sponsor, function(data) {
    if (data[0]) return next() 
    $scope.notifier.danger("Ship has not been booted.");
  });
}
//
// DO: do transactions that modify the blockchain
//
var doCreateGalaxy = function(galaxy, address) {
  validateGalaxy(galaxy, function() {
    validateAddress(address, function() {
      if (offline) return transact();
      getConstitutionOwner(checkPermission);
    });
  });
  function checkPermission(data) {
  	console.log("HERE");
    if (data[0] != wallet.getAddressString())
      return $scope.notifier.danger("Insufficient permissions.");
    getIsOwner(galaxy, address, checkAvailable);
  }
  function checkAvailable(data) {
    if (data[0].length > 0)
      return $scope.notifier.danger("Galaxy already owned.");
    transact();
  }
  function transact() {
    doTransaction(contracts.constitution,
      "createGalaxy(uint8,address)",
      [galaxy, address]
    );
  }
}

var doDeposit = function(star) {
  validateStar(star, function() {
    if (offline) return transact();
      checkIsTransferProxy(star, $rootScope.poolAddress, function() {
    	checkOwnership(star, checkHasNotBeenBooted);
      });
  });
  // star cannot be booted
  function checkHasNotBeenBooted() {
    getHasBeenBooted(star, function(data) {
      if (data[0])
    	return $scope.notifier.danger("Ship has been booted.");
      transact();
    });
  }
  function transact() {
    // will this bork if you enter a new pool address on the deposit screen?
    doTransaction($rootScope.poolAddress,
      "deposit(uint16)",
      [star]
    );
  }
}

var doWithdraw = function(star) {
  validateStar(star, function() {
    return transact();
  });
  function transact() {
    doTransaction($rootScope.poolAddress,
      "withdraw(uint16)",
      [star]
    );
  }
}

var doSpawn = function(ship, addr) {
  var sponsor = ship % 256;
  if (ship > 65535) sponsor = ship % 65536;
  validateShip(ship, function() {
    validateAddress(addr, function() {
      if (offline) return transact();
      checkIsLatent(ship, function() {
        checkHasBeenBooted(sponsor, checkParent);
      });
    });
  });
  // ship needs to be galaxy, or its parent needs to be living
  function checkParent() {
    if (ship < 256) return checkRights();
    checkIsUnlocked(sponsor, checkRights);
  }
  // user needs to be owner of sponsor or spawn proxy of sponsor
  function checkRights() {
    getIsSpawnProxy(sponsor, wallet.getAddressString(),
    function(data) {
      if (data[0]) return transact();
      checkOwnership(sponsor, transact);
    });
  }
  function transact() {
    doTransaction(contracts.constitution,
      "spawn(uint32,address)",
      [ship, addr]
    );
  }
}

var doSetSpawnProxy = function(ship, addr) {
  validateParent(ship, function() {
    validateAddress(addr, function() {
      if (offline) return transact();
      checkOwnership(ship, function() {
        checkIsUnlocked(ship, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "setSpawnProxy(uint16,address)",
      [ship, addr]
    );
  }
}

var doConfigureKeys = function(ship, encryptionKey, authenticationKey, discontinuous) {
  validateShip(ship, function() {
    validateBytes32(encryptionKey, function() {
      validateBytes32(authenticationKey, function() {
        if (offline) return transact();
        checkOwnership(ship, function() {
          checkIsUnlocked(ship, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "configureKeys(uint32,bytes32,bytes32,bool)",
      [ship, encryptionKey, authenticationKey, discontinuous]
    );
  }
}

var doTransferShip = function(ship, addr, reset) {
  validateShip(ship, function() {
    validateAddress(addr, function() {
      if (offline) return transact();
      checkOwnership(ship, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "transferShip(uint32,address,bool)",
      [ship, addr, reset]
    );
  }
}

var doSetTransferProxy = function(ship, addr) {
  validateShip(ship, function() {
    validateAddress(addr, function() {
      if (offline) return transact();
      checkOwnership(ship, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "setTransferProxy(uint32,address)",
      [ship, addr]
    );
  }
}

var doEscape = function(ship, sponsor) {
  validateChild(ship, function() {
    validateParent(sponsor, function() {
      if (offline) return transact();
      checkOwnership(ship, function() {
        checkHasBeenBooted(sponsor, function() {
          checkCanEscapeTo(ship, sponsor, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "escape(uint32,uint32)",
      [ship, sponsor]
    );
  }
}

var doAdopt = function(sponsor, escapee) {
  validateParent(sponsor, function() {
    validateChild(escapee, function () {
      if (offline) return transact();
      checkOwnership(escapee, function() {
        checkEscape(escapee, sponsor, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "adopt(uint32,uint32)",
      [sponsor, escapee]
    );
  }
}

var doReject = function(sponsor, escapee) {
  validateParent(sponsor, function() {
    validateChild(escapee, function () {
      if (offline) return transact();
      checkOwnership(escapee, function() {
        checkEscape(escapee, sponsor, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "reject(uint32,uint32)",
      [sponsor, escapee]
    );
  }
}

var doApprove = function(address, ship) {
  validateAddress(address, function () {
    validateShip(ship, function () {
      if (offline) return transact();
      checkOwnership(ship, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "approve(address,uint256)",
      [address, ship]
    );
  }
}

var doSafeTransferFrom = function(fromAddr, toAddr, ship) {
  validateAddress(fromAddr, function () {
    validateAddress(toAddr, function () {
      validateShip(ship, function () {
        if (offline) return transact();
        // TODO: add check to validate that the caller has been approved to initiate transfer
        transact();
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "safeTransferFrom(address,address,uint256)",
      [fromAddr, toAddr, ship]
    );
  }
}

var doCastConstitutionVote = function(galaxy, addr, vote) {
  validateGalaxy(galaxy, function() {
    validateAddress(addr, function() {
      if (offline) return transact();
      checkOwnership(galaxy, function() {
        checkIsUnlocked(galaxy, function() {
          getHasVotedOnConstitutionPoll(galaxy, addr, checkVote);
        });
      });
    });
  });
  function checkVote(data) {
    if (!data[0]) return transact();
    $scope.notifier.danger("Vote already registered.");
  }
  function transact() {
    doTransaction(contracts.constitution,
      "castConstitutionVote(uint8,address,bool)",
      [galaxy, addr, vote]
    );
  }
}

var doCastDocumentVote = function(galaxy, prop, vote) {
  validateGalaxy(galaxy, function() {
    validateBytes32(prop, function() {
      if (offline) return transact();
      checkOwnership(galaxy, function() {
        checkIsUnlocked(galaxy, function() {
          getDocumentHasAchievedMajority(prop, checkMajority);
        });
      });
    });
  });
  function checkMajority(data) {
    if (!data[0]) return getHasVotedOnDocumentPoll(galaxy, prop, checkVote);
    return $scope.notifier.danger("Document already has majority.");
  }
  function checkVote(data) {
    if (!data[0]) return transact();
    $scope.notifier.danger("Vote already registered.");
  }
  function transact() {
    doTransaction(contracts.constitution,
      "castDocumentVote(uint8,bytes32,bool)",
      [galaxy, prop, vote]
    );
  }
}

module.exports = {
  wallet: wallet,
  ajaxReq: ajaxReq,
  offline: offline,
  valShip: valShip,
  valAddress: valAddress,
  formatShipName: formatShipName,
  toShipName: toShipName,
  getSpawnCandidate: getSpawnCandidate,
  getConstitutionOwner: getConstitutionOwner,
  doCreateGalaxy: doCreateGalaxy
}

require('make-runnable');