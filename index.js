'use strict';

// urbit constitution-js

var Web3 = require('web3');
var ethUtil = require('ethereumjs-util');
var obService = require('urbit-ob');
var contractDetails = require('./scripts/contractDetails');

const minShipAddress = 0;
const maxGalaxyAddress = 255;
const minStarAddress = 256;
const maxStarAddress = 65535;
const maxShipAddress = 4294967295;
const emptyAddress = '0x0000000000000000000000000000000000000000';
const oneSpark = 1000000000000000000;
const planetsPerSpark = 65536;

var web3;
var contracts;
var privateKey;
var hdKey;
var offline = false;
//
//// CONFIG: setup and configure web3
//
var setServerUrl = function(serverURL) {
  if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); } 
  else { web3 = new Web3(new Web3.providers.HttpProvider(serverURL)); }

  contracts = {
    constitution: new web3.eth.Contract(contractDetails.constitution['abi'], contractDetails.constitution['address']),
    ships: new web3.eth.Contract(contractDetails.ships['abi'], contractDetails.ships['address']),
    polls: new web3.eth.Contract(contractDetails.polls['abi'], contractDetails.polls['address']),
    pool: new web3.eth.Contract(contractDetails.pool['abi'], contractDetails.pool['address'])
  };
};

var setPrivateKey = function(hd, path, idx, cb) {
  hdKey = hd;
  web3.eth.accounts.privateKeyToAccount(hdKey.privateKey.toString('hex'));
  setDefaultAccountWithPathAndIndex(path, idx, cb);
};

var setDefaultAccountWithPathAndIndex = function(path, idx, cb) {
  web3.eth.getAccounts(function(err, res) {
    if (!err) {
      web3.eth.defaultAccount = res[idx];
      privateKey = hdKey.derive(path + '/' + idx).privateKey.toString('hex');
      cb({ error: false, data: web3.eth.defaultAccount });
    } else { cb({ error: { msg: "Error setting private key" }, data: '' }); }
  });
};

var setPoolAddress = function(poolAddress) {
  contractDetails.pool['address'] = poolAddress;
  contracts['pool'] = new web3.eth.Contract(contractDetails.pool['abi'], contractDetails.pool['address']);
};
//
//// VALIDATE: validate input data
//
var validateShip = function(ship, cb, next) {
  if (ship < minShipAddress || ship > maxShipAddress || ship % 1 !== 0)
    cb({ error: { msg: "Ship " + ship + " not a galaxy, star or planet." }, data: '' });
  return next();
};

var validateParent = function(ship, cb, next) {
  if (ship < minShipAddress || ship > maxStarAddress || ship % 1 !== 0)
    cb({ error: { msg: "Ship " + ship + " not a galaxy or star." }, data: '' });
  return next();
};

var validateChild = function(ship, cb, next) {
  if (ship < minStarAddress || ship > maxShipAddress || ship % 1 !== 0)
    cb({ error: { msg: "Ship " + ship + " not a star or planet." }, data: '' });
  return next();
};

var validateGalaxy = function(galaxy, cb, next) {
  if (galaxy < minShipAddress || galaxy > maxGalaxyAddress || galaxy % 1 !== 0)
    cb({ error: { msg: "Ship " + galaxy + " not a galaxy." }, data: '' });
  return next();
};

var validateStar = function(star, cb, next) {
  if (star < minStarAddress || star > maxStarAddress || star % 1 !== 0)
    cb({ error: { msg: "Ship " + star + " not a star." }, data: '' });
  return next();
};

var validateAddress = function(address, cb, next) {
  if (!validateEtherAddress(address))
    cb({ error: { msg: address + " is not a valid Ethereum address." }, data: '' });
  return next();
};

var validateBytes32 = function(bytes, cb, next) {
  if (bytes.length > 32)
    cb({ error: { msg: "Input too long: " + bytes }, data: '' });
  return next();
};

var validateEtherAddress = function(address) {
  if (address.substring(0, 2) != "0x") return false;
  else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
  else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
  else return isChecksumAddress(address);
}

