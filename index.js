'use strict';

const abis         = require('./resources/abis.json');
const check        = require('./check');
const constitution = require('./constitution');
const polls        = require('./polls');
const pool         = require('./pool');
const ships        = require('./ships');
const txn          = require('./txn');
const utils        = require('./utils');

// account

function getKeyPair(hd, path, index) {
  let derived = hd.derive(path + '/' + index);
  let sk      = derived.privateKey;
  let address = utils.privateToAddress(sk);
  return {
    address: address,
    privateKey: sk
  };
}

// contracts

function initContracts(web3, addresses) {
  return {
    constitution: newConstitution(web3, addresses.constitution),
    ships: newShips(web3, addresses.ships),
    polls: newPolls(web3, addresses.polls),
    pool: newPool(web3, addresses.pool),
  };
}

function newConstitution(web3, address) {
  return new web3.eth.Contract(abis.constitution, address);
}

function newShips(web3, address) {
  return new web3.eth.Contract(abis.ships, address);
}

function newPolls(web3, address) {
  return new web3.eth.Contract(abis.polls, address);
}

function newPool(web3, address) {
  return new web3.eth.Contract(abis.pool, address);
}

module.exports = {
  check,
  constitution,
  polls,
  pool,
  ships,
  txn,
  utils,
  initContracts,
  getKeyPair
}

