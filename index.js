/**
 * constitution-js
 * @module index
 */

'use strict';

const accounts = require('./accounts');
const check = require('./check');
const conditionalSR = require('./conditionalSR');
const ecliptic = require('./ecliptic');
const contracts = require('./contracts');
const linearSR = require('./linearSR');
const polls = require('./polls');
const azimuth = require('./azimuth');
const delegatedSending = require('./delegatedSending');
const txn = require('./txn');
const utils = require('./utils');
const chainDetails = require('./resources/chainDetails.json');

const initContracts = contracts.initContracts;
const initContractsPartial = contracts.initContractsPartial;

const getKeyPair = accounts.getKeyPair;

module.exports = {
  check,
  conditionalSR,
  ecliptic,
  linearSR,
  polls,
  azimuth,
  delegatedSending,
  txn,
  utils,
  initContracts,
  initContractsPartial,
  getKeyPair,
  chainDetails
}
