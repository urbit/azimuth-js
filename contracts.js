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

const claimsAbi =
  require('azimuth-solidity/build/contracts/Claims.json').abi;

const linearStarReleaseAbi =
  require('azimuth-solidity/build/contracts/LinearStarRelease.json').abi;

const delegatedSendingAbi =
  require('azimuth-solidity/build/contracts/DelegatedSending.json').abi;

const conditionalStarReleaseAbi =
  require('azimuth-solidity/build/contracts/ConditionalStarRelease.json').abi;

/**
* Create a collection of Urbit contracts, given a web3 instance and their
* provided addresses.
* @param {Object} web3 - A web3 instance.
* @param {Object} addresses - An addresses object.  Must provide addresses for
*   ecliptic, azimuth, and polls contracts, at those respective key names.
* @return {Object} The initialised contracts.
*/
const initContracts = (web3, addresses) => {
  let contracts = {};
  contracts = newEcliptic(contracts, web3, addresses.ecliptic);
  contracts = newAzimuth(contracts, web3, addresses.azimuth);
  contracts = newPolls(contracts, web3, addresses.polls);
  contracts = newClaims(contracts, web3, addresses.claims);
  contracts = newLinearStarRelease(contracts, web3, addresses.linearSR);
  contracts = newConditionalStarRelease(contracts, web3, addresses.conditionalSR);
  contracts = newDelegatedSending(contracts, web3, addresses.delegatedSending);
  return contracts;
};

/**
 * Initialise as many Urbit contracts as possible, given a azimuth contract
 * address.
 * @param {Object} web3 - A web3 instance.
 * @param {String} azimuthAddress - An address to a azimuth contract.
 * @return {Object} The initialised contracts.
 */
const initContractsPartial = async (web3, azimuthAddress) => {
  let contracts = {};
  contracts = newAzimuth(contracts, web3, azimuthAddress);
  let eclipticAddress = await contracts.azimuth.methods.owner().call();
  contracts = newEcliptic(contracts, web3, eclipticAddress);
  let pollsAddress = await contracts.ecliptic.methods.polls().call();
  contracts = newPolls(contracts, web3, pollsAddress);
  let claimsAddress = await contracts.ecliptic.methods.claims().call();
  contracts = newClaims(contracts, web3, claimsAddress);
  return contracts;
}

const newContract = (web3, address, abi) => {
  let contract = new web3.eth.Contract(abi, address);
  //NOTE this allows us to support a broader range of web3 versions.
  //     see also #23.
  contract._address = (contract._address || contract.address);
  contract.address = contract._address;
  return contract;
}

const newEcliptic = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.ecliptic = newContract(web3, address, eclipticAbi);
 return contracts;
}

const newAzimuth = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.azimuth = newContract(web3, address, azimuthAbi);
 return contracts;
}

const newPolls = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.polls = newContract(web3, address, pollsAbi);
 return contracts;
}

const newClaims = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.claims = newContract(web3, address, claimsAbi);
 return contracts;
}

const newLinearStarRelease = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.linearSR = newContract(web3, address, linearStarReleaseAbi);
 return contracts;
}

const newConditionalStarRelease = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.conditionalSR = newContract(web3, address, conditionalStarReleaseAbi);
 return contracts;
}

const newDelegatedSending = (contracts, web3, address) => {
 contracts = contracts || {};
 contracts.delegatedSending = newContract(web3, address, delegatedSendingAbi);
 return contracts;
}

module.exports = {
  initContracts,
  initContractsPartial,
  //
  newEcliptic,
  newAzimuth,
  newPolls,
  newClaims,
  newLinearStarRelease,
  newDelegatedSending,
  newConditionalStarRelease
}
