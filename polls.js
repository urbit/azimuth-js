/**
 * Polls API
 * @module polls
 */

const internal = require('./internal/polls');

/*
 * Get the ecliptic poll at the target address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Object>} The specified poll.
 */
module.exports.getEclipticPoll = internal.getEclipticPoll;

/*
 * Get the document poll at the target address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Object>} The specified poll.
 */
module.exports.getDocumentPoll = internal.getDocumentPoll;

/*
 * Check if a ecliptic proposal has achieved a majority.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Bool>} True if majority achieved, false otherwise.
 */
module.exports.eclipticHasAchievedMajority = internal.eclipticHasAchievedMajority;

/*
 * Check if a document proposal has achieved a majority.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Bool>} True if majority achieved, false otherwise.
 */
module.exports.documentHasAchievedMajority = internal.documentHasAchievedMajority;

/*
 * Check if a galaxy has voted on a proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
module.exports.hasVotedOnEclipticPoll = internal.hasVotedOnEclipticPoll;

/*
 * Check if a galaxy has voted on a proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
module.exports.hasVotedOnDocumentPoll = internal.hasVotedOnDocumentPoll;

/*
 * Check whether a proposal has achieved majority, updating the state and
 * sending an event if it has.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
module.exports.updateDocumentPoll = internal.updateDocumentPoll;

