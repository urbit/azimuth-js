/**
 * Polls API
 * @module polls
 */

const internal = require('./internal/polls');

/*
 * Get all documents that have ever been proposed.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<Array<String>>} Document hashes.
 */
module.exports.getDocumentProposals = internal.getDocumentProposals;

/*
 * Get all upgrades that have ever been proposed.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<Array<String>>} Contract addresses.
 */
module.exports.getUpgradeProposals = internal.getUpgradeProposals;

/*
 * Get all documents that have achieved majority.
 * @param {Object} contracts - An Urbit contracts object.
 * @return {Promise<Array<String>>} Document hashes.
 */
module.exports.getDocumentMajorities = internal.getDocumentMajorities;

/*
 * Get the upgrade poll at the target address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} proposal - The target proposal address.
 * @return {Promise<Object>} The specified poll.
 */
module.exports.getUpgradePoll = internal.getUpgradePoll;

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
module.exports.hasVotedOnUpgradePoll = internal.hasVotedOnUpgradePoll;

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

