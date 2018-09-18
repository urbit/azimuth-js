/**
 * Constitution API
 * @module constitution
 */

const internal = require('./internal/constitution');

/**
 * Get constitution contract owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise => String} The owner address.
 */
module.exports.owner = internal.owner;

/**
 * Get the amount of ships owned by an address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Owner's address.
 * @return {Promise => Number} Number of ships.
 */
module.exports.balanceOf = internal.balanceOf;

/**
 * Get the current owner of a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @return {Promise => String} Owner's address.
 */
module.exports.ownerOf = internal.ownerOf;

/**
 * Check if a ship is active.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @return {Promise => Bool} true if ship is active, false otherwise.
 */
module.exports.exists = internal.exists;

/**
 * Get the transfer proxy for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} tokenId - Ship token.
 * @return {Promise => String} The transfer proxy's address.
 */
module.exports.getApproved = internal.getApproved;

/**
 * Check if an address is an operator for an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} owner - The owner's address.
 * @param {String} operator - The operator's address.
 * @return {Promise => Bool} true if 'operator' is an operator for 'owner'.
 */
module.exports.isApprovedForAll = internal.isApprovedForAll;

/**
 * Return the total number of children a ship is allowed to spawn at some time.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {Number} time - Time (uint256).
 * @return {Promise => Number} The spawn limit.
 */
module.exports.getSpawnLimit = internal.getSpawnLimit;

/**
 * Check if a ship can escape to a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {Number} sponsor - Sponsor's ship token.
 * @return {Promise => Bool} True if ship can escape, false otherwise.
 */
module.exports.canEscapeTo = internal.canEscapeTo;

/**
 * Safely transfer a ship between addresses (call recipient if it's a contract).
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - Sender's address.
 * @param {String} to - Receiver's address.
 * @param {Number} tokenId - Ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.safeTransferFrom = internal.safeTransferFrom;

/**
 * Transfer a ship between addresses (without notifying recipient contract).
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - Sender's address.
 * @param {String} to - Receiver's address.
 * @param {Number} tokenId - Ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferFrom = internal.transferFrom;

/**
 * Allow an address to transfer ownership of a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} approved - The approved address.
 * @param {Number} tokenId - Ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.approve = internal.approve;

/**
 * Allow or disallow an operator to transfer ownership of alL ships owner by
 * the message sender.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Address} operator - The operator's address.
 * @param {Bool} approved - Whether the operator is approved or not.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setApprovalForAll = internal.setApprovalForAll;

/**
 * Configure the management address for all ships owned by the message sender.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} manager - The management address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setManager = internal.setManager;

/**
 * Configure a ship with Urbit public keys, incrementing the ship's continuity
 * number if needed.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} encryptionKey - The encryption key.
 * @param {String} authenticationKey - The auth key.
 * @param {Number} cryptoSuiteVersion - The crypto suite version.
 * @param {Bool} discontinuous - True to increment the continuity number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.configureKeys = internal.configureKeys;


/**
 * Spawn a ship, giving ownership of it to the target address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - A ship token.
 * @param {String} target - The target address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.spawn = internal.spawn;

/**
 * Give an address the right to spawn ships with the given prefix.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} prefix - A (prefix) ship token.
 * @param {String} address - The address to designate as a spawn proxy.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setSpawnProxy = internal.setSpawnProxy;

/**
 * Transfer a ship to a target address, optionally clearing all permissions
 * data and keys.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Ship token.
 * @param {String} address - The target address.
 * @param {Bool} reset - True to reset ship's keys.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferShip = internal.transferShip;

/**
 * Give an address the right to transfer the given ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} prefix - Ship token.
 * @param {String} address - The address to designate as a transfer proxy.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setTransferProxy = internal.setTransferProxy;

/**
 * Request escape from 'ship' to 'sponsor'.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Escapee's ship token.
 * @param {Number} sponsor - Sponsor's ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.escape = internal.escape;

/**
 * Cancel the currently set escape for a ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} ship - Escapee's ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.cancelEscape = internal.cancelEscape;

/**
 * As the sponsor, accept the escapee.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {Number} escapee - Escapee's ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.adopt = internal.adopt;

/**
 * As the sponsor, reject the escapee's escape request.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {Number} escapee - Escapee's ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.reject = internal.reject;

/**
 * As the sponsor, stop sponsoring the ship.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} sponsor - Sponsor's ship token.
 * @param {Number} ship - Ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.detach = internal.detach;

/**
 * Configure the delegate address for all ships owned by the message sender.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} delegate - The delegate's address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setDelegate = internal.setDelegate;

/**
 * As a galaxy, start a poll for the constitution upgrade proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {Object} proposal - The constitution upgrade proposal.
 * @return {Object} An unsigned transaction object.
 */
module.exports.startConstitutionPoll = internal.startConstitutionPoll;

/**
 * As a galaxy, start a poll for a proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal document.
 * @return {Object} An unsigned transaction object.
 */
module.exports.startDocumentPoll = internal.startDocumentPoll;

/**
 * As a galaxy, cast a vote on the constitution upgrade proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {Object} proposal - The upgrade proposal.
 * @param {Bool} vote - True if yes, false otherwise.
 * @return {Object} An unsigned transaction object.
 */
module.exports.castConstitutionVote = internal.castConstitutionVote;

/**
 * As a galaxy, cast a vote on the proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} proposal - The proposal document.
 * @param {Bool} vote - True if yes, false otherwise.
 * @return {Object} An unsigned transaction object.
 */
module.exports.castDocumentVote = internal.castDocumentVote;

/**
 * Check whether the proposal has achieved majority, upgrading to it if so.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Object} proposal - The upgrade proposal.
 * @return {Object} An unsigned transaction object.
 */
module.exports.updateConstitutionPoll = internal.updateConstitutionPoll;

/**
 * Check whether the proposal has achieved majority.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Object} proposal - The proposal document.
 * @return {Object} An unsigned transaction object.
 */
module.exports.updateDocumentPoll = internal.updateDocumentPoll;

/**
 * Grant the target address ownership of the galaxy and register it for voting.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) ship token.
 * @param {String} target - The target address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.createGalaxy = internal.createGalaxy;

/**
 * Set primary, secondary, adn tertiary DNS domains for the constitution.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} primary - Primary DNS address.
 * @param {String} secondary - Secondary DNS address.
 * @param {String} tertiary - Tertiary DNS address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setDnsDomains = internal.setDnsDomains;

