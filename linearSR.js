/***
 * linearSR API
 * @module linearSR
 */

const internal = require('./internal/linearSR');

/**
 * Return the details of a batch.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Object>} A batch object, with windup, rate, rateUnit,
 * amount, withdrawn.
 */
module.exports.getBatch = internal.getBatch;

/**
 * Return the list of stars that have been deposited into, but not yet
 * withdrawn from a batch.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Array<Number>>} The stars left in the batch.
 */
module.exports.getRemainingStars = internal.getRemainingStars;

/**
 * Return whether the amount of stars deposited into the batch checks out.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Bool>} true if sufficient stars have been deposited.
 */
module.exports.verifyBalance = internal.verifyBalance;

/**
 * Return the timestamp at which the release was started.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<Number>} A timestamp.
 */
module.exports.getStartTime = internal.getStartTime;

/**
 * Return the amount of stars a participant is allowed to withdraw from their
 * batch at the current time.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Number>} the withdraw limit.
 */
module.exports.getWithdrawLimit = internal.getWithdrawLimit;

/**
 * Return the address this batch can be transferred to.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<String>} The approved transfer address, 0x0 for none.
 */
module.exports.getApprovedTransfer = internal.getApprovedTransfer;


/**
 * Approve the transfer of a batch to another address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The address to transfer to.
 * @return {Object} An unsigned transaction object.
 */
module.exports.approveBatchTransfer = internal.approveBatchTransfer;

/**
 * Make an approved transfer of the specified batch to the caller's address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The address to transfer from.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferBatch = internal.transferBatch;

/**
 * Withdraw one star to the caller's address.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdraw = internal.withdraw;

/**
 * Withdraw one star to the specified address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The address to withdraw to.
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdrawTo = internal.withdrawTo;
