'use strict';

var bip39 = require('bip39');
var hdkey = require('hdkey');
var expect = require('chai').expect;
var constitution = require('../index');

var ethAddress;
var signedTx = '';

describe('#formatShipName', function() {
  var emptyShipName = '';
  var oneCharacterShipName = 'z';
  var twoCharacterShipName = 'ab';
  var threeCharacterShipNameWithTilde = '~cd';
  var threeCharacterShipNameWithoutTilde = 'efg';

  it('return an empty ship name unchanged', function() {
    var result = constitution.formatShipName(emptyShipName);
    expect(result).to.equal(emptyShipName);
  });

  it('return a ship name of less than two characters unchanged', function() {
    var result = constitution.formatShipName(oneCharacterShipName);
    expect(result).to.equal(oneCharacterShipName);
  });

  it('append a tilde to a ship name with two characters when the first is not a tilde', function() {
    var result = constitution.formatShipName(twoCharacterShipName);
    expect(result).to.equal('~' + twoCharacterShipName);
  });

  it('return a ship name with three characters unchanged when the first is a tilde', function() {
    var result = constitution.formatShipName(threeCharacterShipNameWithTilde);
    expect(result).to.equal(threeCharacterShipNameWithTilde);
  });

  it('append a tilde to a ship name with three characters when the first is not a tilde', function() {
    var result = constitution.formatShipName(threeCharacterShipNameWithoutTilde);
    expect(result).to.equal('~' + threeCharacterShipNameWithoutTilde);
  });
});

describe('#toShipName', function() {
  var validGalaxyAddress = 118;
  var validStarAddress = 4788;
  var validPlanetAddress = 20054784;

  it('get galaxy name from valid galaxy address', function() {
    var result = constitution.toShipName(validGalaxyAddress);
    expect(result).to.equal('tex');
  });

  it('get star name from valid star address', function() {
    var result = constitution.toShipName(validStarAddress);
    expect(result).to.equal('doplur');
  });

  it('get planet name from valid planet address', function() {
    var result = constitution.toShipName(validPlanetAddress);
    expect(result).to.equal('mirfet-hocbyt');
  });
});

