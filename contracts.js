/**
 * Contracts API
 * @module contracts
 */

const eclipticAbi =
  require('urbit-azimuth/build/contracts/Ecliptic.json').abi;

const shipsAbi =
  require('urbit-azimuth/build/contracts/Ships.json').abi;

const pollsAbi =
  require('urbit-azimuth/build/contracts/Polls.json').abi;

/**
 * Create a collection of Urbit contracts, given a web3 instance and their
 * provided addresses.
 * @param {Object} web3 - A web3 instance.
 * @param {Object} addresses - An addresses object.  Must provide addresses for
 *   ecliptic, ships, and polls contracts, at those respective key names.
 * @return {Object} The initialised contracts.
 */
const initContracts = (web3, addresses) => ({
  ecliptic: newEcliptic(web3, addresses.ecliptic),
  ships: newShips(web3, addresses.ships),
  polls: newPolls(web3, addresses.polls),
});

/**
 * Initialise as many Urbit contracts as possible, given a ships contract
 * address.
 * @param {Object} web3 - A web3 instance.
 * @param {String} shipsAddress - An address to a ships contract.
 * @return {Object} The initialised contracts.
 */
const initContractsPartial = async (web3, shipsAddress) => {
  let ships = newShips(web3, shipsAddress);
  let eclipticAddress = await ships.methods.owner().call();
  let ecliptic = newEcliptic(web3, eclipticAddress);
  let pollsAddress = await ecliptic.methods.polls().call();
  let polls = newPolls(web3, pollsAddress);
  return {
    ecliptic: ecliptic,
    ships: ships,
    polls: polls
  };
}

const newEcliptic = (web3, address) =>
  new web3.eth.Contract(eclipticAbi, address);

const newShips = (web3, address) =>
  new web3.eth.Contract(shipsAbi, address);

const newPolls = (web3, address) =>
  new web3.eth.Contract(pollsAbi, address);

module.exports = {
  initContracts,
  initContractsPartial,
  eclipticAbi,
  shipsAbi,
  pollsAbi
}