var isChecksumAddress = function(address) {
  return address == ethUtil.toChecksumAddress(address);
};
//
// UI Validators
//
var valGalaxy = function(galaxyAddress) {
  if (galaxyAddress < minShipAddress || galaxyAddress > maxGalaxyAddress || typeof galaxyAddress !== 'number' || galaxyAddress % 1 !== 0) {
    return false;
  } else {
    return true;
  }
};

var valStar = function(starAddress) {
  if (starAddress < minStarAddress || starAddress > maxStarAddress || typeof starAddress !== 'number' || starAddress % 1 !== 0) {
    return false;
  } else {
    return true;
  }
};

var valShip = function(shipAddress) {
  if (shipAddress < minShipAddress || shipAddress > maxShipAddress || typeof shipAddress !== 'number' || shipAddress % 1 !== 0) {
    return false;
  } else {
    return true;
  }
};

var valAddress = function(ethAddress) {
  if (validateEtherAddress(ethAddress)) {
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

var toAddress = function(shipName) {
  return obService.toAddress(shipName);
}

var toShipName = function(shipAddress) {
  if (shipAddress > -1 && shipAddress < minStarAddress) {
    return obService.toGalaxyName(shipAddress);
  } else if (shipAddress > maxGalaxyAddress && shipAddress < (maxStarAddress + 1)) {
    return obService.toStarName(shipAddress);
  } else {
    return obService.toPlanetName(shipAddress);
  }
};

var getSpawnCandidate = function(shipAddress) {
  var candidate;
  if (shipAddress > -1 && shipAddress < minStarAddress) {
    candidate = ((Math.floor(Math.random() * maxGalaxyAddress) + 1) * minStarAddress + shipAddress);
    return candidate;
  } else if (shipAddress > maxGalaxyAddress && shipAddress < (maxStarAddress + 1)) {
    candidate = ((Math.floor(Math.random() * maxStarAddress) + 1) * (maxStarAddress + 1) + shipAddress);
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
var getConstitutionOwner = function(cb) {
  contracts['constitution'].methods.owner().call(cb);
};

var getVotesAddress = function(cb) {
  contracts['constitution'].methods.votes().call(cb);
};

var getCanEscapeTo = function(ship, sponsor, cb) {
  contracts['constitution'].methods.canEscapeTo(ship,sponsor).call(cb);
};

var getShipsOwner = function(cb) {
  contracts['ships'].methods.owner().call(cb);
};

var getOwnedShips = function(address, cb) {
  contracts['ships'].methods.getOwnedShipsByAddress(address).call(cb);
};

var getOwner = function(ship, cb) {
  contracts['ships'].methods.getOwner(ship).call(cb);
};

var getIsOwner = function(shipAddress, ethAddress, cb) {
  contracts['ships'].methods.isOwner(shipAddress,ethAddress).call(cb);
};

var getIsActive = function(ship, cb) {
  contracts['ships'].methods.isActive(ship).call(cb);
};

var getSponsor = function(ship, cb) {
  contracts['ships'].methods.getSponsor(ship).call(cb);
};

var getIsRequestingEscapeTo = function(ship, sponsor, cb) {
  contracts['ships'].methods.isRequestingEscapeTo(ship,sponsor).call(cb);
};

var getHasBeenBooted = function(ship, cb) {
  contracts['ships'].methods.hasBeenBooted(ship).call(cb);
};

var getKeys = function(ship, cb) {
  contracts['ships'].methods.getKeys(ship).call(cb);
};

var getIsTransferProxy = function(ship, address, cb) {
  contracts['ships'].methods.isTransferProxy(ship,address).call(cb);
};

var getIsSpawnProxy = function(ship, address, cb) {
  contracts['ships'].methods.isSpawnProxy(ship,address).call(cb);
};

var getEscapeRequest = function(ship, cb) {
  contracts['ships'].methods.getEscapeRequest(ship).call(cb);
};

var getTransferringFor = function(address, cb) {
  contracts['ships'].methods.getTransferringFor(address).call(cb);
};

var getSpawningFor = function(address, cb) {
  contracts['ships'].methods.getSpawningFor(address).call(cb);
};

var getPoolAssets = function(cb) {
  contracts['pool'].methods.getAllAssets().call(cb);
};

var getSparkBalance = function(ethAddress, cb) {
  contracts['pool'].methods.balanceOf(ethAddress).call(cb);
};

var getHasVotedOnConstitutionPoll = function(galaxy, address, cb) {
  contracts['polls'].methods.hasVotedOnConstitutionPoll(galaxy,address).call(cb);
};

var getDocumentHasAchievedMajority = function(proposal, cb) {
  contracts['polls'].methods.documentHasAchievedMajority(proposal).call(cb);
};

var getHasVotedOnDocumentPoll = function(galaxy, proposal, cb) {
  contracts['polls'].methods.hasVotedOnDocumentPoll(galaxy,proposal).call(cb);
};
//
// READ: fill fields with requested data
//
var readShipData = function(shipAddress, cb) {
  validateShip(shipAddress, cb, function() {
    getHasBeenBooted(shipAddress, put);
  });
  function put(err, res) {
    if (!err) {
      cb({ ship: shipAddress, hasBeenBooted: res });
    } else { cb({ error: { msg: "Error retrieving hasBeenBooted" }, data: '' }); }
  }
};

var readOwnedShips = function(ethAddress, cb) {
  if (!ethAddress) { return; }
  validateAddress(ethAddress, cb, function() {
    getOwnedShips(ethAddress, function(err, res) {
      if (!err) {
        var str = "";
        for (var i = 0; i < res.length; i++) {
          str = str + res[i] + "\n";
        }
        cb(generateShipList(res));
      } else { cb({ error: { msg: "Error retrieving owned ships" }, data: '' }); }
    });
  });
};

var readOwnedShipsStatus = function(ethAddress, cb) {
  if (!ethAddress) { return; }
  validateAddress(ethAddress, cb, function() {
    var ownedShips = {}
    var shipsAcquired = function() {
      if (ownedShips.length < 1) { cb({ error: { msg: ethAddress + "does not own any ships." }, data: '' }); } 
      else { cb(ownedShips); }
    }
    getOwnedShips(ethAddress, function(err, res) {
      if (!err) {
        if (res.length < 1) { shipsAcquired(); }
        var counter = 0;
        var getBootedData = function() {
          getHasBeenBooted(res[counter], function(err, bootedResult) {
            var shipAddress = res[counter];
            if (!err) {
              ownedShips[shipAddress] = {};
              ownedShips[shipAddress]['name'] = '~' + toShipName(shipAddress);
              ownedShips[shipAddress]['address'] = shipAddress;
              ownedShips[shipAddress]['hasBeenBooted'] = bootedResult;
              if (counter === res.length - 1) { shipsAcquired(); }
              else { 
                counter++;
                getBootedData();
              }
            } else { cb({ error: { msg: "Error retrieving booted status." }, data: '' }); }
          });
        }
        getBootedData();
      } else { cb({ error: { msg: "Error retrieving ships." }, data: '' }); }
    });
  });
};

var readTransferringFor = function(ethAddress, cb) {
  if (!ethAddress) { return; }
  validateAddress(ethAddress, cb, function() {
    getTransferringFor(ethAddress, put);
    function put(err, res) {
      if (!err) {
        cb(res);
      } else { cb({ error: { msg: "Error retrieving transferringFor" }, data: '' }); }
    }
  });
};

var readHasOwner = function(shipAddress, cb) {
  validateShip(shipAddress, cb, function() {
    getOwner(shipAddress, put);
  });
  function put(err, res) {
    if (!err) {
      cb(res === emptyAddress ? false : true);
    } else { cb({ error: { msg: "Error retrieving owner" }, data: '' }); }
  }
};

var readIsOwner = function(shipAddress, ethAddress, cb) {
  validateShip(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function() {
      getIsOwner(shipAddress, ethAddress, put);
    });
  });
  function put(err, res) {
    if (!err) {
      cb(res);
    } else { cb({ error: { msg: "Error retrieving isOwner" }, data: '' }); }
  }
};

var readSponsor = function(shipAddress, cb) {
  validateChild(shipAddress, cb, function() {
    getSponsor(shipAddress, put);
  });
  function put(err, res) {
    if (!err) {
      cb(res);
    } else { cb({ error: { msg: "Error retrieving sponsor" }, data: '' }); }
  }
};

var readPoolAssets = function(cb) {
  getPoolAssets(put);
  function put(err, res) {
    if (!err) {
      var t = [];
      for (var i = 0; i < res.length; i++) {
        t.push(formatShipName(toShipName(res[i])));
      }
      cb(t);
    } else { cb({ error: { msg: "Error retrieving pool assets" }, data: '' }); }
  }
};

var readIsRequestingEscapeTo = function(shipAddress, sponsorAddress, cb) {
  validateChild(shipAddress, cb, function() {
    validateParent(sponsorAddress, cb, function () {
      getIsRequestingEscapeTo(shipAddress, sponsorAddress, put);
    });
  });
  function put(err, res) {
    if (!err) {
      cb(res);
    } else { cb({ error: { msg: "Error retrieving isRequestingEscapeTo" }, data: '' }); }
  }
};

var readKeys = function(shipAddress, cb) {
  validateShip(shipAddress, cb, function() {
    getKeys(shipAddress, put);
  });
  function put(err, res) {
    if (!err) {
      cb(res);
    } else { cb({ error: { msg: "Error retrieving keys" }, data: '' }); }
  }
};

var readIsSpawnProxy = function(shipAddress, ethAddress, cb) {
  validateParent(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function () {
      getIsSpawnProxy(shipAddress, ethAddress, put);
    });
  });
  function put(err, res) {
    if (!err) {
      cb(res);
    } else { cb({ error: { msg: "Error retrieving spawn proxy" }, data: '' }); }
  }
};

