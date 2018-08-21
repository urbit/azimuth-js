'use strict';

//TODO probably split up into files per contract

// usage:
//TODO initialize contracts, set account

//NOTE
// for granular promise usage with transactions, see example:
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id12

const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');
const abis = require('./resources/abis.json');

//
// script variables
//

// web3: the web3 object we'll be working with.
let web3;

// contract instances
let constitution, ships, polls, pool;

//TODO maybe remove, we're not doing validation unless called to do so anymore,
//     so this is only really relevant in signTransaction()...
let offline = false;

// hd wallet master node
let hdNode;

// private key for the used account
//TODO can't we contain this in web3 somehow?
let privateKey;

// ethereum address that will perform transactions
// set alongside hdNode (setHdAccount), or individually (setPublicAccount)
let account;

// reasons for inability to transact
let reasons = {
  permission:   'Insufficient permission for this action',
  zero:         'Cannot target the zero address',
  inactive:     'Ship is not active',
  spawned:      'Ship already spawned',
  spawnClass:   'Spawning galaxy planets is not supported',
  spawnPrefix:  'Prefix is unable to spawn children',
  sponsorBoot:  'Sponsor has not been booted',
  sponsor:      'Invalid sponsor for ship',
  notEscape:    'Ship is not escaping to sponsor',
  upgradePath:  'Unexpected upgrade path',
  majority:     'Proposal has already achieved majority',
  pollTime:     'Existing poll is still active or cooling down',
  pollInactive: 'Poll is not currently active',
  pollVoted:    'Ship already voted on this poll'
}

let Class = {
  Galaxy: 0,
  Star: 1,
  Planet: 2
}

//
// configure
//

function setServerUrl(url)
{
  web3 = new Web3(new Web3.providers.HttpProvider(url));
}

function setOffline(offl)
{
  offline = offl;
}

//TODO these two are a bit weird. can they not be collapsed into just the logic
//     from setHdAccount?
function setPrivateKey(hd, path, index)
{
  hdNode = hd;
  web3.eth.accounts.privateKeyToAccount(hdNode.privateKey.toString('hex'));
  return setHdAccount(path, index);
}

//TODO can we not get public key from the hdNode, rather than accounts?
async function setHdAccount(path, index)
{
  let acs = await web3.eth.getAccounts();
  setPublicAccount(acs[index]);
  if (hdNode)
  {
    privateKey = hdNode.derive(path + '/' + index).privateKey.toString('hex');
  }
  return acs[index];
}

function setGanacheAccount()
{
  privateKey = 'a44de2416ee6beb2f323fab48b432925c9785808d33a6ca6d7ba00b45e9370c3';
  setPublicAccount('0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d');
}

function setPublicAccount(address)
{
  web3.eth.defaultAccount = address;
  account = address;
}

//NOTE verified functioning pattern, throws in the awaits just get thrown up
async function initializeContracts(shipsAddress, offlineConstitution, offlinePolls)
{
  ships = new web3.eth.Contract(abis.ships, shipsAddress);
  if (!offline)
  {
    let constitutionAddress = await ships.methods.owner().call();
    constitution = new web3.eth.Contract(abis.constitution, constitutionAddress);
    let pollsAddress = await constitution.methods.polls().call();
    polls = new web3.eth.Contract(abis.polls, pollsAddress);
  } else {
    constitution = new web3.eth.Contract(abis.constitution, offlineConstitution);
    polls = new web3.eth.Contract(abis.polls, offlinePolls);
  }
}

function initializeContractsDefault()
{
  //TODO update with real address once deployed
  return initializeContracts('0x863d9c2e5c4c133596cfac29d55255f0d0f86381');
}

function setPool(poolAddress)
{
  c.pool = new web3.eth.Contract(abis.pool, poolAddress);
}

//
// transactions
//

function pseudoTx(target, callData, value)
{
  if (typeof callData === 'object') callData = callData.encodeABI();
  return {
    from: account,
    to: target,
    data: callData,
    value: value || 0x0
  };
}

