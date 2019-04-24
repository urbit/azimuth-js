/**
 * Contracts API
 * @module contracts
 */

const eclipticAbi =
  require('azimuth-solidity/build/contracts/Ecliptic.json').abi;

const azimuthAbi =
  require('azimuth-solidity/build/contracts/Azimuth.json').abi;

const pollsAbi =
  require('azimuth-solidity/build/contracts/Polls.json').abi;

const linearStarReleaseAbi =
  require('azimuth-solidity/build/contracts/LinearStarRelease.json').abi;

const delegatedSendingAbi =
  require('azimuth-solidity/build/contracts/DelegatedSending.json').abi;

/**
 * Create a collection of Urbit contracts, given a web3 instance and their
 * provided addresses.
 * @param {Object} web3 - A web3 instance.
 * @param {Object} addresses - An addresses object.  Must provide addresses for
 *   ecliptic, azimuth, and polls contracts, at those respective key names.
 * @return {Object} The initialised contracts.
 */
const initContracts = (web3, addresses) => ({
  ecliptic: newEcliptic(web3, addresses.ecliptic),
  azimuth: newAzimuth(web3, addresses.azimuth),
  polls: newPolls(web3, addresses.polls),
  linearSR: newLinearStarRelease(web3, addresses.linearSR),
  delegatedSending: newDelegatedSending(web3, addresses.delegatedSending)
});

/**
 * Initialise as many Urbit contracts as possible, given a azimuth contract
 * address.
 * @param {Object} web3 - A web3 instance.
 * @param {String} azimuthAddress - An address to a azimuth contract.
 * @return {Object} The initialised contracts.
 */
const initContractsPartial = async (web3, azimuthAddress) => {
  let azimuth = newAzimuth(web3, azimuthAddress);
  let eclipticAddress = await azimuth.methods.owner().call();
  let ecliptic = newEcliptic(web3, eclipticAddress);
  let pollsAddress = await ecliptic.methods.polls().call();
  let polls = newPolls(web3, pollsAddress);
  return {
    ecliptic: ecliptic,
    azimuth: azimuth,
    polls: polls
  };
}

const newContract = (web3, address, abi) => {
  let contract = new web3.eth.Contract(abi, address);
  //NOTE this allows us to support a broader range of web3 versions.
  //     see also #23.
  contract._address = (contract._address || contract.address);
  contract.address = contract._address;
  return contract;
}

const newEcliptic = (web3, address) =>
  newContract(web3, address, eclipticAbi);

const newAzimuth = (web3, address) =>
  newContract(web3, address, azimuthAbi);

const newPolls = (web3, address) =>
  newContract(web3, address, pollsAbi);

const newLinearStarRelease = (web3, address) =>
  newContract(web3, address, linearStarReleaseAbi);

const newDelegatedSending = (web3, address) =>
  newContract(web3, address, delegatedSendingAbi);

module.exports = {
  initContracts,
  initContractsPartial,
  eclipticAbi,
  azimuthAbi,
  pollsAbi,
  linearStarReleaseAbi,
  delegatedSendingAbi
}
