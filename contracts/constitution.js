let c; // constitution contract

const s = require('./ships');
const p = require('./polls');

const utils = require('../utils');

const reasons = require('../resources/reasons.json');
const abis = require('../resources/abis.json');

//TODO could we also instantiate this ourselves?
let web3; // web3 instance, for canStartConstitutionPoll()
let account; // assumed caller address

function setContract(constitution)
{
  c = constitution;
}

function setAccount(a)
{
  account = a;
}

function setWeb3(w)
{
  web3 = w;
}

//
// data getters and simple checks, return promises
//

function getSpawnLimit(ship, timestamp)
{
  timestamp = timestamp || Math.round(new Date().getTime()/1000);
  return c.methods.getSpawnLimit(ship, timestamp).call();
}

async function isConstitutionOwner(address)
{
  address = address || account;
  return utils.addressEquals(address, await c.methods.owner().call());
}

//
// constitution functions and their checks
//
// validity checks return result object promises,
// action functions return raw unsigned transaction objects
//

async function canSetManager()
{
  return { result: true };
}

function setManager(manager)
{
  return protoTx(c.methods.setManager(manager));
}

async function canConfigureKeys(ship)
{
  return await s.checkActiveShipManager(ship);
}

function configureKeys(ship, crypt, auth, suite, discontinuous)
{
  return protoTx(
    c.methods.configureKeys(ship, crypt, auth, suite, discontinuous)
  );
}

async function canSpawn(ship, target)
{
  let res = { result: false };
  let prefix = utils.getPrefix(ship);
  let preShip = await s.getShip(prefix);
  // must either be the owner of the prefix, or a spawn proxy for it
  if (!s.isOwner(preShip) && !s.isSpawnProxy(preShip))
  {
    res.reason = reasons.permission;
    return res;
  }
  // only currently unowned ships can be spawned
  if (await s.hasOwner(ship))
  {
    res.reason = reasons.spawned;
    return res;
  }
  // only allow spawning of ships of the class directly below the prefix
  if ((utils.getShipClass(prefix)+1) !== utils.getShipClass(ship))
  {
    res.reason = reasons.spawnClass;
    return res;
  }
  // prefix ship must be live and able to spawn
  if (!s.hasBeenBooted(preShip) ||
      preShip.spawnCount >= await getSpawnLimit(prefix))
  {
    res.reason = reasons.spawnPrefix;
    return res;
  }
  // prevent burning of ships
  if (utils.isZeroAddress(target))
  {
    res.reason = reasons.zero;
    return res;
  }
  res.result = true;
  return res;
}

function spawn(ship, target)
{
  return protoTx(c.methods.spawn(ship, target));
}

