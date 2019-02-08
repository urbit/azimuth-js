/**
 * Contract checks, assertions, and verifications
 * @module check
 */

const { eclipticAbi } = require('./contracts');
const ecliptic = require('./ecliptic');
const azimuth = require('./azimuth');
const polls = require('./polls');
const utils = require('./utils');
const reasons = require('./resources/reasons.json');

const MAXGALAXY = 255;
const MAXSTAR = 65535;
const MAXPLANET = 4294967295;

/**
 * Check if something is a point.
 * @param {Number} point - Point number.
 * @return {Bool} True if a point, false otherwise.
 */
function isPoint(point) {
  return (typeof point === 'number' && point >= 0 && point <= MAXPLANET);
}

/**
 * Check if something is a galaxy.
 * @param {Number} point - Point number.
 * @return {Bool} True if a galaxy, false otherwise.
 */
function isGalaxy(point) {
  return (typeof point === 'number' && point >= 0 && point <= MAXGALAXY);
}

/**
 * Check if something is a star.
 * @param {Number} point - Point number.
 * @return {Bool} True if a star, false otherwise.
 */
function isStar(point) {
  return (typeof point === 'number' && point > MAXGALAXY && point <= MAXSTAR);
}

/**
 * Check if something is a planet.
 * @param {Number} point - Point number.
 * @return {Bool} True if a planet, false otherwise.
 */
function isPlanet(point) {
  return (typeof point === 'number' && point > MAXSTAR && point <= MAXPLANET);
}

/**
 * Check if a point is a prefix of another point.
 * @param {Number} point - Point number.
 * @return {Bool} True if a prefix, false otherwise.
 */
function isPrefix(point) {
  return (typeof point === 'number' && point >= 0 && point <= MAXSTAR);
}

/**
 * Check if a point is a child of another point.
 * @param {Number} point - Point number.
 * @return {Bool} True if a child, false otherwise.
 */
function isChild(point) {
  return (typeof point === 'number' && point > MAXGALAXY && point <= MAXPLANET);
}

/**
 * Check if a poll is active.
 * @param {Object} poll - A poll object.
 * @return {Bool} True if active, false otherwise.
 */
function pollIsActive(poll) {
  let now = Math.round(new Date().getTime()/1000);
  let end = poll.start + poll.duration;
  return now < end;
}

/**
 * Check if a poll can be started.
 * @param {Object} poll - A poll object.
 * @return {Bool} True if so, false otherwise.
 */
function canStartPoll(poll) {
  let now   = Math.round(new Date().getTime()/1000);
  let start = poll.start + poll.duration + poll.coolDown;
  return now > start;
}