//TODO maybe do gas estimation in a separate fillTransactionDetails() function?
async function signTransaction(tx)
{
  //TODO check important tx values are set? all but from are web3 optional...

  // if no gas limit was specified, estimate it
  //TODO web3 default gas is "to be determined"? can we let it do this for us?
  if (!tx.gas)
  {
    // can't estimate gas if we're offline
    if (offline)
    {
      throw {
        name: 'Error',
        message: 'Need transaction gas limit.'
      };
    }
    //NOTE +1 because exactly the required gas causes a revert
    //TODO maybe we want to do *1.1 or similar instead?
    //TODO do we want to catch gas estimation errors and throw a custom error?
    tx.gas = (await web3.eth.estimateGas(tx)) + 1;
  }

  //TODO gasPrice defaults to web3.eth.gasPrice...

  return web3.eth.accounts.signTransaction(tx, '0x' + privateKey);
}

function sendTransaction(signedTx)
{
  if (typeof signedTx === 'object') signedTx = signedTx.rawTransaction;
  return web3.eth.sendSignedTransaction(signedTx);
}

async function doTheThing(tx)
{
  return await sendTransaction(await signTransaction(tx));
}

//
// ships utilities
//

function getPrefix(ship)
{
  if (ship < 65536)
  {
    return ship % 256;
  }
  return ship % 65536;
}

function getShipClass(ship)
{
  if (ship < 256) return Class.Galaxy;
  if (ship < 65536) return Class.Star;
  return Class.Planet;
}

//
// ships contract
//

//NOTE shipsTx() not needed because nodoby can make transactions to it.

function getShip(ship)
{
  return ships.methods.ships(ship).call();
}

function getSpawned(ship)
{
  return ships.methods.getSpawned(ship).call();
}

function isActive(ship)
{
  if (typeof ship === 'object') return (ship.active);
  return ships.methods.isActive(ship).call();
}

function hasBeenBooted(ship)
{
  //TODO is this cool y/n? we can save on api calls this way, internally
  //NOTE we assume the caller knows what they're calling with,
  //     so that we don't need to wrap the result in a promise
  if (typeof ship === 'object') return (ship.keyRevisionNumber > 0);
  return ships.methods.hasBeenBooted(ship).call();
}

function getOwnedShips(address)
{
  address = address || account;
  return ships.methods.getOwnedShipsByAddress(address).call();
}

function getManagingFor(address)
{
  address = address || account;
  return ships.methods.getManagingFor(address).call();
}

function getTransferringFor(address)
{
  address = address || account;
  return ships.methods.getTransferringFor(address).call();
}

function getSpawningFor(address)
{
  address = address || account;
  return ships.methods.getSpawningFor(address).call();
}

function getVotingFor(address)
{
  address = address || account;
  return ships.methods.getVotingFor(address).call();
}

function isOwner(ship, owner)
{
  owner = owner || account;
  if (typeof ship === 'object') return (ship.owner === owner);
  return ships.methods.isOwner(ship, owner).call();
}