async function canSetSpawnProxy(prefix)
{
  let res = { result: false };
  let preShip = await s.getShip(prefix);
  //NOTE activeShipOwner
  // must be the owner of the ship
  if (!await s.isOwner(preShip))
  {
    res.reason = reasons.permission;
    return res;
  }
  // the ship must be active
  if (!await s.isActive(preShip))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

function setSpawnProxy(prefix, spawnProxy)
{
  return protoTx(c.methods.setSpawnProxy(prefix, spawnProxy));
}

async function canTransferShip(ship, target)
{
  let res = { result: false };
  let theShip = await s.getShip(ship);
  // must be either the owner of the ship,
  // a transfer proxy for the ship,
  // or an operator for the owner
  if (!s.isOwner(theShip) &&
      !s.isTransferProxy(theShip) &&
      !await s.isOperator(theShip.owner))
  {
    res.reason = reasons.permission;
    return res;
  }
  // prevent burning of ships
  if (utils.isZeroAddress(target))
  {
    res.reason = reasons.zero;
    return res;
  }
  res.result = true;
  return res;
}

function transferShip(ship, target, reset)
{
  return protoTx(c.methods.transferShip(ship, target, reset));
}

async function canSetTransferProxy(ship, proxy)
{
  let res = { result: false };
  let theShip = await s.getShip(ship);
  // must be either the owner of the ship,
  // or an operator for the owner
  if (!s.isOwner(theShip) &&
      !await s.isOperator(theShip.owner))
  {
    res.reason = reasons.permission;
    return res;
  }
  res.result = true;
  return res;
}

function setTransferProxy(ship, transferProxy)
{
  return protoTx(c.methods.setTransferProxy(ship, transferProxy));
}

async function canEscape(ship, sponsor)
{
  let asm = await s.checkActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  let shipClass = utils.getShipClass(ship);
  let sponsorClass = utils.getShipClass(sponsor);
  // can only escape to a ship one class higher than ourselves,
  // except in the special case where the escaping ship hasn't
  // been booted yet -- in that case we may escape to ships of
  // the same class, to support lightweight invitation chains.
  if (sponsorClass+1 !== shipClass &&
      !(sponsorClass === shipClass &&
        !await s.hasBeenBooted(ship)))
  {
    res.reason = reasons.sponsor;
    return res;
  }
  // can't escape to a sponsor that hasn't been booted
  if (!await s.hasBeenBooted(sponsor))
  {
    res.reason = reasons.sponsorBoot;
    return res;
  }
  res.result = true;
  return res;
}

function escape(ship, sponsor)
{
  return protoTx(c.methods.escape(ship, sponsor));
}

async function canCancelEscape(ship)
{
  return s.checkActiveShipManager(ship);
}

function cancelEscape(ship)
{
  return protoTx(c.methods.cancelEscape(ship));
}

async function canAdopt(sponsor, escapee)
{
  let asm = await s.checkActiveShipManager(sponsor);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await s.isRequestingEscape(escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

function adopt(sponsor, escapee)
{
  return protoTx(c.methods.adopt(sponsor, escapee));
}

async function canReject(sponsor, escapee)
{
  let asm = await s.checkActiveShipManager(sponsor);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await s.isRequestingEscape(escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

function reject(sponsor, escapee)
{
  return protoTx(c.methods.reject(sponsor, escapee));
}

async function canDetach(sponsor, ship)
{
  let asm = await s.checkActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  // ship must currently be sponsored by sponsor
  if (!await s.isSponsor(ship, sponsor))
  {
    res.reason = reasons.notSponsor;
    return res;
  }
  res.result = true;
  return res;
}

function detach(sponsor, ship)
{
  return protoTx(c.methods.detach(sponsor, ship));
}

async function canSetDelegate()
{
  return true;
}

function setDelegate(delegate)
{
  return protoTx(c.methods.setDelegate(delegate));
}

async function canStartConstitutionPoll(galaxy, proposal)
{
  let asv = await s.checkActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  let prop = new web3.eth.Contract(abis.constitution, proposal);
  // ensure that the upgrade target expects the current contract as the source
  let expected;
  try
  {
    // this can throw if the proposal doesn't actually point to a constitution
    expected = await prop.methods.previousConstitution().call();
  }
  catch(e)
  {
    expected = false;
  }
  if (c._address !== expected)
  {
    res.reason = reasons.upgradePath;
    return res;
  }
  // proposal must not have achieved majority before
  if (await p.constitutionHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // check that the poll has cooled down enough to be started again
  if (!p.canStartPoll(await p.getConstitutionPoll(proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

function startConstitutionPoll(galaxy, proposal)
{
  return protoTx(c.methods.startConstitutionPoll(galaxy, proposal));
}

async function canStartDocumentPoll(galaxy)
{
  let asv = await s.checkActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await p.documentHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // check that the poll has cooled down enough to be started again
  if (!p.canStartPoll(await p.getDocumentPoll(proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

function startDocumentPoll(galaxy, proposal)
{
  return protoTx(c.methods.startDocumentPoll(galaxy, proposal));
}

async function canCastConstitutionVote(galaxy, proposal)
{
  let asv = await s.checkActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await p.constitutionHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!p.pollIsActive(await p.getConstitutionPoll(proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await p.hasVotedOnConstitutionPoll(galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

function castConstitutionVote(galaxy, proposal, vote)
{
  return protoTx(c.methods.castConstitutionVote(galaxy, proposal, vote));
}

async function canCastDocumentVote(galaxy, proposal)
{
  let asv = await s.checkActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await p.documentHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!p.pollIsActive(await p.getDocumentPoll(proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await p.hasVotedOnDocumentPoll(galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

function castDocumentVote(galaxy, proposal, vote)
{
  return protoTx(c.methods.castDocumentVote(galaxy, proposal, vote));
}

function updateConstitutionPoll(proposal)
{
  return protoTx(c.methods.updateConstitutionPoll(proposal));
}

function updateDocumentPoll(proposal)
{
  return protoTx(c.methods.updateDocumentPoll(proposal));
}

async function canCreateGalaxy(galaxy, target)
{
  let res = { result: false };
  // only contract owner may do this
  if (!await isConstitutionOwner())
  {
    res.reason = reasons.permission;
    return res;
  }
  // only currently unowned ships can be spawned
  if (await s.hasOwner(galaxy))
  {
    res.reason = reasons.spawned;
    return res;
  }
  // prevent burning of ships
  if (utils.isZeroAddress(target))
  {
    res.reason = reasons.zero;
    return res;
  }
  res.result = true;
  return res;
}

function createGalaxy(galaxy, target)
{
  return protoTx(c.methods.createGalaxy(galaxy, target));
}

function canSetDnsDomains()
{
  return isConstitutionOwner();
}

function setDnsDomains(primary, secondary, tertiary)
{
  return protoTx(c.methods.setDnsDomains(primary, secondary, tertiary));
}

//
// misc internal utility
//

function protoTx(encodedABI, value)
{
  return utils.protoTx(account, c._address, encodedABI, value);
}

module.exports = {
  setContract,
  setAccount,
  setWeb3,
  //
  getSpawnLimit,
  isConstitutionOwner,
  //
  canSetManager,
  setManager,
  canConfigureKeys,
  configureKeys,
  canSpawn,
  spawn,
  canSetSpawnProxy,
  setSpawnProxy,
  canTransferShip,
  transferShip,
  canSetTransferProxy,
  setTransferProxy,
  canEscape,
  escape,
  canCancelEscape,
  cancelEscape,
  canAdopt,
  adopt,
  canReject,
  reject,
  canDetach,
  detach,
  canSetDelegate,
  setDelegate,
  canStartConstitutionPoll,
  startConstitutionPoll,
  canStartDocumentPoll,
  startDocumentPoll,
  canCastConstitutionVote,
  castConstitutionVote,
  canCastDocumentVote,
  castDocumentVote,
  updateConstitutionPoll,
  updateDocumentPoll,
  canCreateGalaxy,
  createGalaxy,
  canSetDnsDomains,
  setDnsDomains
}
