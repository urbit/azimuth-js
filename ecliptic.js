/**
 * Ecliptic API
 * @module ecliptic
 */

const internal = require('./internal/ecliptic');
const azimuth = require('./azimuth');

/**
 * Get ecliptic contract owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<String>} The owner address.
 */
module.exports.owner = internal.owner;

/**
 * Get the amount of points owned by an address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Owner's address.
 * @return {Promise<Number>} Number of azimuth.
 */
module.exports.balanceOf = internal.balanceOf;

/**
 * Get the current owner of a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @return {Promise<String>} Owner's address.
 */
module.exports.ownerOf = internal.ownerOf;

/**
 * Check if a point is active.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @return {Promise<Bool>} true if point is active, false otherwise.
 */
module.exports.exists = internal.exists;

/**
 * Get the transfer proxy for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @return {Promise<String>} The transfer proxy's address.
 */
module.exports.getApproved = internal.getApproved;

/**
 * Check if an address is an operator for an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} owner - The owner's address.
 * @param {String} operator - The operator's address.
 * @return {Promise<Bool>} true if 'operator' is an operator for 'owner'.
 */
module.exports.isApprovedForAll = internal.isApprovedForAll;

/**
 * Return the total number of children a point is allowed to spawn at some time.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {Number} time - Time (uint256).
 * @return {Promise<Number>} The spawn limit.
 */
module.exports.getSpawnLimit = internal.getSpawnLimit;

/**
 * Check if a point can escape to a sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {Number} sponsor - Sponsor's point number.
 * @return {Promise<Bool>} True if point can escape, false otherwise.
 */
module.exports.canEscapeTo = internal.canEscapeTo;

/**
 * Get the amount of children point can still spawn before hitting the limit.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Number>} The amount of children still spawnable from point.
 */
module.exports.getSpawnsRemaining = async function(contracts, point) {
  const count = azimuth.getSpawnCount(contracts, point);
  const now = Math.floor(new Date().getTime() / 1000);
  const limit = internal.getSpawnLimit(contracts, point, now);
  return ((await limit) - (await count));
}


/**
 * Safely transfer a point between addresses (call recipient if it's a contract).
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - Sender's address.
 * @param {String} to - Receiver's address.
 * @param {Number} pointId - Point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.safeTransferFrom = internal.safeTransferFrom;

/**
 * Transfer a point between addresses (without notifying recipient contract).
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - Sender's address.
 * @param {String} to - Receiver's address.
 * @param {Number} pointId - Point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferFrom = internal.transferFrom;

/**
 * Allow an address to transfer ownership of a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} approved - The approved address.
 * @param {Number} pointId - Point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.approve = internal.approve;

/**
 * Allow or disallow an operator to transfer ownership of all points owned by
 * the message sender.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Address} operator - The operator's address.
 * @param {Bool} approved - Whether the operator is approved or not.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setApprovalForAll = internal.setApprovalForAll;

/**
 * Configure the management address for a point owned by the message sender.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - The point to manage.
 * @param {String} manager - The management address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setManagementProxy = internal.setManagementProxy;

/**
 * Configure a point with Urbit public keys, incrementing the point's continuity
 * number if needed.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} encryptionKey - The encryption key.
 * @param {String} authenticationKey - The auth key.
 * @param {Number} cryptoSuiteVersion - The crypto suite version.
 * @param {Bool} discontinuous - True to increment the continuity number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.configureKeys = internal.configureKeys;


/**
 * Spawn a point, giving ownership of it to the target address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - A point number.
 * @param {String} target - The target address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.spawn = internal.spawn;

/**
 * Give an address the right to spawn points with the given prefix.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} prefix - A (prefix) point number.
 * @param {String} address - The address to designate as a spawn proxy.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setSpawnProxy = internal.setSpawnProxy;

/**
 * Transfer a point to a target address, optionally clearing all permissions
 * data and keys.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - The target address.
 * @param {Bool} reset - True to reset point's keys.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferPoint = internal.transferPoint;

/**
 * Give an address the right to transfer the given point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} prefix - Point number.
 * @param {String} address - The address to designate as a transfer proxy.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setTransferProxy = internal.setTransferProxy;

/**
 * Request escape from 'point' to 'sponsor'.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Escapee's point number.
 * @param {Number} sponsor - Sponsor's point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.escape = internal.escape;

/**
 * Cancel the currently set escape for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Escapee's point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.cancelEscape = internal.cancelEscape;

/**
 * As the sponsor, accept the escapee.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.adopt = internal.adopt;

/**
 * As the sponsor, reject the escapee's escape request.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.reject = internal.reject;

/**
 * As the sponsor, stop sponsoring the point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Object} An unsigned transaction object.
 */
module.exports.detach = internal.detach;

/**
 * Configure the voting proxy address for the galaxy.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - Point number.
 * @param {String} proxy - The proxy's address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setVotingProxy = internal.setVotingProxy;

/**
 * As a galaxy, start a poll for the ecliptic upgrade proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {Object} proposal - The ecliptic upgrade proposal.
 * @return {Object} An unsigned transaction object.
 */
module.exports.startUpgradePoll = internal.startUpgradePoll;

/**
 * As a galaxy, start a poll for a proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} proposal - The proposal document.
 * @return {Object} An unsigned transaction object.
 */
module.exports.startDocumentPoll = internal.startDocumentPoll;

/**
 * As a galaxy, cast a vote on the ecliptic upgrade proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {Object} proposal - The upgrade proposal.
 * @param {Bool} vote - True if yes, false otherwise.
 * @return {Object} An unsigned transaction object.
 */
module.exports.castUpgradeVote = internal.castUpgradeVote;

/**
 * As a galaxy, cast a vote on the proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
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
module.exports.updateUpgradePoll = internal.updateUpgradePoll;

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
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} target - The target address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.createGalaxy = internal.createGalaxy;

/**
 * Set primary, secondary, adn tertiary DNS domains for the ecliptic.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} primary - Primary DNS address.
 * @param {String} secondary - Secondary DNS address.
 * @param {String} tertiary - Tertiary DNS address.
 * @return {Object} An unsigned transaction object.
 */
module.exports.setDnsDomains = internal.setDnsDomains;