var readBalance = function(ethAddress, cb) {
  getSparkBalance(ethAddress, function(err, res) {
    if (!err) {
      cb((res / oneSpark) / planetsPerSpark);
    } else { cb({ error: { msg: "Error retrieving spark balance" }, data: '' }); }
  });
};
//
// CHECK: verify if conditions for a transaction are met
//
var checkOwnership = function(shipAddress, cb, next) {
  getIsOwner(shipAddress, web3.eth.defaultAccount, function(err, res) {
    if (!err) {
      if (res) return next();
      cb({ error: { msg: "Not your ship. " + shipAddress }, data: '' });
    } else { cb({ error: { msg: "Error retrieving ownership status" }, data: '' }); }
  });
};

var checkIsTransferProxy = function(shipAddress, ethAddress, cb, next) {
  getIsTransferProxy(shipAddress, ethAddress, function(err, res) {
    if (!err) {
      if (res) return next();
      cb({ error: { msg: "Ship is not transferable by " + ethAddress }, data: '' });
    } else { cb({ error: { msg: "Error retrieving transfer proxy status" }, data: '' }); }
  });
};

var checkIsUnlocked = function(shipAddress, cb, next) {
  getIsActive(shipAddress, function(err, res) {
    if (!err) {
      if (res) return next();
      cb({ error: { msg: "Ship is not active." }, data: '' });
    } else { cb({ error: { msg: "Error retrieving unlocked status" }, data: '' }); }
  });
};

