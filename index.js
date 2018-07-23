'use strict';

// urbit constitution-js

var BigNumber = require('bignumber.js');
var ethTx = require('ethereumjs-tx');
var obService = require('urbit-ob');
var ethUtil = require('ethereumjs-util');
var request = require('request');
var utf8 = require('utf8');
var crypto = require('crypto');
var bip39 = require('bip39');
var hdkey = require('hdkey');

var uiFuncs = require('./scripts/uiFuncs');
var ethFuncs = require('./scripts/ethFuncs');
var validator = require('./scripts/validator');
var utils = require('./scripts/solidity/utils');
var ajaxReq = require('./scripts/ajaxReq');
var Wallet = require('./scripts/Wallet');

utils.BigNumber = BigNumber;
utils.sha3 = ethUtil.sha3;
utils.utf8 = utf8;

ethUtil.solidityCoder = require('./scripts/solidity/coder');
ethUtil.solidityUtils = utils;

uiFuncs.BigNumber = BigNumber;
uiFuncs.ajaxReq = ajaxReq;
uiFuncs.ethFuncs = ethFuncs;
uiFuncs.ethFuncs.etherUnits = utils;
uiFuncs.etherUnits = utils;
uiFuncs.ethTx = ethTx;
uiFuncs.validator = validator;

ethFuncs.ethUtil = ethUtil;
ethFuncs.BigNumber = BigNumber;
ethFuncs.ajaxReq = ajaxReq;
ethFuncs.etherUnits = ethUtil.solidityUtils;

validator.ethFuncs = ethFuncs;
validator.ethUtil = ethUtil;

ajaxReq.crypto = crypto;
ajaxReq.BigNumber = BigNumber;
ajaxReq.request = request;

