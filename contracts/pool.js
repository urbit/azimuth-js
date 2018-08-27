let p; // pool contract

const s = require('./ships');

const utils = require('../utils');

const reasons = require('../resources/reasons.json');

let account; // assumed caller address
let oneStar; // constant

function setContract(pool)
{
  p = pool;
  oneStar = undefined;
}

function setAccount(a)
{
  account = a;
}

//
// getters, return promises
//

async function getOneStar()
{
  if (oneStar) return oneStar;
  oneStar = await p.methods.oneStar().call();
  return oneStar;
}

function getBalance(address)
{
  address = address || account;
  return p.methods.balances(address).call();
}

function getAllAssets()
{
  return p.methods.getAllAssets().call();
}

function getAssetCount()
{
  return p.methods.getAssetCount().call();
}

//
// checks, return promises of result objects
//

async function canDeposit(star)
{
  let ship = await s.getShip(star);
  //
  let case1 = { result: false };
  let c1 = 0;
  if (!s.isOwner(ship))
  {
    case1.reason = reasons.permission;
    c1 = 1;
  }
  else if (s.hasBeenBooted(ship))
  {
    case1.reason = reasons.poolBoot;
    c1 = 2;
  }
  else if (!s.isTransferProxy(ship, p._address))
  {
    case1.reason = reasons.contractCant;
    c1 = 3;
  }
  else
  {
    case1.result = true;
  }
  if (case1.result) return case1;
  //
  let case2 = { result: false };
  let c2 = 0;
  let prefix = utils.getPrefix(star);
  if (!s.isOwner(prefix))
  {
    case2.reason = reasons.permission;
    c2 = 1;
  }
  else if (s.isActive(ship))
  {
    case2.reason = reasons.poolActive;
    c2 = 2;
  }
  else if (s.isSpawnProxy(ship, p._address))
  {
    case2.reason = reasons.contractCant;
    c2 = 3;
  }
  else
  {
    case2.result = true;
  }
  if (case2.result) return case2;
  //
  // give the error for the case that is closest to being possible,
  // or case 1 if they're equally close
  if (c2 > c1) return case2;
  return case1;
}

function deposit(star)
{
  return protoTx(p.methods.deposit(star));
}

async function canWithdrawAny()
{
  let res = { result: false };
  if (0 == await getAssetCount())
  {
    res.reason = reasons.notInPool;
    return res;
  }
  if (await getOneStar() > await getBalance())
  {
    res.reason = reasons.balance;
    return res;
  }
  res.result = true;
  return res;
}

function withdrawAny()
{
  return protoTx(p.methods.withdrawAny());
}

async function canWithdraw(star)
{
  let res = { result: false };
  if (0 == await p.methods.assetIndexes(star))
  {
    res.reason = reasons.notInPool;
    return res;
  }
  if (await getOneStar() > await getBalance())
  {
    res.reason = reasons.balance;
    return res;
  }
  res.result = true;
  return res;
}

function withdraw(star)
{
  return protoTx(p.methods.withdraw(star));
}

//
// misc internal utility
//

function protoTx(encodedABI, value)
{
  return utils.protoTx(account, p._address, encodedABI, value);
}

module.exports = {
  setContract,
  setAccount,
  //
  getOneStar,
  getBalance,
  getAllAssets,
  getAssetCount,
  //
  canDeposit,
  canWithdrawAny,
  canWithdraw
}
