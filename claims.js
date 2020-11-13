/**
 * Claims API
 * @module claims
 */

const internal = require('./internal/claims');

/*
 * Writes a claim to the Claims contract.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} protocol - Context or platform of the claim.
 * @param {String} claim - The claim.
 * @param {String} dossier - Data relating to the claim, as proof.
 * @return {Object} An unsigned transaction object.
 */
module.exports.addClaim = internal.addClaim;

/*
 * Removes a claim from the Claims contract.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} protocol - Context or platform of the claim.
 * @param {String} claim - The claim.
 * @return {Object} An unsigned transaction object.
 */
module.exports.removeClaim = internal.removeClaim;

/*
 * Reads a claim of a point at a specific index.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {Number} index - The index of the array.
 * @return {Promise<Object>} A claims object.
 */
module.exports.getClaim = internal.getClaim;

/*
 * Reads a claim of a point at a specific index.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @return {Promise<Object[]>} An array of claims objects.
 */
module.exports.getAllClaims = internal.getAllClaims;
