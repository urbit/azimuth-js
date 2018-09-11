/**
 * Pool API
 * @module pool
 */

const internal = require('./internal/pool');

/*
 * Return the token value for one star.
 * @param {Object} contracts - The Urbit contracts object.
 * @return {Number} Token value.
 */
module.exports.getOneStar = internal.getOneStar;

/*
 * Get all stars held in the pool.
 * @param {Object} contracts - The Urbit contracts object.
 * @return {Array} All stars held in the pool.
 */
module.exports.getAllAssets = internal.getAllAssets;

/*
 * Get the number of stars held in the pool.
 * @param {Object} contracts - The Urbit contracts object.
 * @return {Number} The star count.
 */
module.exports.getAssetCount = internal.getAssetCount;

/*
 * Return the balance that the supplied address has with the pool.
 * @param {Object} contracts - The Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Number} The address's star balance.
 */
module.exports.getBalance = internal.getBalance;