describe('#create a galaxy and retrieve owned ships', function() {

  var galaxyAddress;
  var shipArr;
  var serverURL = 'http://localhost:8545';
  var path = "m/44'/60'/0'/0";

  it('configure web3', function(done) {
    constitution.setServerUrl(serverURL);
    var mnemonic = 'benefit crew supreme gesture quantum web media hazard theory mercy wing kitten';
    var masterKeys = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    console.log()
    constitution.setPrivateKey(masterKeys, path, 0, function(res) {
      if (!res.error) {
        if (res.data === '0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d') {
          ethAddress = res.data;
          done();
        }
      }
    });
  });

  it('retrieve owned ships', function(done) {
    function randomIntWithInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    constitution.readOwnedShipsStatus(ethAddress, function(res) {
      if (!res.error) {
        shipArr = Object.keys(res.data);
        var makeRandomGalaxyAddress = function() {
          galaxyAddress = randomIntWithInterval(2,255);
          if (shipArr.indexOf(galaxyAddress) > -1) {
            makeRandomGalaxyAddress();
          } else { done(); }
        }
        makeRandomGalaxyAddress();
      }
    });
  });

  it('create a signed tx that creates a galaxy', function(done) {
    constitution.doCreateGalaxy(galaxyAddress, ethAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify new galaxy exists', function(done) {
    constitution.readOwnedShipsStatus(ethAddress, function(res) {
      if (!res.error) {
        var keyArr = Object.keys(res.data);
        var idx = keyArr.indexOf(galaxyAddress.toString());
        if (idx > -1) { done(); }
      }
    });
  });
});

describe('#Spawn two stars, set transfer proxy to the pool, deposit, read balance, withdraw', function() {

  var poolAddress = constitution.contractDetails.pool['address'];
  var sparksBalance = 0;
  var poolAssets = 0;
  var starAddress;

  it('read the starting balance of Sparks held by the wallet', function(done) {
    constitution.readBalance(ethAddress, function(res) {
      if (!res.error) {
        sparksBalance = res.data;
        done();
      }
    });
  });

  it('read the starting pool assets', function(done) {
    constitution.readPoolAssets(function(res) {
      if (!res.error) {
        poolAssets = res.data.length;
        done();
      }
    });
  });

  var tests = [
    { arg: constitution.getSpawnCandidate(0) },
    { arg: constitution.getSpawnCandidate(0) }
  ];

  tests.forEach(function(test) {

    it('spawn the star', function(done) {
      starAddress = test.arg;
      constitution.doSpawn(starAddress, ethAddress, function(res) {
        if (!res.error) {
          signedTx = res.signedTx;
          done();
        }
      });
    });

    it('send the signed tx', function(done) {
      constitution.sendTransaction(signedTx, function(res) {
        if (!res.error) {
          var signedTx = '';
          done();
        }
      });
    });

    it('retrieve owned ships to verify new star', function(done) {
      constitution.readOwnedShipsStatus(ethAddress, function(res) {
        if (!res.error) {
          var keyArr = Object.keys(res.data);
          var idx = keyArr.indexOf(starAddress.toString());
          if (idx > -1) { done(); } 
        }
      });
    });

    it('set the pool contract as the transfer proxy for the new star', function(done) {
      constitution.doSetTransferProxy(starAddress, poolAddress, function(res) {
        if (!res.error) {
          signedTx = res.signedTx;
          done();
        }
      });
    });

    it('send the signed tx', function(done) {
      constitution.sendTransaction(signedTx, function(res) {
        if (!res.error) {
          var signedTx = '';
          done();
        }
      });
    });

    it('deposit the star', function(done) {
      constitution.doDeposit(starAddress, poolAddress, function(res) {
        if (!res.error) {
          signedTx = res.signedTx;
          done();
        }
      });
    });

    it('send the signed tx', function(done) {
      constitution.sendTransaction(signedTx, function(res) {
        if (!res.error) {
          var signedTx = '';
          done();
        }
      });
    });

    it('retrieve owned ships to verify star has been deposited', function(done) {
      constitution.readOwnedShipsStatus(ethAddress, function(res) {
        if (!res.error) {
          var keyArr = Object.keys(res.data);
          var idx = keyArr.indexOf(starAddress.toString());
          if (idx === -1) { done(); }
        }
      });
    });

    it('verify the new balance of Sparks held by the wallet is 1 more than above', function(done) {
      constitution.readBalance(ethAddress, function(res) {
        if (!res.error) {
          if (res.data === sparksBalance + 1 || res.data === sparksBalance + 2) { done(); } 
        }
      });
    });
  });

  it('verify pool assets are 2 more than above', function(done) {
    constitution.readPoolAssets(function(res) {
      if (!res.error) {
        if (res.data.length === poolAssets + 2) { done(); }
      }
    });
  });

  it('withdraw the star from the pool', function(done) {
    constitution.doWithdraw(starAddress, poolAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify star is back', function(done) {
    constitution.readOwnedShipsStatus(ethAddress, function(res) {
      if (!res.error) {
        var keyArr = Object.keys(res.data);
        var idx = keyArr.indexOf(starAddress.toString());
        if (idx > -1) { done(); }
      }
    });
  });
});

describe('#Spawn a star, configure keys, spawn two planets from it', function() {

  var starAddress;
  var planetAddress;

  it('spawn a star', function(done) {
    starAddress = constitution.getSpawnCandidate(0);
    constitution.doSpawn(starAddress, ethAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('configure star\'s keys', function(done) {
    constitution.doConfigureKeys(starAddress, 123, 456, 1, false, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  var planetTests = [
    { },
    { }
  ];

  planetTests.forEach(function(planetData) {

    it('spawn a planet', function(done) {
      planetAddress = constitution.getSpawnCandidate(starAddress);
      constitution.doSpawn(planetAddress, ethAddress, function(res) {
        if (!res.error) {
          signedTx = res.signedTx;
          done();
        }
      });
    });

    it('send the signed tx', function(done) {
      constitution.sendTransaction(signedTx, function(res) {
        if (!res.error) {
          var signedTx = '';
          done();
        }
      });
    });
  });
});

describe('#spawn star, approve transfer to other account, switch account, complete safe transfer', function() {

  var otherAccount = "0xD53208cf45fC9bd7938B200BFf8814A26146688f";
  var starAddress;
  var path = "m/44'/60'/0'/0";

  it('spawn a star', function(done) {
    starAddress = constitution.getSpawnCandidate(0);
    constitution.doSpawn(starAddress, ethAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('approve transfer', function(done) {
    constitution.doApprove(otherAccount, starAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve pending transfers', function(done) {
    constitution.readTransferringFor(otherAccount, function(res) {
      if (!res.error) {
        done();
      }
    });
  });

  it('switch account', function(done) {
    constitution.setDefaultAccount(path, 1, function(res) {
      if (!res.error) {
        if (res.data === otherAccount) {
          done();
        }
      }
    });
  });

  it('do transfer', function(done) {
    constitution.doSafeTransferFrom(ethAddress, otherAccount, starAddress, function(res) {
      if (!res.error) {
        signedTx = res.signedTx;
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    constitution.sendTransaction(signedTx, function(res) {
      if (!res.error) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify transferred star exists in list', function(done) {
    constitution.readOwnedShipsStatus(otherAccount, function(res) {
      if (!res.error) {
        var keyArr = Object.keys(res.data);
        var idx = keyArr.indexOf(starAddress.toString());
        if (idx > -1) { done(); } 
      }
    });
  });
});

describe('#set offline true, retrieve a signed transaction that creates a galaxy', function() {

  var galaxyAddress = 118;  // will fail if galaxy creation test above randomly chose 118
  var ethAddress = '0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d';
  var offlineData = {
      gas: 232180,
      gasPrice: 20000000000,
      nonce: 45,
    }

  it('create a signed tx that creates a galaxy', function(done) {
    constitution.setOffline(true);
    constitution.doCreateGalaxy(galaxyAddress, ethAddress, function(res) {
      if (!res.error) {
        done();
      }
    }, offlineData);
  });
});