var checkIsLatent = function(shipAddress, cb, next) {
  getIsActive(shipAddress, function(err, res) {
    if (!err) {
      if (!res) return next();
      cb({ error: { msg: "Ship is active." }, data: '' });
    } else { cb({ error: { msg: "Error retrieving latent status" }, data: '' }); }
  });
};

var checkCanEscapeTo = function(shipAddress, sponsorAddress, cb, next) {
  getCanEscapeTo(shipAddress, sponsorAddress, function(err, res) {
    if (!err) {
      if (res) return next();
      cb({ error: { msg: "Ship " + shipAddress + " cannot escape to ship " + sponsorAddress + "." }, data: '' });
    } else { cb({ error: { msg: "Error retrieving canEscapeTo" }, data: '' }); }
  });
};

var checkEscape = function(shipAddress, sponsorAddress, cb, next) {
  getIsRequestingEscapeTo(shipAddress, sponsorAddress, function(err, res) {
    if (!err) {
      if (res) return next();
      cb({ error: { msg: "Escape doesn't match." }, data: '' });
    } else { cb({ error: { msg: "Error retrieving isRequestingEscapeTo" }, data: '' }); }
  });
};

var checkHasBeenBooted = function(sponsorAddress, cb, next) {
  getHasBeenBooted(sponsorAddress, function(err, res) {
    if (!err) {
      if (res) return next() 
      cb({ error: { msg: "Ship has not been booted." }, data: '' });
  } else { cb({ error: { msg: "Error retrieving booted status" }, data: '' }); }
  });
};

