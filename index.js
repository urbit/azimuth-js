'use strict';

const accounts = require('./accounts');
const check = require('./check');
const constitution = require('./constitution');
const contracts = require('./contracts');
const polls = require('./polls');
const pool = require('./pool');
const ships = require('./ships');
const txn = require('./txn');
const utils = require('./utils');

// account

const initContracts = contracts.initContracts;

const getKeyPair = accounts.getKeyPair;

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

