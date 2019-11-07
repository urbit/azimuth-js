/***
 * conditionalSR API
 * @module conditionalSR
 */

const internal = require('./internal/conditionalSR');

/**
 * Return the details of a commitment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Object>} A commitment object, with windup, rate, rateUnit,
 * amount, withdrawn.
 */
module.exports.getCommitment = internal.getCommitment;

/**
 * Return the list of stars that have been deposited into, but not yet
 * withdrawn from a commitment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Array<Number>>} The stars left in the commitment.
 */
module.exports.getRemainingStars = internal.getRemainingStars;

/**
 * Return the configured sizes of the batches for the commitment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Array<Number>>} The batch sizes for the commitment.
 */
module.exports.getBatches = internal.getBatches;

/**
 * Return whether the amount of stars deposited into the commitment checks out.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
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
 * Return the amount of stars a participant has already withdrawn from
 * each of their batches at the current time
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Array<Number>>} the number of stars already withdrawn for
 * each batch.
 */
module.exports.getWithdrawn = internal.getWithdrawn;
/**
 * Return the amount of stars a participant is allowed to withdraw from
 * one of their batches at the current time.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @param {Number} batch - The batch number to look up
 * @return {Promise<Number>} the withdraw limit.
 */
module.exports.getWithdrawLimit = internal.getWithdrawLimit;

/**
 * Return the address this commitment can be transferred to.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<String>} The approved transfer address, 0x0 for none.
 */
module.exports.getApprovedTransfer = internal.getApprovedTransfer;

/**
 * Return conditions configuration and state data.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<Object>} An object containing conditions state, with
 * { conditions, livelines, deadlines, timestamps } arrays.
 */
module.exports.getConditionsState = async function(contracts) {
  let { conds, deads, lives, times } = await internal.getConditionsState(
    contracts
  );
  return {
    conditions: conds,
    livelines: lives,
    deadlines: deads,
    timestamps: times
  };
};

/**
 * Approve the transfer of a commitment to another address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The address to transfer to.
 * @return {Promise<Object>} An unsigned transaction object.
 */
module.exports.approveCommitmentTransfer = internal.approveCommitmentTransfer;

/**
 * Make an approved transfer of the specified commitment to the caller's address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The address to transfer from.
 * @return {Object} An unsigned transaction object.
 */
module.exports.transferCommitment = internal.transferCommitment;

/**
 * Withdraw one star from a batch to the caller's address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} batch - The batch number to withdraw from
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdraw = internal.withdraw;

/**
 * Withdraw one star from a batch to the specified address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} batch - The batch number
 * @param {String} address - The address to withdraw to.
 * @return {Object} An unsigned transaction object.
 */
module.exports.withdrawTo = internal.withdrawTo;

/**
 * Forfeit stars contained in a batch with missed deadline, and all after it.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} batch - The condition/batch to base forfeiture off.
 * @return {Object} An unsigned transaction object.
 */
module.exports.forfeit = internal.forfeit;

/**
 * Analyze a condition for satisfaction.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} condition - The condition (index) to analyze.
 * @return {Object} An unsigned transaction object.
 */
module.exports.analyzeCondition = internal.analyzeCondition;