var contract = {
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

var wallets = [];
var activeWallet;

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
var rawTx;
var poolAddress;
var ownedShips;

var buildWalletsFromMnemonic = function(mnemonic, callback) {
    var masterKeys = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    var str;
    var addr;
    var privKey;
    var path;

    for (var i = 0; i < 10; i++) {
      path = "m/44'/60'/0'/0/" + i;
      privKey = masterKeys.derive(path).privateKey;
      addr = '0x' + ethUtil.privateToAddress(privKey).toString('hex');
      if (i === 0) {
        activeWallet = new Wallet(privKey, addr);
        wallets.push(activeWallet);
      } else { wallets.push(new Wallet(privKey, addr)); }
    }

    activeWallet = wallets[0];
    if (activeWallet.addressString().length < 1) {
      callback('build wallets failed');
    } else { callback(activeWallet.addressString()); }
};

var doTransaction = function(address, func, input, callback, value) {
  if (activeWallet.addressString() == null) {
    return;
  }
  var data = buildTransactionData(func, input);
  tx.data = data;
  tx.value = value || 0;
  tx.unit = "wei";
  if (!offline) {
    var estObj = {
      from: activeWallet.addressString(),
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
          if (activeWallet == null)
          { throw validator.errorMsgs[3]; }
          else if (!ethFuncs.validateHexString(tx.data))
          { throw validator.errorMsgs[9]; }
          else if (!validator.isNumeric(tx.gasLimit) || parseFloat(tx.gasLimit) <= 0)
          { throw validator.errorMsgs[8]; }
          tx.data = ethFuncs.sanitizeHex(tx.data);
          ajaxReq.getTransactionData(activeWallet.addressString(), function(data) {
            if (data.error) {
              callback({ error: { msg: data.msg }, data: '' });
            } else {
              data = data.data;
              tx.to = address;
              tx.contractAddr = tx.to;
              // just generate transaction with default amount and gas
              generateTx(callback);
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
};

var generateTxOffline = function() {
  if (!ethFuncs.validateEtherAddress(tx.to)) {
    $scope.notifier.danger(validator.errorMsgs[5]);
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
};

var generateTx = function(callback) {
  try {
    if (activeWallet == null) {
      throw validator.errorMsgs[3];
    } else if (!ethFuncs.validateHexString(tx.data)) {
       throw validator.errorMsgs[9];
    } else if (!validator.isNumeric(tx.gasLimit) || parseFloat(tx.gasLimit) <= 0) {
      throw validator.errorMsgs[8];
    }
    tx.data = ethFuncs.sanitizeHex(tx.data);
    ajaxReq.getTransactionData(activeWallet.addressString(), function(data) {
      if (data.error) callback({ error: { msg: data.msg }, data: '' });
      data = data.data;
      tx.to = tx.to == '' ? '0xCONTRACT' : tx.to;
      tx.contractAddr = tx.to == '0xCONTRACT' ? ethFuncs.getDeteministicContractAddress(activeWallet.addressString(), data.nonce) : '';
      var txData = uiFuncs.getTxData(tx, activeWallet);
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
};

var sendTx = function(signedTx, callback) {
  uiFuncs.sendTx(signedTx, function(resp) {
    if (!resp.isError) {
      callback( { error: false, data: { resp: resp.data, tx: tx } })
    } else {
      callback( { error: { msg: resp.error } } );
    }
  });
};

var readContractData = function(address, func, input, outTypes, callback) {
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
};

var buildTransactionData = function(func, input) {
  var funcSig = ethFuncs.getFunctionSignature(func);
  var typeName = ethUtil.solidityUtils.extractTypeName(func);
  var types = typeName.split(',');
  types = types[0] == "" ? [] : types;
  return '0x' + funcSig + ethUtil.solidityCoder.encodeParams(types, input);
};
//
//// VALIDATE: validate input data
//
var validateShip = function(ship, callback, next) {
  if (ship < 0 || ship > 4294967295)
    callback({ error: { msg: "Ship " + ship + " not a galaxy, star or planet." }, data: '' });
  return next();
};

var validateParent = function(ship, callback, next) {
  if (ship < 0 || ship > 65535)
    callback({ error: { msg: "Ship " + ship + " not a galaxy or star." }, data: '' });
  return next();
};

var validateChild = function(ship, callback, next) {
  if (ship < 256 || ship > 4294967295)
    callback({ error: { msg: "Ship " + ship + " not a star or planet." }, data: '' });
  return next();
};

var validateGalaxy = function(galaxy, callback, next) {
  if (galaxy < 0 || galaxy > 255)
    callback({ error: { msg: "Ship " + galaxy + " not a galaxy." }, data: '' });
  return next();
};

var validateStar = function(star, callback, next) {
  if (star < 256 || star > 65535)
    callback({ error: { msg: "Ship " + star + " not a star." }, data: '' });
  return next();
};

var validateAddress = function(address, callback, next) {
  if (!ethFuncs.validateEtherAddress(address))
    callback({ error: { msg: address + " is not a valid Ethereum address." }, data: '' });
  return next();
};

var validateBytes32 = function(bytes, callback, next) {
  if (bytes.length > 32)
    callback({ error: { msg: "Input too long: " + bytes }, data: '' });
  return next();
};
//
// UI Validators
//
var valGalaxy = function(galaxyAddress) {
  if (galaxyAddress < 0 || galaxyAddress > 255 || typeof galaxyAddress !== 'number') {
    return true;
  } else {
    return false;
  }
};

var valStar = function(starAddress) {
  if (starAddress < 256 || starAddress > 65535 || typeof starAddress !== 'number') {
    return true;
  } else {
    return false;
  }
};

var valShip = function(shipAddress) {
  if (shipAddress < 0 || shipAddress > 4294967295 || typeof shipAddress !== 'number') {
    return true;
  } else {
    return false;
  }
};

var valAddress = function(ethAddress) {
  if (!ethFuncs.validateEtherAddress(ethAddress)) {
    return true;
  } else {
    return false;
  }
};
//
// UI Conveniences
//
var formatShipName = function(shipName) {
  if (!shipName) {
    return shipName;
  } 
  if (shipName.length < 2) {
    return shipName;
  }
  if (shipName[0] != '~') {
    return '~' + shipName;
  } else {
    return shipName;
  }
};

var buildOwnedShips = function(address, callback) {
  ownedShips = {}
  // zero out struct?
  getOwnedShips(address, function(data) {
    // if no ships returns, just zero this out, otherwise, wait until all 
    // ships have loaded
    if (data[0].length < 1) {
      ownedShips = {};
    }
    var x = data[0];
    for (var i in x) {
      if (i == x.length - 1) {
        // transfer shiplist once built
        buildShipData(x[i], true, callback);
      } else {
        // transfer shiplist once built
        buildShipData(x[i], false, callback);
      }
    }
  });
};

var buildShipData = function(address, terminate, callback) {
  function put(data) {
    ownedShips[address] = {};
    ownedShips[address]['name'] = '~' + toShipName(address);
    ownedShips[address]['address'] = address['c'][0];
    ownedShips[address]['hasBeenBooted'] = data[0];
    if (terminate) {
      callback(ownedShips);
    }
  }
  getHasBeenBooted(address, put);
};

var toAddress = function(shipName) {
  return obService.toAddress(shipName);
}

var toShipName = function(shipAddress) {
  if (shipAddress > -1 && shipAddress < 256) {
    return obService.toGalaxyName(shipAddress);
  } else if (shipAddress > 255 && shipAddress < 65536) {
    return obService.toStarName(shipAddress);
  } else {
    return obService.toPlanetName(shipAddress);
  }
};

var getSpawnCandidate = function(shipAddress) {
  var candidate;
  if (shipAddress > -1 && shipAddress < 256) {
    candidate = ((Math.floor(Math.random() * 255) + 1) * 256 + shipAddress);
    return candidate;
  } else if (shipAddress > 255 && address < 65536) {
    candidate = ((Math.floor(Math.random() * 65535) + 1) * 65536 + shipAddress);
    return candidate;
  } else {
    return;
  }
};

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
};
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
};

var getVotesAddress = function(callback) {
  readContractData(contracts.constitution,
    "votes()",
    [],
    ["address"],
    callback
  );
};

var getCanEscapeTo = function(ship, sponsor, callback) {
  readContractData(contracts.constitution,
    "canEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
};

var getShipsOwner = function(callback) {
  readContractData(contracts.ships,
    "owner()",
    [],
    ["address"],
    callback
  );
};

var getOwnedShips = function(address, callback) {
  readContractData(contracts.ships,
    "getOwnedShipsByAddress(address)",
    [address],
    ["uint32[]"],
    callback
  );
};

var getOwner = function(ship, callback) {
  readContractData(contracts.ships,
    "getOwner(uint32)",
    [ship],
    ["address"],
    callback
  );
};

var getIsOwner = function(shipAddress, ethAddress, callback) {
  readContractData(contracts.ships,
    "isOwner(uint32,address)",
    [shipAddress, ethAddress],
    ["bool"],
    callback
  );
};

var getIsActive = function(ship, callback) {
  readContractData(contracts.ships,
    "isActive(uint32)",
    [ship],
    ["bool"],
    callback
  );
};

var getSponsor = function(ship, callback) {
  readContractData(contracts.ships,
    "getSponsor(uint32)",
    [ship],
    ["uint32"],
    callback
  );
};

var getIsRequestingEscapeTo = function(ship, sponsor, callback) {
  readContractData(contracts.ships,
    "isRequestingEscapeTo(uint32,uint32)",
    [ship, sponsor],
    ["bool"],
    callback
  );
};

var getHasBeenBooted = function(ship, callback) {
  readContractData(contracts.ships,
    "hasBeenBooted(uint32)",
    [ship],
    ["bool"],
    callback
  );
};

var getKeys = function(ship, callback) {
  readContractData(contracts.ships,
    "getKeys(uint32)",
    [ship],
    ["bytes32"],
    callback
  );
};

var getIsTransferProxy = function(ship, address, callback) {
  readContractData(contracts.ships,
    "isTransferProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
};

var getIsSpawnProxy = function(ship, address, callback) {
  readContractData(contracts.ships,
    "isSpawnProxy(uint32,address)",
    [ship, address],
    ["bool"],
    callback
  );
};

var getEscapeRequest = function(ship, callback) {
  readContractData(contracts.ships,
    "getEscapeRequest(uint32)",
    [ship],
    ["uint32"],
    callback
  );
};

var getTransferringFor = function(address, callback) {
  readContractData(contracts.ships,
    "getTransferringFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
};

var getSpawningFor = function(address, callback) {
  readContractData(contracts.ships,
    "getSpawningFor(address)",
    [address],
    ["uint32[]"],
    callback
  );
};

var getPoolAssets = function(poolAddress, callback) {
  readContractData(poolAddress,
    "getAllAssets()",
    [],
    ["uint16[]"],
    callback
  );
};

var getSparkBalance = function(poolAddress, callback) {
  readContractData(poolAddress,
    "balanceOf(address)",
    [activeWallet.addressString()],
    ["uint256"],
    callback
  );
};

var getHasVotedOnConstitutionPoll = function(galaxy, address, callback) {
  readContractData(contracts.polls,
    "hasVotedOnConstitutionPoll(uint8,address)",
    [galaxy, address],
    ["bool"],
    callback
  );
};

var getDocumentHasAchievedMajority = function(proposal, callback) {
  readContractData(contracts.polls,
    "documentHasAchievedMajority(bytes32)",
    [proposal],
    ["bool"],
    callback
  );
};

var getHasVotedOnDocumentPoll = function(galaxy, proposal, callback) {
  readContractData(contracts.polls,
    "hasVotedOnDocumentPoll(uint8,bytes32)",
    [galaxy, proposal],
    ["bool"],
    callback
  );
};
//
// READ: fill fields with requested data
//
var readShipData = function(shipAddress, callback) {
  validateShip(shipAddress, callback, function() {
    getHasBeenBooted(shipAddress, put);
  });
  function put(data) {
    callback({ ship: shipAddress, hasBeenBooted: data[0] });
  }
};

var readOwnedShips = function(ethAddress, callback) {
  if (!ethAddress) {
    return;
  }
  getOwnedShips(ethAddress, function(data) {
    var res = "";
    for (var i in data[0]) {
      res = res + data[0][i] + "\n";
    }
    callback(generateShipList(res));
  });
};

var readHasOwner = function(shipAddress, callback) {
  validateShip(shipAddress, callback, function() {
    getOwner(shipAddress, put);
  });
  function put(data) {
    callback(data[0] == '0x0000000000000000000000000000000000000000' ? false : true);
  }
};

var readIsOwner = function(shipAddress, ethAddress, callback) {
  validateShip(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function() {
      getIsOwner(shipAddress, ethAddress, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
};

var readPoolAssets = function(poolAddress, callback) {
  getPoolAssets(poolAddress, put);
  function put(data) {
    var t = [];
    for (var i = 0; i < data[0].length; i++) {
      t.push(formatShipName(toShipName(data[0][i].toFixed(0))));
    }
    callback(t);
  };
};

var readParent = function(shipAddress, callback) {
  validateChild(shipAddress, callback, function() {
    getSponsor(shipAddress, put);
  });
  function put(data) {
    callback(data[0]);
  }
};

var readIsRequestingEscapeTo = function(shipAddress, sponsorAddress, callback) {
  validateChild(shipAddress, callback, function() {
    validateParent(sponsorAddress, callback, function () {
      getIsRequestingEscapeTo(shipAddress, sponsorAddress, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
};

var readKeys = function(shipAddress, callback) {
  validateShip(shipAddress, callback, function() {
    getKeys(shipAddress, put);
  });
  function put(data) {
    callback(data[0]);
  }
};

var readIsSpawnProxy = function(shipAddress, ethAddress, callback) {
  validateParent(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function () {
      getIsSpawnProxy(shipAddress, ethAddress, put);
    });
  });
  function put(data) {
    callback(data[0]);
  }
};

var readBalance = function(poolAddress, callback) {
  if (poolAddress) {
    getSparkBalance(poolAddress, function(data) {
      callback(data[0] / oneSpark);
    });
  } else {
    // throw an error here
  }
};
//
// CHECK: verify if conditions for a transaction are met
//
var checkOwnership = function(shipAddress, callback, next) {
  getIsOwner(shipAddress, activeWallet.addressString(), function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Not your ship. " + shipAddress }, data: '' });
  });
};

var checkIsTransferProxy = function(shipAddress, ethAddress, callback, next) {
  getIsTransferProxy(shipAddress, ethAddress, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship is not transferable by " + ethAddress }, data: '' });
  });
};

var checkIsUnlocked = function(shipAddress, callback, next) {
  getIsActive(shipAddress, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship is not active." }, data: '' });
  });
};

var checkIsLatent = function(shipAddress, callback, next) {
  getIsActive(shipAddress, function(data) {
    if (!data[0]) return next();
    callback({ error: { msg: "Ship is active." }, data: '' });
  });
};

var checkCanEscapeTo = function(shipAddress, sponsorAddress, callback, next) {
  getCanEscapeTo(shipAddress, sponsorAddress, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Ship " + shipAddress + " cannot escape to ship " + sponsorAddress + "." }, data: '' });
  });
};

var checkEscape = function(shipAddress, sponsorAddress, callback, next) {
  getIsRequestingEscapeTo(shipAddress, sponsorAddress, function(data) {
    if (data[0]) return next();
    callback({ error: { msg: "Escape doesn't match." }, data: '' });
  });
};

var checkHasBeenBooted = function(sponsorAddress, callback, next) {
  getHasBeenBooted(sponsorAddress, function(data) {
    if (data[0]) return next() 
    callback({ error: { msg: "Ship has not been booted." }, data: '' });
  });
};

var checkIsNotOwned = function(shipAddress, callback, next) {
  readHasOwner(shipAddress, function(data) {
    if (!data[0]) return next() 
    callback({ error: { msg: "Ship has an owner." }, data: '' });
  });
};
//
// DO: do transactions that modify the blockchain
//
var doCreateGalaxy = function(galaxy, callback) {
  var ethAddress = activeWallet.addressString();
  validateGalaxy(galaxy, callback, function() {
    validateAddress(ethAddress, callback, function() {
      if (offline) return transact();
      getConstitutionOwner(checkPermission);
    });
  });
  function checkPermission(data) {
    if (data[0] != ethAddress)
      callback({ error: { msg: "Insufficient permissions." }, data: '' });
    checkIsNotOwned(galaxy, callback, transact);
  }
  function transact() {
    doTransaction(contracts.constitution,
      "createGalaxy(uint8,address)",
      [galaxy, ethAddress],
      callback
    );
  }
};

var doDeposit = function(star, poolAddress, callback) {
  validateStar(star, callback, function() {
    if (offline) return transact();
      checkIsTransferProxy(star, poolAddress, callback, function() {
        checkOwnership(star, callback, checkHasNotBeenBooted);
      });
  });
  // star cannot be booted
  function checkHasNotBeenBooted() {
    getHasBeenBooted(star, function(data) {
      if (data[0])
        callback({ error: { msg: "Ship has been booted." }, data: '' });
      transact();
    });
  }
  function transact() {
    // will this bork if you enter a new pool address on the deposit screen?
    doTransaction(poolAddress,
      "deposit(uint16)",
      [star],
      callback
    );
  }
};

var doWithdraw = function(star, poolAddress, callback) {
  validateStar(star, callback, function() {
    return transact();
  });
  function transact() {
    doTransaction(poolAddress,
      "withdraw(uint16)",
      [star],
      callback
    );
  }
};

var doSpawn = function(shipAddress, callback) {
  var sponsorAddress = shipAddress % 256;
  if (shipAddress > 65535) sponsorAddress = shipAddress % 65536;
  var ethAddress = activeWallet.addressString();
  validateShip(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function() {
      if (offline) return transact();
      checkIsLatent(shipAddress, callback, function() {
        checkHasBeenBooted(sponsorAddress, callback, checkParent);
      });
    });
  });
  // ship needs to be galaxy, or its parent needs to be living
  function checkParent() {
    if (shipAddress < 256) return checkRights();
    checkIsUnlocked(sponsorAddress, callback, checkRights);
  }
  // user needs to be owner of sponsor or spawn proxy of sponsor
  function checkRights() {
    getIsSpawnProxy(sponsorAddress, ethAddress, function(data) {
      if (data[0]) return transact();
      checkOwnership(sponsorAddress, callback, transact);
    });
  }
  function transact() {
    doTransaction(contracts.constitution,
      "spawn(uint32,address)",
      [shipAddress, ethAddress],
      callback
    );
  }
};

var doSetSpawnProxy = function(shipAddress, ethAddress, callback) {
  validateParent(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, callback, function() {
        checkIsUnlocked(shipAddress, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "setSpawnProxy(uint16,address)",
      [shipAddress, ethAddress],
      callback
    );
  }
};

var doConfigureKeys = function(shipAddress, encryptionKey, authenticationKey, discontinuous, callback) {
  validateShip(shipAddress, callback, function() {
    validateBytes32(encryptionKey, callback, function() {
      validateBytes32(authenticationKey, callback, function() {
        if (offline) return transact();
        checkOwnership(shipAddress, callback, function() {
          checkIsUnlocked(shipAddress, callback, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "configureKeys(uint32,bytes32,bytes32,bool)",
      [shipAddress, encryptionKey, authenticationKey, discontinuous],
      callback
    );
  }
};

var doTransferShip = function(shipAddress, ethAddress, reset, callback) {
  validateShip(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "transferShip(uint32,address,bool)",
      [shipAddress, ethAddress, reset],
      callback
    );
  }
};

var doSetTransferProxy = function(shipAddress, ethAddress, callback) {
  validateShip(shipAddress, callback, function() {
    validateAddress(ethAddress, callback, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "setTransferProxy(uint32,address)",
      [shipAddress, ethAddress],
      callback
    );
  }
};

var doEscape = function(shipAddress, sponsorAddress, callback) {
  validateChild(shipAddress, callback, function() {
    validateParent(sponsorAddress, callback, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, callback, function() {
        checkHasBeenBooted(sponsorAddress, callback, function() {
          checkCanEscapeTo(shipAddress, sponsorAddress, callback, transact);
        });
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "escape(uint32,uint32)",
      [shipAddress, sponsorAddress],
      callback
    );
  }
};

var doAdopt = function(sponsorAddress, escapeeAddress, callback) {
  validateParent(sponsorAddress, callback, function() {
    validateChild(escapeeAddress, callback, function () {
      if (offline) return transact();
      checkOwnership(escapeeAddress, callback, function() {
        checkEscape(escapeeAddress, sponsorAddress, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "adopt(uint32,uint32)",
      [sponsorAddress, escapeeAddress],
      callback
    );
  }
};

var doReject = function(sponsorAddress, escapeeAddress, callback) {
  validateParent(sponsorAddress, callback, function() {
    validateChild(escapeeAddress, callback, function () {
      if (offline) return transact();
      checkOwnership(escapeeAddress, callback, function() {
        checkEscape(escapeeAddress, sponsorAddress, callback, transact);
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "reject(uint32,uint32)",
      [sponsorAddress, escapeeAddress],
      callback
    );
  }
};

var doApprove = function(ethAddress, shipAddress, callback) {
  validateAddress(ethAddress, callback, function () {
    validateShip(shipAddress, callback, function () {
      if (offline) return transact();
      checkOwnership(shipAddress, callback, transact);
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "approve(address,uint256)",
      [ethAddress, shipAddress],
      callback
    );
  }
};

var doSafeTransferFrom = function(fromEthAddress, toEthAddress, shipAddress, callback) {
  validateAddress(fromEthAddress, callback, function () {
    validateAddress(toEthAddress, callback, function () {
      validateShip(shipAddress, callback, function () {
        if (offline) return transact();
        // TODO: add check to validate that the caller has been approved to initiate transfer
        transact();
      });
    });
  });
  function transact() {
    doTransaction(contracts.constitution,
      "safeTransferFrom(address,address,uint256)",
      [fromEthAddress, toEthAddress, shipAddress],
      callback
    );
  }
};

var doCastConstitutionVote = function(galaxy, prop, vote, callback) {
  validateGalaxy(galaxy, callback, function() {
    validateAddress(prop, callback, function() {
      if (offline) return transact();
      checkOwnership(galaxy, callback, function() {
        checkIsUnlocked(galaxy, callback, function() {
          getHasVotedOnConstitutionPoll(galaxy, prop, checkVote);
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
      "castConstitutionVote(uint8,address,bool)",
      [galaxy, prop, vote],
      callback
    );
  }
};

var doCastDocumentVote = function(galaxy, prop, vote, callback) {
  validateGalaxy(galaxy, function() {
    validateBytes32(prop, function() {
      if (offline) return transact();
      checkOwnership(galaxy, function() {
        checkIsUnlocked(galaxy, callback, function() {
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
      "castDocumentVote(uint8,bytes32,bool)",
      [galaxy, prop, vote],
      callback
    );
  }
};

module.exports = {
  offline: offline,
  poolAddress: poolAddress,
  contracts: contracts,
  buildWalletsFromMnemonic: buildWalletsFromMnemonic,
  wallets: wallets,
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
};