/**
 * Pool API
 * @module pool
 */

const internal = require('./internal/pool');

/*
 * Return the token value for one star.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Number} Token value.
 */
module.exports.getOneStar = internal.getOneStar;

/*
 * Get all stars held in the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Array} All stars held in the pool.
 */
module.exports.getAllAssets = internal.getAllAssets;

/*
 * Get the number of stars held in the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Number} The star count.
 */
module.exports.getAssetCount = internal.getAssetCount;

/*
 * Return the balance that the supplied address has with the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The target address.
 * @return {Number} The address's star balance.
 */
module.exports.getBalance = internal.getBalance;

/*
 * Get the index of the given star in a pool's asset registry.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} star - A (star) ship token.
 * @return {Number} The star index.
 */
module.exports.getAssetIndex = internal.getAssetIndex;
/*
 * Add a star to the pool and receive a spark token in return.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} star - A (star) ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.deposit = internal.deposit;

/*
 * Pay a spark token and withdraw a star from the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} star - A (star) ship token.
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdraw = internal.withdraw;

/*
 * Pay a spark token and withdraw any available star from the pool.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdrawAny = internal.withdrawAny;

