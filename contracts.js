/**
 * Contracts API
 * @module contracts
 */

const abis = require('./resources/abis.json');

/**
 * Create a collection of Urbit contracts, given a web3 instance and their
 * provided addresses.
 * @param {Object} web3 - A web3 instance.
 * @param {Object} ship - An addresses object.  Must provide addresses for
 *   constitution, ships, polls, and pool contracts, at those respective key
 *   names.
 * @return {Object} The initialised contracts.
 */
const initContracts = (web3, addresses) => ({
  constitution: newConstitution(web3, addresses.constitution),
  ships: newShips(web3, addresses.ships),
  polls: newPolls(web3, addresses.polls),
  pool: newPool(web3, addresses.pool)
});

const newConstitution = (web3, address) =>
  new web3.eth.Contract(abis.constitution, address);

const newShips = (web3, address) =>
  new web3.eth.Contract(abis.ships, address);

const newPolls = (web3, address) =>
  new web3.eth.Contract(abis.polls, address);

const newPool = (web3, address) =>
  new web3.eth.Contract(abis.pool, address);

module.exports = {
  initContracts
}
