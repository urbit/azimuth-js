/**
 * Contracts API
 * @module contracts
 */

const abis = require('./resources/abis.json');

/**
 * Create a collection of Urbit contracts, given a web3 instance and their
 * provided addresses.
 * @param {Object} web3 - A web3 instance.
 * @param {Object} addresses - An addresses object.  Must provide addresses for
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

/**
 * Initialise as many Urbit contracts as possible, given a ships contract
 *   address (note that this does not initialise a pool contract).
 * @param {Object} web3 - A web3 instance.
 * @param {String} shipsAddress - An address to a ships contract.
 * @return {Object} The initialised contracts.
 */
const initContractsPartial = async (web3, shipsAddress) => {
  let ships = newShips(web3, shipsAddress);
  let constitutionAddress = await ships.methods.owner().call();
  let constitution = newConstitution(web3, constitutionAddress);
  let pollsAddress = await constitution.methods.polls().call();
  let polls = newPolls(web3, pollsAddress);
  return {
    constitution: constitution,
    ships: ships,
    polls: polls
  };
}

const newConstitution = (web3, address) =>
  new web3.eth.Contract(abis.constitution, address);

const newShips = (web3, address) =>
  new web3.eth.Contract(abis.ships, address);

const newPolls = (web3, address) =>
  new web3.eth.Contract(abis.polls, address);

const newPool = (web3, address) =>
  new web3.eth.Contract(abis.pool, address);

module.exports = {
  initContracts,
  initContractsPartial
}