/**
 * Check if a point has an owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function hasOwner(contracts, point) {
  if (typeof point === 'object') {
    return !utils.addressEquals(point.owner, utils.zeroAddress());
  }
  return !await azimuth.isOwner(contracts, point, utils.zeroAddress());
}

/**
 * Check if an address is the ecliptic owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Owner's address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
async function isEclipticOwner(contracts, address) {
  return utils.addressEquals(address, await ecliptic.owner(contracts));
}

// NB (jtobin):
//
//   Change the { result, reason } objects to use data.either or
//   folktale.Result at some point.

/**
 * Check if an address can create the specified galaxy.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canCreateGalaxy(contracts, galaxy, address) {
  let res = { result: false };
  // can't target zero address
  if (utils.isZeroAddress(address)) {
    res.reason = reasons.zero;
    return res;
  }
  // must be ecliptic owner
  if (!await isEclipticOwner(contracts, address)) {
    res.reason = reasons.permission;
    return res;
  }
  // can't already exist
  if (await hasOwner(contracts, galaxy)) {
    res.reason = reasons.spawned;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if an address can spawn the given point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canSpawn(contracts, point, target) {
  let res = { result: false };

  // prevents targeting the zero address
  if (utils.isZeroAddress(target)) {
    res.reason = reasons.zero;
    return res;
  }
  let prefix        = azimuth.getPrefix(point);
  let prefixPointObj = await azimuth.getPoint(contracts, prefix);

  // must either be the owner of the prefixPointObj, or a spawn proxy for it
  if (!azimuth.isOwner(contracts, prefixPointObj, target) &&
      !azimuth.isSpawnProxy(contracts, prefixPointObj, target))
  {
    res.reason = reasons.permission;
    return res;
  }

  // only currently unowned points can be spawned
  if (await hasOwner(contracts, point)) {
    res.reason = reasons.spawned;
    return res;
  }

  // only allow spawning of points of the size directly below the prefix
  let childSize = azimuth.getPointSize(prefix) + 1;
  let pointSize  = azimuth.getPointSize(point);
  if (childSize !== pointSize) {
    res.reason = reasons.spawnSize;
    return res;
  }

  // prefix must be linked and able to spawn
  let ts         = Math.round(new Date().getTime() / 1000);
  let spawnLimit = await ecliptic.getSpawnLimit(contracts, prefix, ts);
  if (!azimuth.hasBeenLinked(contracts, prefixPointObj) ||
      (await azimuth.getSpawnCount(contracts, point)) >= spawnLimit)
  {
    res.reason = reasons.spawnPrefix;
    return res;
  }

  res.result = true
  return res;
}

async function canSetManagementProxy(contracts, point, address) {
  return checkActivePointOwner(contracts, point, address);
}

async function canSetVotingProxy(contracts, point, address) {
  if (!isGalaxy(point)) return { result: false, reason: reasons.notGalaxy };
  return checkActivePointOwner(contracts, point, address);
}

/**
 * Check if an address can set a spawn proxy for the given point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canSetSpawnProxy(contracts, prefix, address) {
  return checkActivePointOwner(contracts, prefix, address);
}

/**
 * Check if the sender address can send the provided point to the target
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @param {String} sender - Sender's address.
 * @param {String} target - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canTransferPoint(contracts, point, source, target) {
  let res     = { result: false };
  // prevent burning of points
  if (utils.isZeroAddress(target))
  {
    res.reason = reasons.zero;
    return res;
  }

  let pointObj = await azimuth.getPoint(contracts, point);
  // must be either the owner of the point,
  // a transfer proxy for the point,
  // or an operator for the owner
  if (!azimuth.isOwner(contracts, pointObj, source) &&
      !azimuth.isTransferProxy(contracts, pointObj, source) &&
      !await azimuth.isOperator(contracts, pointObj.owner, source))
  {
    res.reason = reasons.permission;
    return res;
  }

  res.result = true;
  return res;
}

/**
 * Check if the address can set a transfer proxy for the point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} pointId - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canSetTransferProxy(contracts, point, address) {
  let res     = { result: false };
  let pointObj = await azimuth.getPoint(contracts, point);
  // must be either the owner of the point,
  // or an operator for the owner
  if (!azimuth.isOwner(contracts, pointObj, address) &&
      !await azimuth.isOperator(contracts, pointObj.owner, address))
  {
    res.reason = reasons.permission;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can make a point escape to the given sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {Number} sponsor - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canEscape(contracts, point, sponsor, address) {
  let asm = await checkActivePointManager(contracts, point, address);
  if (!asm.result) {
    return asm;
  }
  let res = { result: false };
  let pointSize    = azimuth.getPointSize(point);
  let sponsorSize = azimuth.getPointSize(sponsor);
  // can only escape to a point one size higher than ourselves,
  // except in the special case where the escaping point hasn't
  // been booted yet -- in that case we may escape to points of
  // the same size, to support lightweight invitation chains.
  if (sponsorSize + 1 !== pointSize &&
      !(sponsorSize === pointSize &&
        !await azimuth.hasBeenLinked(contracts, point)))
  {
    res.reason = reasons.sponsor;
    return res;
  }
  // can't escape to a sponsor that hasn't been booted
  if (!await azimuth.hasBeenLinked(contracts, sponsor))
  {
    res.reason = reasons.sponsorBoot;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a point is active and the target address is its owner.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function checkActivePointOwner(contracts, point, address) {
  let res = { result: false };
  let thePoint = await azimuth.getPoint(contracts, point);
  // must be the owner of the point
  if (!await azimuth.isOwner(contracts, thePoint, address)) {
    res.reason = reasons.permission;
    return res;
  }
  // the point must be active
  if (!await azimuth.isActive(contracts, thePoint)) {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a point is active and the target address can manage it.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function checkActivePointManager(contracts, point, address) {
  res = { result: false };
  if (!await azimuth.canManage(contracts, point, address))
  {
    res.reason = reasons.permission;
    return res;
  }
  if (!await azimuth.isActive(contracts, point))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if an address can configure public keys for a point.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canConfigureKeys(contracts, point, address) {
  return await checkActivePointManager(contracts, point, address);
}

/**
 * Check if the target address can adopt the escapee as its new sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canAdopt(contracts, escapee, address) {
  let res = { result: false };
  // escapee must currently be trying to escape
  let point = await azimuth.getPoint(contracts, escapee, 'state');
  if (!point.escapeRequested) {
    res.reason = reasons.notEscape;
    return res;
  }
  // caller must manage the requested sponsor
  return await checkActivePointManager(contracts, point.escapeRequestedTo, address);
}

/**
 * Check if the target address can reject the escapee's request to the given
 * sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} escapee - Escapee's point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canReject(contracts, escapee, address) {
  // check is currently identical to adopt()'s.
  return await canAdopt(contracts, escapee, address);
}

/**
 * Check if the target address can detach a point from its sponsor.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canDetach(contracts, point, address)
{
  let res = { result: false };
  // point must currently have a sponsor
  let thePoint = await azimuth.getPoint(contracts, point, 'state');
  if (!thePoint.hasSponsor) {
    res.reason = reasons.sponsorless;
    return res;
  }
  // caller must manage the requested sponsor
  return await checkActivePointManager(contracts, thePoint.sponsor, address);
}

/**
 * Check if a point is active and an address can vote for it.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} point - Point number.
 * @param {String} voter - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function checkActivePointVoter(contracts, galaxy, voter) {
  let res = { result: false }
  if (azimuth.getPointSize(galaxy) !== azimuth.PointSize.Galaxy)
  {
    res.reason = reasons.notGalaxy;
    return res;
  }
  if (!await azimuth.canVoteAs(contracts, galaxy, voter))
  {
    res.reason = reasons.permission;
    return res;
  }
  if (!await azimuth.isActive(contracts, galaxy))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and point can initiate a upgrade poll at the
 *  given address.
 * @param {Object} web3 - A web3 object.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canStartUpgradePoll(web3, contracts, galaxy, proposal, address) {
  let asv = await checkActivePointVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false};
  let prop = new web3.eth.Contract(eclipticAbi, proposal);
  let expected;
  try {
    expected = await prop.methods.previousEcliptic().call()
  } catch(e) {
    expected = false;
  }
  if (contracts.ecliptic._address !== expected) // FIXME (jtobin): inappropriate comparison here
  {
    res.reason = reasons.upgradePath;
    return res;
  }
  if (await polls.eclipticHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  if (!canStartPoll(await polls.getUpgradePoll(contracts, proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and point can initiate the given proposal.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canStartDocumentPoll(contracts, galaxy, proposal, address) {
  let asv = await checkActivePointVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  if (await polls.documentHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  if (!canStartPoll(await polls.getDocumentPoll(contracts, proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and point can vote on the proposal at the target
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canCastUpgradeVote(contracts, galaxy, proposal, address)
{
  let asv = await checkActivePointVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await polls.eclipticHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await polls.getUpgradePoll(contracts, proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await polls.hasVotedOnUpgradePoll(contracts, galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if a target address and point can vote on the proposal at the given
 * address.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} galaxy - A (galaxy) point number.
 * @param {String} proposal - The proposal address.
 * @param {String} address - Target address.
 * @return {Promise<Object>} A result and reason pair.
 */
