/**
 * constitution-js
 * @module index
 */

'use strict';

const accounts = require('./accounts');
const check = require('./check');
const conditionalSR = require('./conditionalSR');
const constitution = require('./constitution');
const contracts = require('./contracts');
const linearSR = require('./linearSR');
const polls = require('./polls');
const pool = require('./pool');
const ships = require('./ships');
const txn = require('./txn');
const utils = require('./utils');

const initContracts = contracts.initContracts;

const getKeyPair = accounts.getKeyPair;

module.exports = {
  check,
  conditionalSR,
  constitution,
  linearSR,
  polls,
  pool,
  ships,
  txn,
  utils,
  initContracts,
  getKeyPair
}