var checkIsNotOwned = function(shipAddress, cb, next) {
  readHasOwner(shipAddress, function(err, res) {
    if (!err) {
      if (!res) return next() 
      cb({ error: { msg: "Ship has an owner." }, data: '' });
    } else { cb({ error: { msg: "Error retrieving hasOwner" }, data: '' }); }
  });
};
//
// DO: do transactions that modify the blockchain
//
var doCreateGalaxy = function(galaxy, ethAddress, cb) {
  validateGalaxy(galaxy, cb, function() {
    validateAddress(ethAddress, cb, function() {
      if (offline) return transact();
      getConstitutionOwner(checkPermission);
    });
  });
  function checkPermission(err, res) {
    if (!err) {
      if (res !== ethUtil.toChecksumAddress(ethAddress)) { cb({ error: { msg: "Insufficient permissions." }, data: '' }); }
      else { checkIsNotOwned(galaxy, cb, transact); }
    }
  }
  function transact() {
    signTransaction(contracts['constitution'].methods.createGalaxy(galaxy, ethAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doDeposit = function(star, poolAddress, cb) {
  validateStar(star, cb, function() {
    if (offline) return transact();
      checkIsTransferProxy(star, poolAddress, cb, function() {
        checkOwnership(star, cb, checkHasNotBeenBooted);
      });
  });
  function checkHasNotBeenBooted() {
    getHasBeenBooted(star, function(data) {
      if (data) { cb({ error: { msg: "Ship has already been booted." }, data: '' }); }
      else { transact(); }
    });
  }
  function transact() {
    signTransaction(contracts['pool'].methods.deposit(star).encodeABI(),
                    contractDetails.pool['address'],
                    cb);
  }
};

var doWithdraw = function(star, poolAddress, cb) {
  validateStar(star, cb, function() {
    return transact();
  });
  function transact() {
    signTransaction(contracts['pool'].methods.withdraw(star).encodeABI(),
                    contractDetails.pool['address'],
                    cb);
  }
};

var doSpawn = function(shipAddress, ethAddress, cb) {
  var sponsorAddress = shipAddress % minStarAddress;
  if (shipAddress > maxStarAddress) sponsorAddress = shipAddress % (maxStarAddress + 1);
  validateShip(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function() {
      if (offline) return transact();
      checkIsLatent(shipAddress, cb, function() {
        checkHasBeenBooted(sponsorAddress, cb, checkParent);
      });
    });
  });
  function checkParent() {
    if (shipAddress < minStarAddress) return checkRights();
    checkIsUnlocked(sponsorAddress, cb, checkRights);
  }
  function checkRights() {
    getIsSpawnProxy(sponsorAddress, ethAddress, function(err, res) {
      if (!err) {
        if (res) return transact();
        checkOwnership(sponsorAddress, cb, transact);
      } else { cb({ error: { msg: "Error retrieving spawn proxy status" }, data: '' }); }
    });
  }
  function transact() {
    signTransaction(contracts['constitution'].methods.spawn(shipAddress, ethAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doSetSpawnProxy = function(shipAddress, ethAddress, cb) {
  validateParent(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, cb, function() {
        checkIsUnlocked(shipAddress, cb, transact);
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.setSpawnProxy(shipAddress, ethAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doConfigureKeys = function(shipAddress, encryptionKey, authenticationKey, cryptoSuiteVersion, discontinuous, cb) {
  var encryp32 = web3.utils.fromAscii(encryptionKey);
  var authent32 = web3.utils.fromAscii(authenticationKey);
  validateShip(shipAddress, cb, function() {
    validateBytes32(encryp32, cb, function() {
      validateBytes32(authent32, cb, function() {
        // TODO: add validation for cryptoSuiteVersion
        if (offline) return transact();
        checkOwnership(shipAddress, cb, function() {
          checkIsUnlocked(shipAddress, cb, transact);
        });
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.configureKeys(shipAddress, encryp32, authent32, cryptoSuiteVersion, discontinuous).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doTransferShip = function(shipAddress, ethAddress, reset, cb) {
  validateShip(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, cb, transact);
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.transferShip(shipAddress, ethAddress, reset).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doSetTransferProxy = function(shipAddress, ethAddress, cb) {
  validateShip(shipAddress, cb, function() {
    validateAddress(ethAddress, cb, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, cb, transact);
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.setTransferProxy(shipAddress, ethAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doEscape = function(shipAddress, sponsorAddress, cb) {
  validateChild(shipAddress, cb, function() {
    validateParent(sponsorAddress, cb, function() {
      if (offline) return transact();
      checkOwnership(shipAddress, cb, function() {
        checkHasBeenBooted(sponsorAddress, cb, function() {
          checkCanEscapeTo(shipAddress, sponsorAddress, cb, transact);
        });
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.escape(shipAddress, sponsorAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doAdopt = function(sponsorAddress, escapeeAddress, cb) {
  validateParent(sponsorAddress, cb, function() {
    validateChild(escapeeAddress, cb, function () {
      if (offline) return transact();
      checkOwnership(escapeeAddress, cb, function() {
        checkEscape(escapeeAddress, sponsorAddress, cb, transact);
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.adopt(sponsorAddress, escapeeAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doReject = function(sponsorAddress, escapeeAddress, cb) {
  validateParent(sponsorAddress, cb, function() {
    validateChild(escapeeAddress, cb, function () {
      if (offline) return transact();
      checkOwnership(escapeeAddress, cb, function() {
        checkEscape(escapeeAddress, sponsorAddress, cb, transact);
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.reject(sponsorAddress, escapeeAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doApprove = function(ethAddress, shipAddress, cb) {
  validateAddress(ethAddress, cb, function () {
    validateShip(shipAddress, cb, function () {
      if (offline) return transact();
      checkOwnership(shipAddress, cb, transact);
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.approve(ethAddress, shipAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doSafeTransferFrom = function(fromEthAddress, toEthAddress, shipAddress, cb) {
  validateAddress(fromEthAddress, cb, function () {
    validateAddress(toEthAddress, cb, function () {
      validateShip(shipAddress, cb, function () {
        if (offline) return transact();
        // TODO: add check to validate that the caller has been approved to initiate transfer
        transact();
      });
    });
  });
  function transact() {
    signTransaction(contracts['constitution'].methods.safeTransferFrom(fromEthAddress, toEthAddress, shipAddress).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doCastConstitutionVote = function(galaxy, prop, vote, cb) {
  validateGalaxy(galaxy, cb, function() {
    validateAddress(prop, cb, function() {
      if (offline) return transact();
      checkOwnership(galaxy, cb, function() {
        checkIsUnlocked(galaxy, cb, function() {
          getHasVotedOnConstitutionPoll(galaxy, prop, checkVote);
        });
      });
    });
  });
  function checkVote(err, res) {
    if (!err) {
      if (!res) return transact();
      else { cb({ error: { msg: "Vote already registered." }, data: '' }); }
    } else { cb({ error: { msg: "Error retrieving vote status." }, data: '' }); }
  }
  function transact() {
    signTransaction(contracts['constitution'].methods.castConstitutionVote(galaxy, prop, vote).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var doCastDocumentVote = function(galaxy, prop, vote, cb) {
  validateGalaxy(galaxy, function() {
    validateBytes32(prop, function() {
      if (offline) return transact();
      checkOwnership(galaxy, function() {
        checkIsUnlocked(galaxy, cb, function() {
          getDocumentHasAchievedMajority(prop, checkMajority);
        });
      });
    });
  });
  function checkMajority(err, res) {
    if (!err) {
      if (!res) return getHasVotedOnDocumentPoll(galaxy, prop, checkVote);
      else { cb({ error: { msg: "Document already has majority." }, data: '' }); }
    } else { cb({ error: { msg: "Error retrieving document majority status." }, data: '' }); }
  }
  function checkVote(err, res) {
    if (!err) {
      if (!res) return transact();
      else { cb({ error: { msg: "Vote already registered." }, data: '' }); }
    } else { cb({ error: { msg: "Error retrieving vote status." }, data: '' }); }
  }
  function transact() {
    signTransaction(contracts['constitution'].methods.castDocumentVote(galaxy, prop, vote).encodeABI(),
                    contractDetails.constitution['address'],
                    cb);
  }
};

var signTransaction = function(encodedABI, contractAddress, cb) {
  if (!offline) {
    var tx = {
        from: web3.eth.defaultAccount,
        to: contractAddress,
        value: 0x0,
        data: encodedABI,
      }; 
    web3.eth.estimateGas(tx)
    .then((gas) => {
      tx['gas'] = Math.round(gas * 1.8);
      web3.eth.accounts.signTransaction(tx, '0x' + privateKey)
      .then((signed) => {
        cb({ error: false, signedTx: signed.rawTransaction, rawTx: tx });
      }).catch((err) => { cb({ error: { msg: "Sign transaction error" }, data: err }) });
    }).catch((err) => { cb({ error: { msg: "Estimate gas error" }, data: err }) });
  }
};

var sendTransaction = function(signedTx, cb) {
  var tx = web3.eth.sendSignedTransaction(signedTx);
  tx.on('transactionHash', hash => {
    cb({ error: false, txHash: hash });
  });
  tx.on('error', cb({ error: { msg: console.error }, data: '' }));
};

var generateTxOffline = function(cb) {
  if (!validateEtherAddress(tx.to)) {
    cb(validator.errorMsgs[5]);
    return;
  }
  var txData = // uiFuncs.getTxData();
  txData.isOffline = true;
  txData.nonce = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(nonceDec));
  txData.gasPrice = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(gasPriceDec));
  if (tokenTx.id != 'ether') {
    txData.data = // $scope.tokenObjs[tokenTx.id].getData(tx.to, tx.value).data;
    txData.to = // $scope.tokenObjs[tokenTx.id].getContractAddress();
    txData.value = '0x00';
  }
  uiFuncs.generateTx(txData, function(rawTx) {
    if (!rawTx.isError) {
      cb({ error: false, rawTx: rawTx.rawTx, signedTx: rawTx.signedTx, showRaw: true})
    } else {
      cb({ error: { msg: rawTx.error }, data: '' });
    }
  });
};

module.exports = {
  offline: offline,
  setServerUrl: setServerUrl,
  setPoolAddress: setPoolAddress,
  setPrivateKey: setPrivateKey,
  setDefaultAccountWithPathAndIndex: setDefaultAccountWithPathAndIndex,
  minShipAddress: minShipAddress,
  maxGalaxyAddress: maxGalaxyAddress,
  minStarAddress: minStarAddress,
  maxStarAddress: maxStarAddress,
  maxStarAddress: maxStarAddress,
  contractDetails: contractDetails,
  valGalaxy: valGalaxy,
  valStar: valStar,
  valShip: valShip,
  valAddress: valAddress,
  formatShipName: formatShipName,
  toAddress: toAddress,
  toShipName: toShipName,
  getSpawnCandidate: getSpawnCandidate,
  readShipData: readShipData,
  readTransferringFor: readTransferringFor,
  readHasOwner: readHasOwner,
  readIsOwner: readIsOwner,
  readPoolAssets: readPoolAssets,
  readBalance: readBalance,
  readSponsor: readSponsor,
  readOwnedShips: readOwnedShips,
  readOwnedShipsStatus: readOwnedShipsStatus,
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
  sendTransaction: sendTransaction
};