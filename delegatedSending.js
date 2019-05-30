/**
 * Delegated Sending
 * @module delegatedSending
 */

const internal = require('./internal/delegatedSending');
const azimuth = require('./azimuth');
const ecliptic = require('./ecliptic');

/**
 * Return the amount of invites left in the pool
 * @param {Number} pool - Pool number
 * @param {Number} prefix - Invites from this prefix
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
 * Get the stars that have put invites into the pool
 * @param {Number} pool - Pool number
 * @return {Promise<Array<Number>>} Stars that touched the pool
 */
module.exports.getPoolStars = internal.getPoolStars

/**
 * Returns true if receipients is eligible to receive a point, false otherwise
 * @param {String} recipient - Ethereum address
 * @return {Promise<Bool>} Whether recipient can receive a point
 */
module.exports.canReceive = internal.canReceive

/**
 * Generate a list of planets for as to send as invites
 * NOTE that the returned list isn't guaranteed to contain exactly amount items,
 *      it may return fewer in cases where not enough invites are available,
 *      or spawn limits are being hit
 * @param {Number} as - point to send the planets with
 * @param {Number} amount - amount of planets to generate
 * @return {Promise<Array<Number>>} Pseudo-random list of planets that as can send
 */
module.exports.getPlanetsToSend = async function(contracts, as, amount) {
  const sponsor = await azimuth.getSponsor(contracts, as);
  const inviter = await internal.invitedBy(contracts, as);
  const inviterSponsor = await azimuth.getSponsor(contracts, inviter);
  const pool = await internal.getPool(contracts, as);
  let stars = await internal.getPoolStars(contracts, as);

  // assign priorities so that we can order them:
  // sponsor > inviter's sponsor > least spawned > most spawned
  stars = stars.map(async star => {
    const available = await internal.pools(contracts, pool, star);
    const capable = azimuth.isSpawnProxy(
      contracts, star, contracts.delegatedSending.address
    );
    if (available === 0 || !(await capable))
      return {star, available};

    const spawned = await azimuth.getSpawnCount(contracts, star);
    if (star === sponsor)
      priority = -2;
    else if (star === inviterSponsor)
      priority = -1;
    else if (priority === 0)
      priority = spawned;

    return {star: Number(star), available, priority};
  });
  stars = await Promise.all(stars);
  stars = stars.filter(a => (a.available > 0));
  stars = stars.sort((a, b) => (a.priority - b.priority));

  let s = 0;
  let planets = [];
  while (amount > 0 && s < stars.length) {
    let star = stars[s];
    const spawnable = await ecliptic.getSpawnsRemaining(contracts, star.star);
    const get = Math.min(star.available, spawnable, amount);
    const unspawned = await azimuth.getUnspawnedChildren(contracts, star.star);

    // make sure the first couple elements are randomized
    for (let i = 0; i < get; i++) {
      const j = Math.floor(Math.random() * unspawned.length);
      [unspawned[i], unspawned[j]] = [unspawned[j], unspawned[i]];
    }

    // push number of planets to output list
    for (let i = 0; i < get; i++) {
      planets.push(unspawned[i]);
    }
    amount = amount - get;
    s++;
  }
  return planets;
}


/**
 * Give for (and their invite tree) access to size invites
 * @param {Number} as - prefix to give invites as
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