async function canCastDocumentVote(contracts, galaxy, proposal, address)
{
  let asv = await checkActivePointVoter(contracts, galaxy, address);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await polls.documentHasAchievedMajority(contracts, proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await polls.getDocumentPoll(contracts, proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await polls.hasVotedOnDocumentPoll(contracts, galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the target address can set the DNS domains for the ecliptic.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - Target address.
 * @return {Promise<Bool>} True if so, false otherwise.
 */
function canSetDnsDomains(contracts, address) {
  return isEclipticOwner(contracts, address);
}


/**
 * Check if the address can withdraw a star from their batch at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the batch.
 * @return {Promise<Object>} A result and reason pair.
 */
async function lsrCanWithdraw(contracts, address) {
  let res = { result: false };
  let rem = await linearSR.getRemainingStars(contracts, address);
  if (rem.length === 0) {
    res.reason = reasons.noRemaining;
    return res;
  }
  let bas = await linearSR.getBatch(contracts, address);
  let lim = await linearSR.getWithdrawLimit(contracts, address);
  if (bas.withdrawn >= lim) {
    res.reason = reasons.withdrawLimit;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their batch at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - The participant/registered address for the batch.
 * @param {String} to - The intended new address of the participant.
 * @return {Promise<Object>} A result and reason pair.
 */
async function lsrCanTransferBatch(contracts, from, to) {
  let res = { result: false };
  let apr = await linearSR.getApprovedTransfer(contracts, from);
  if (to !== apr) {
    res.reason = reasons.notApproved;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their commitment at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} address - The participant/registered address for the commitment.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanWithdraw(contracts, address) {
  let res = { result: false };
  let rem = await conditionalSR.getRemainingStars(contracts, address);
  if (rem.length === 0) {
    res.reason = reasons.noRemaining;
    return res;
  }
  let com = await conditionalSR.getCommitment(contracts, address);
  let lim = await conditionalSR.getWithdrawLimit(contracts, address);
  // cannot withdraw more than the limit
  if (com.withdrawn >= lim) {
    res.reason = reasons.withdrawLimit;
    return res;
  }
  // cannot withdraw forfeited stars
  if (com.forfeit && rem.length <= com.forfeited) {
    res.reason = reasons.forfeitLimit;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can withdraw a star from their commitment at this moment.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {String} from - The participant/registered address for the commitment.
 * @param {String} to - The intended new address of the participant.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanTransferBatch(contracts, from, to) {
  let res = { result: false };
  let apr = await conditionalSR.getApprovedTransfer(contracts, from);
  if (to !== apr) {
    res.reason = reasons.notApproved;
    return res;
  }
  res.result = true;
  return res;
}

/**
 * Check if the address can forfeit their commitment starting at the batch.
 * @param {Object} contracts - An Urbit contracts object.
 * @param {Number} batch - The batch they want to forfeit from.
 * @param {String} address - The participant/registered address for the
 * commitment.
 * @return {Promise<Object>} A result and reason pair.
 */
async function csrCanForfeit(contracts, batch, address) {
  let res = { result: false };
  let com = await conditionalSR.getCommitment(contracts, address);
  // can only forfeit if not yet forfeited,
  if (com.forfeit) {
    res.reason = reasons.hasForfeited;
    return res;
  }
  let det = await conditionalSR.getConditionsState(contracts);
  // and deadline has been missed.
  if (det.deadlines[batch] !== det.timestamps[batch]) {
    res.reason = reasons.notMissed;
    return res;
  }
  res.result = true;
  return res;
}

module.exports = {
  ecliptic,
  azimuth,
  polls,
  isPoint,
  isGalaxy,
  isStar,
  isPlanet,
  isPrefix,
  isChild,
  pollIsActive,
  canStartPoll,
  hasOwner,
  isEclipticOwner,
  canCreateGalaxy,
  canSpawn,
  canSetManagementProxy,
  canSetVotingProxy,
  canSetSpawnProxy,
  canTransferPoint,
  canSetTransferProxy,
  canConfigureKeys,
  canEscape,
  canAdopt,
  canReject,
  canDetach,
  checkActivePointManager,
  checkActivePointVoter,
  canStartUpgradePoll,
  canStartDocumentPoll,
  canCastUpgradeVote,
  canCastDocumentVote,
  canSetDnsDomains,
  lsrCanWithdraw,
  lsrCanTransferBatch,
  csrCanWithdraw,
  csrCanTransferBatch,
  csrCanForfeit
}
