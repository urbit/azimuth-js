'use strict';

var expect = require('chai').expect;
var urbitConCli = require('../index');
var wallet = require('./testWallet');
var ajaxReq = require('./testAjaxReq');

var randomIntWithInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// describe('#validateShip', function() {
//   var testFunc = function() {};

//   var validGalaxyNumber = randomIntWithInterval(0, Math.pow(2, 8) - 1);
//   var validStarNumber = randomIntWithInterval(Math.pow(2, 8), Math.pow(2, 16) - 1);
//   var validPlanetNumber = randomIntWithInterval(Math.pow(2, 16), Math.pow(2, 32) - 1);
//   var invalidShipNumberLow = -12;
//   var invalidShipNumberHigh = randomIntWithInterval(Math.pow(2, 32), Number.MAX_SAFE_INTEGER);

//   it('validate a ship with galaxy value', function() {
//     var result = urbitConCli.validateShip(validGalaxyNumber, testFunc);
//     expect(result).to.equal(testFunc());
//   });

//   it('validate a ship with star value', function() {
//     var result = urbitConCli.validateShip(validStarNumber, testFunc);
//     expect(result).to.equal(testFunc());
//   });

//   it('validate a ship with planet value', function() {
//     var result = urbitConCli.validateShip(validPlanetNumber, testFunc);
//     expect(result).to.equal(testFunc());
//   });

//   it('reject a ship with a negative value', function() {
//     var result = urbitConCli.validateShip(invalidShipNumberLow, function() {});
//     expect(result).to.equal(false);
//   });

//   it('reject a ship with a number larger than 2^32', function() {
//     var result = urbitConCli.validateShip(invalidShipNumberHigh, function() {});
//     expect(result).to.equal(false);
//   });
// });

// describe('#validateAddress', function() {
//   var testFunc = function() {};

//   var validEthAddress = "0x6deffb0cafdb11d175f123f6891aa64f01c24f7d";
//   var shortEthAddress = "0x6deffb0cafdb11d175f";

//   it('validate a correct Ethereum address', function() {
//     var result = urbitConCli.validateAddress(validEthAddress, testFunc);
//     expect(result).to.equal(testFunc());
//   });

//   it('reject an address that\'s too short', function() {
//     var result = urbitConCli.validateAddress(shortEthAddress, function() {});
//     expect(result).to.equal(false);
//   });
// });

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

describe('#createGalaxy', function() {
  
  it('create galaxy', function() {
    urbitConCli.doCreateGalaxy(118, "0x6deffb0cafdb11d175f123f6891aa64f01c24f7d", wallet, ajaxReq, function(data) {
      if (!data.error) {
        urbitConCli.sendTx(data['signedTx'], ajaxReq, function(data) {
          if (!data.error) {
            var result = data.error;
            expect(result).to.equal(false);
          } else {
            console.log(data.error.msg);
          }
        });
      } else {
        console.log(data.error.msg);
      }
    });
  });
});