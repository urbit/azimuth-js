'use strict';

var expect = require('chai').expect;
var urbitConCli = require('../index');

var randomIntWithInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('#formatShipName', function() {
  var emptyShipName = '';
  var oneCharacterShipName = 'z';
  var twoCharacterShipName = 'ab';
  var threeCharacterShipNameWithTilde = '~cd';
  var threeCharacterShipNameWithoutTilde = 'efg';

  it('return an empty ship name unchanged', function() {
    var result = urbitConCli.formatShipName(emptyShipName);
    expect(result).to.equal(emptyShipName);
  });

  it('return a ship name of less than two characters unchanged', function() {
    var result = urbitConCli.formatShipName(oneCharacterShipName);
    expect(result).to.equal(oneCharacterShipName);
  });

  it('append a tilde to a ship name with two characters when the first is not a tilde', function() {
    var result = urbitConCli.formatShipName(twoCharacterShipName);
    expect(result).to.equal('~' + twoCharacterShipName);
  });

  it('return a ship name with three characters unchanged when the first is a tilde', function() {
    var result = urbitConCli.formatShipName(threeCharacterShipNameWithTilde);
    expect(result).to.equal(threeCharacterShipNameWithTilde);
  });

  it('append a tilde to a ship name with three characters when the first is not a tilde', function() {
    var result = urbitConCli.formatShipName(threeCharacterShipNameWithoutTilde);
    expect(result).to.equal('~' + threeCharacterShipNameWithoutTilde);
  });
});

describe('#toShipName', function() {
  var validGalaxyAddress = 118;
  var validStarAddress = 4788;
  var validPlanetAddress = 20054784;

  it('get galaxy name from valid galaxy address', function() {
    var result = urbitConCli.toShipName(validGalaxyAddress);
    expect(result).to.equal('tex');
  });

  it('get star name from valid star address', function() {
    var result = urbitConCli.toShipName(validStarAddress);
    expect(result).to.equal('doplur');
  });

  it('get planet name from valid planet address', function() {
    var result = urbitConCli.toShipName(validPlanetAddress);
    expect(result).to.equal('mirfet-hocbyt');
  });
});

describe('#create a galaxy and retrieve owned ships', function() {

  var galaxyAddress;
  var shipArr;
  var signedTx = '';
  var ethAddress = urbitConCli.wallet.getAddressString();

  it('retrieve owned ships', function(done) {
    urbitConCli.buildOwnedShips(ethAddress, function(data) {
      if (!data['error']) {
        shipArr = Object.keys(data)
        var makeRandomGalaxy = function() {
          galaxyAddress = randomIntWithInterval(2,255);
          if (shipArr.indexOf(galaxyAddress) > -1) {
            makeRandomGalaxy();
          } else { done(); }
        }
        makeRandomGalaxy();
      }
    });
  });

  it('create a signed tx that creates a galaxy', function(done) {
    urbitConCli.doCreateGalaxy(galaxyAddress, function(data) {
      if (!data['error']) {
        signedTx = data['signedTx'];
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    urbitConCli.sendTx(signedTx, function(data) {
      if (!data['error']) {
        done();
      }
    });
  });

  it('retrieve owned ships to verify new galaxy exists', function(done) {
    urbitConCli.buildOwnedShips(ethAddress, function(data) {
      if (!data['error']) {
        var keyArr = Object.keys(data)
        var idx = keyArr.indexOf(galaxyAddress.toString())
        if (idx > -1) { done(); }
      }
    });
  });
});

describe('#Spawn a star, set transfer proxy to the pool, deposit, read balance, withdraw', function() {

  var starAddress = urbitConCli.getSpawnCandidate(0);
  var starNameFormatted = urbitConCli.formatShipName(urbitConCli.toShipName(starAddress));
  urbitConCli.poolAddress = urbitConCli.contracts['pool'];
  var signedTx = '';
  var ethAddress = urbitConCli.wallet.getAddressString();
  var sparksBalance = 0;
  var poolAssets = 0;

  it('read the starting balance of Sparks held by the wallet', function(done) {
    urbitConCli.readBalance(urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        sparksBalance = data;
        done();
      }
    });
  });

  it('read the starting pool assets', function(done) {
    urbitConCli.readPoolAssets(urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        poolAssets = data.length;
        done();
      }
    });
  });

  it('spawn the star', function(done) {
    this.timeout(5000);
    urbitConCli.doSpawn(starAddress, function(data) {
      if (!data['error']) {
        signedTx = data['signedTx'];
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    urbitConCli.sendTx(signedTx, function(data) {
      if (!data['error']) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify new star', function(done) {
    urbitConCli.buildOwnedShips(ethAddress, function(data) {
      if (!data['error']) {
        var keyArr = Object.keys(data)
        var idx = keyArr.indexOf(starAddress.toString())
        if (idx > 0) { done(); }
      }
    });
  });

  it('set the pool contract as the transfer proxy for the new star', function(done) {
    urbitConCli.doSetTransferProxy(starAddress, urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        signedTx = data['signedTx'];
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    urbitConCli.sendTx(signedTx, function(data) {
      if (!data['error']) {
        var signedTx = '';
        done();
      }
    });
  });

  it('deposit the star', function(done) {
    urbitConCli.doDeposit(starAddress, urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        signedTx = data['signedTx'];
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    urbitConCli.sendTx(signedTx, function(data) {
      if (!data['error']) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify star has been deposited', function(done) {
    urbitConCli.buildOwnedShips(ethAddress, function(data) {
      if (!data['error']) {
        var keyArr = Object.keys(data)
        var idx = keyArr.indexOf(starAddress.toString())
        if (idx === -1) { done(); }
      }
    });
  });

  it('verify the new balance of Sparks held by the wallet is 1 more than above', function(done) {
    urbitConCli.readBalance(urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        if (sparksBalance + 1 === data) { done(); }
      }
    });
  });

  it('verify pool assets are 1 more than above', function(done) {
    urbitConCli.readPoolAssets(urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        if (poolAssets + 1 === data.length) { done(); }
      }
    });
  });

  it('withdraw the star from the pool', function(done) {
    urbitConCli.doWithdraw(starAddress, urbitConCli.poolAddress, function(data) {
      if (!data['error']) {
        signedTx = data['signedTx'];
        done();
      }
    });
  });

  it('send the signed tx', function(done) {
    urbitConCli.sendTx(signedTx, function(data) {
      if (!data['error']) {
        var signedTx = '';
        done();
      }
    });
  });

  it('retrieve owned ships to verify star is back', function(done) {
    urbitConCli.buildOwnedShips(ethAddress, function(data) {
      if (!data['error']) {
        var keyArr = Object.keys(data)
        var idx = keyArr.indexOf(starAddress.toString())
        if (idx > 0) { done(); }
      }
    });
  });
});