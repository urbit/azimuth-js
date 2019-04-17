/**
 * Delegated Sending
 * @module delegatedSending
 */

const internal = require('./internal/delegatedSending');

//TODO write docstrings

/**
 * Return the amount of invites left in the pool
 * @param {Number} pool - Pool number
 * @return {Promise<Number>} Number of invites remaining
 */
module.exports.pools = internal.pools
module.exports.invitesInPool = internal.pools

/**
 * Return the points invited by point
 * @param {Number} point - Point number
 * @return {Promise<Array<Number>>} Points invited by point
 */
module.exports.getInvited = internal.getInvited

/**
 * Return the point that point was invited by
 * @param {Number} point - Point number
 * @return {Promise<Number>} The inviter point (0 if not invited)
 */
module.exports.invitedBy = internal.invitedBy

/**
 * Returns true if as can send point, false otherwise
 * @param {Number} as - The inviter
 * @param {Number} point - The point to send
 * @return {Promise<Bool>} Whether as can send point
 */
module.exports.canSend = internal.canSend

/**
 * Get the invite pool point belongs to
 * @param {Number} point - Point number
 * @return {Promise<Number>} Pool number
 */
module.exports.getPool = internal.getPool
module.exports.invitingFromPool = internal.getPool

/**
 * Returns true if receipients is eligible to receive a point, false otherwise
 * @param {String} recipient - Ethereum address
 * @return {Promise<Bool>} Whether recipient can receive a point
 */
module.exports.canReceive = internal.canReceive


/**
 * Give for (and their invite tree) access to size invites
 * @param {Number} for - point to give invites to
 * @param {Number} size - amount of invites to give
 * @return {Object} An unsigned transaction object
 */
module.exports.setPoolSize = internal.setPoolSize

/**
 * As as, send the point to to
 * @param {Number} as - point to send the invite as
 * @param {Number} point - the point to send as an invite
 * @param {String} to - target Ethereum address
 * @return {Object} An unsigned transaction object
 */
module.exports.sendPoint = internal.sendPoint