async function isActiveShipOwner(ship, owner)
{
  owner = owner || account;
  res = { result: false };
  if (!await canManage(ship))
  {
    res.reason = reasons.permission;
    return res;
  }
  if (!await isActive(ship))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

function isOperator(owner, operator)
{
  operator = operator || account;
  return ships.methods.isOperator(owner, operator).call();
}

function isTransferProxy(ship, proxy)
{
  proxy = proxy || account;
  if (typeof ship === 'object')
    return (ship.transferProxy === proxy);
  return ships.methods.isTransferProxy(ship, proxy).call();
}

function isSpawnProxy(ship, address)
{
  address = address || account;
  if (typeof ship === 'object') return (ship.spawnProxy === address);
  return ships.methods.isSpawnProxy(ship, address).call();
}

function canManage(ship, address)
{
  address = address || account;
  return ships.methods.canManage(ship, address).call();
}

function canVoteAs(ship, address)
{
  address = address || account;
  return ships.methods.canVoteAs(ship, address).call();
}

//
// constitution contract
//

function constitutionTx(encodedABI, value)
{
  return pseudoTx(constitution._address, encodedABI, value);
}

function getConstitutionOwner()
{
  return constitution.methods.owner().call();
}

async function isConstitutionOwner(address)
{
  address = address || account;
  return (address === await getConstitutionOwner());
}

function getSpawnLimit(ship, timestamp)
{
  timestamp = timestamp || Math.round(new Date().getTime()/1000);
  return constitution.methods.getSpawnLimit(ship, timestamp).call();
}

async function canSetManager()
{
  return true;
}

function setManager(manager)
{
  return constitutionTx(constitution.methods.setManager(manager));
}

async function canConfigureKeys(ship)
{
  return await isActiveShipManager(ship);
}

function configureKeys(ship, crypt, auth, suite, discontinuous)
{
  return constitutionTx(
    constitution.methods.configureKeys(ship, crypt, auth, suite, discontinuous)
  );
}

async function canSpawn(ship, target)
{
  let res = { result: false };
  let prefix = getPrefix(ship);
  let preShip = await getShip(prefix);
  // must either be the owner of the prefix, or a spawn proxy for it
  if (!isOwner(preShip) && !isSpawnProxy(preShip))
  {
    res.reason = reasons.permission;
    return res;
  }
  // only currently unowned ships can be spawned
  if (!await isOwner(ship, 0x0))
  {
    res.reason = reasons.spawned;
    return res;
  }
  // only allow spawning of ships of the class directly below the prefix
  if ((getShipClass(prefix)+1) !== getShipClass(ship))
  {
    res.reason = reasons.spawnClass;
    return res;
  }
  // prefix ship must be live and able to spawn
  if (!hasBeenBooted(preShip) ||
      preShip.spawnCount >= await getSpawnLimit(prefix))
  {
    res.reason = reasons.spawnPrefix;
    return res;
  }
  // prevent burning of ships
  if (target === 0 || target === '0' || target === '0x0')
  {
    res.reason = reasons.zero;
    return res;
  }
  res.result = true;
  return res;
}

function spawn(ship, target)
{
  return constitutionTx(constitution.methods.spawn(ship, target));
}

async function canSetSpawnProxy(prefix)
{
  let res = { result: false };
  let preShip = await getShip(prefix);
  // must be the owner of the ship
  if (!await isOwner(preShip))
  {
    res.reason = reasons.permission;
    return res;
  }
  // the ship must be active
  if (!await isActive(preShip))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

function setSpawnProxy(prefix, spawnProxy)
{
  return constitutionTx(constitution.methods.setSpawnProxy(prefix, spawnProxy));
}

async function canTransferShip(ship, target)
{
  let res = { result: false };
  let theShip = await getShip(ship);
  // must be either the owner of the ship,
  // a transfer proxy for the ship,
  // or an operator for the owner
  if (!isOwner(theShip) &&
      !isTransferProxy(theShip) &&
      !await isOperator(theShip.owner))
  {
    res.reason = reasons.permission;
    return res;
  }
  // prevent burning of ships
  if (target === 0 || target === '0' || target === '0x0')
  {
    res.reason = reasons.zero;
    return res;
  }
  res.result = true;
  return res;
}

function transferShip(ship, target, reset)
{
  return constitutionTx(constitution.methods.transferShip(ship, target, reset));
}

async function canSetTransferProxy(ship, proxy)
{
  let res = { result: false };
  let theShip = await getShip(ship);
  // must be either the owner of the ship,
  // or an operator for the owner
  if (!isOwner(theShip) &&
      !await isOperator(theShip.owner))
  {
    res.reason = reasons.permission;
    return res;
  }
  res.result = true;
  return res;
}

function setTransferProxy(ship, transferProxy)
{
  return constitutionTx(
    constitution.methods.setTransferProxy(ship, transferProxy)
  );
}

async function canEscape(ship, sponsor)
{
  let asm = await isActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  let shipClass = getShipClass(ship);
  let sponsorClass = getShipClass(sponsor);
  // can only escape to a ship one class higher than ourselves,
  // except in the special case where the escaping ship hasn't
  // been booted yet -- in that case we may escape to ships of
  // the same class, to support lightweight invitation chains.
  if (sponsorClass+1 !== shipClass &&
      !(sponsorClass === shipClass &&
        !await hasBeenBooted(ship)))
  {
    res.reason = reasons.sponsor;
    return res;
  }
  // can't escape to a sponsor that hasn't been booted
  if (!await hasBeenBooted(sponsor))
  {
    res.reason = reasons.sponsorBoot;
    return res;
  }
  res.result = true;
  return res;
}

function escape(ship, sponsor)
{
  return constitutionTx(constitution.methods.escape(ship, sponsor));
}

async function canCancelEscape(ship)
{
  return await isActiveShipManager(ship);
}

function cancelEscape(ship)
{
  return constitutionTx(constitution.methods.cancelEscape(ship));
}

async function canAdopt(sponsor, escapee)
{
  let asm = await isActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await isRequestingEscapeTo(escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

function adopt(sponsor, escapee)
{
  return constitutionTx(constitution.methods.adopt(sponsor, escapee));
}

async function canReject(sponsor, escapee)
{
  let asm = await isActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  // escapee must currently be trying to escape to sponsor
  if (!await isRequestingEscapeTo(escapee, sponsor))
  {
    res.reason = reasons.notEscape;
    return res;
  }
  res.result = true;
  return res;
}

function reject(sponsor, escapee)
{
  return constitutionTx(constitution.methods.reject(sponsor, escapee));
}

async function canDetach(sponsor, ship)
{
  let asm = await isActiveShipManager(ship);
  if (!asm.result) return asm;
  let res = { result: false };
  // ship must currently be sponsored by sponsor
  if (!await isSponsor(ship, sponsor))
  {
    res.reason = reasons.notSponsor;
    return res;
  }
  res.result = true;
  return res;
}

function detach(sponsor, ship)
{
  return constitutionTx(constitution.methods.detach(sponsor, ship));
}

async function canSetDelegate()
{
  return true;
}

function setDelegate(delegate)
{
  return constitutionTx(constitution.methods.setDelegate(delegate));
}

async function isActiveShipVoter(galaxy, voter)
{
  voter = voter || account;
  let res = { result: false };
  // must either be ship owner, or delegate for the owner
  if (!await canVoteAs(ship, voter))
  {
    res.reason = reasons.permission;
    return res;
  }
  // ship must be active in order to vote
  if (!await isActive(ship))
  {
    res.reason = reasons.inactive;
    return res;
  }
  res.result = true;
  return res;
}

async function canStartConstitutionPoll(galaxy, proposal)
{
  let asv = await isActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  let prop = new web3.eth.Contract(abis.constitution, proposal);
  // ensure that the upgrade target expects the current contract as the source
  if (constitution._address !==
      await prop.methods.previousConstitution().call())
  {
    res.reason = reasons.upgradePath;
    return res;
  }
  // proposal must not have achieved majority before
  if (await constitutionHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // check that the poll has cooled down enough to be started again
  if (!canStartPoll(await getConstitutionPoll(proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

function startConstitutionPoll(galaxy, proposal)
{
  return constitutionTx(
    constitution.methods.startConstitutionPoll(galaxy, proposal)
  );
}

async function canStartDocumentPoll(galaxy)
{
  let asv = await isActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await documentHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // check that the poll has cooled down enough to be started again
  if (!canStartPoll(await getDocumentPoll(proposal)))
  {
    res.reason = reasons.pollTime;
    return res;
  }
  res.result = true;
  return res;
}

function startDocumentPoll(galaxy, proposal)
{
  return constitutionTx(
    constitution.methods.startDocumentPoll(galaxy, proposal)
  );
}

async function canCastConstitutionVote(galaxy, proposal)
{
  let asv = await isActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await constitutionHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await getConstitutionPoll(proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await hasVotedOnConstitutionPoll(galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

function castConstitutionVote(galaxy, proposal, vote)
{
  return constitutionTx(
    constitution.methods.castConstitutionVote(galaxy, proposal, vote)
  );
}

async function canCastDocumentVote(galaxy, proposal)
{
  let asv = await isActiveShipVoter(galaxy);
  if (!asv.result) return asv;
  let res = { result: false };
  // proposal must not have achieved majority before
  if (await documentHasAchievedMajority(proposal))
  {
    res.reason = reasons.majority;
    return res;
  }
  // may only vote when the poll is open
  if (!pollIsActive(await getDocumentPoll(proposal)))
  {
    res.reason = reasons.pollInactive;
    return res;
  }
  // may only vote once
  if (await hasVotedOnDocumentPoll(galaxy, proposal))
  {
    res.reason = reasons.pollVoted;
    return res;
  }
  res.result = true;
  return res;
}

function castDocumentVote(galaxy, proposal, vote)
{
  return constitutionTx(
    constitution.methods.castDocumentVote(galaxy, proposal, vote)
  );
}

function updateConstitutionPoll(proposal)
{
  return constitutionTx(constitution.methods.updateConstitutionPoll(proposal));
}

function updateDocumentPoll(proposal)
{
  return constitutionTx(constitution.methods.updateDocumentPoll(proposa));
}

async function canCreateGalaxy(galaxy, target)
{
  let res = { result: false };
  // only contract owner may do this
  if (!await isConstitutionOwner())
  {
    res.reason = reasons.permission;
  }
  // only currently unowned ships can be spawned
  if (!await isOwner(galaxy, 0x0))
  {
    res.reason = reasons.spawned;
  }
  // prevent burning of ships
  if (target === 0 || target === '0' || target === '0x0')
  {
    res.reason = reasons.zero;
    return res;
  }
}

function createGalaxy(galaxy, target)
{
  return constitutionTx(constitution.methods.createGalaxy(galaxy, target));
}

function canSetDnsDomains()
{
  return isConstitutionOwner();
}

function setDnsDomains(primary, secondary, tertiary)
{
  return constitutionTx(
    constitution.methods.setDnsDomains(primary, secondary, tertiary)
  );
}

// polls

function getConstitutionPoll(proposal)
{
  return polls.constitutionPolls(proposal).call();
}

function getDocumentPoll(proposal)
{
  return polls.documentPolls(proposal).call();
}

function constitutionHasAchievedMajority(proposal)
{
  return polls.constitutionHasAchievedMajority(proposal).call();
}

function documentHasAchievedMajority(proposal)
{
  return polls.documentHasAchievedMajority(proposal).call();
}

function canStartPoll(poll)
{
  let now = Math.round(new Date().getTime()/1000);
  return (now > (poll.start + poll.duration + poll.cooldown));
}

function hasVotedOnConstitutionPoll(galaxy, proposal)
{
  return polls.hasVotedOnConstitutionPoll(galaxy, proposal).call();
}

function hasVotedOnDocumentPoll(galaxy, proposal)
{
  return polls.hasVotedOnDocumentPoll(galaxy, proposal).call();
}

function pollIsActive(poll)
{
  let now = Math.round(new Date().getTime()/1000);
  return (now < (poll.start + poll.duration));
}

//TODO pool

////

//TODO validation functions for ship classes, addresses, bytes32
//TODO maybe shipname conversion? that should probably be a separate lib though

// configure default server url
setServerUrl('http://localhost:8545');

module.exports = {
  config: {
    setServerUrl,
    setOffline,
    setPrivateKey,
    setHdAccount,
    setGanacheAccount,
    initializeContracts,
    initializeContractsDefault,
    setPool
  },
  transact: {
    signTransaction,
    doTheThing,
    sendTransaction
  },
  ships: {
    getShip,
    getOwnedShips,
    getManagingFor,
    getTransferringFor,
    getSpawningFor,
    getVotingFor,
    isOwner,
    isActive
  },
  constitution: {
    setManager,
    canConfigureKeys,
    configureKeys,
  }
}
