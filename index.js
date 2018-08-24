'use strict';

// usage:
//TODO initialize contracts, set account

//NOTE
// for granular promise usage with transactions, see example:
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id12

const Web3 = require('web3');
const abis = require('./resources/abis.json');

let ships = require('./contracts/ships');
let constitution = require('./contracts/constitution');
let polls = require('./contracts/polls');
let pool = require('./contracts/pool');

let utils = require('./utils');

//
// script variables
//

// web3: the web3 object we'll be working with.
let web3;

//TODO maybe remove, only relevant in 2 functions, and caller should know
//     if they're offline and what extra data to provide in that case.
let offline = false;

// hd wallet master node
let hdNode;

// private key for the used account
//TODO can't we contain this in web3 somehow?
let privateKey;

// ethereum address that will perform transactions
// set alongside hdNode (setHdAccount), or individually (setPublicAccount)
let account;

//
// configure
//

function setServerUrl(url)
{
  web3 = new Web3(new Web3.providers.HttpProvider(url));
  constitution.setWeb3(web3);
}

function setOffline(offl)
{
  offline = offl;
}

//TODO these two are a bit weird. can they not be collapsed into just the logic
//     from setHdAccount?
//TODO should they use ethUtils.isValidPrivate to sanity-check?
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

function setRawPrivateKey(pk)
{
  privateKey = pk;
}

function setGanacheAccount()
{
  privateKey = 'a44de2416ee6beb2f323fab48b432925c9785808d33a6ca6d7ba00b45e9370c3';
  setPublicAccount('0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d');
}

function setPublicAccount(address)
{
  if (!utils.isAddress(address))
  {
    throw {
      name: 'AccountError',
      message: 'Invalid account address: '+address
    };
  }
  web3.eth.defaultAccount = address;
  account = address;
  ships.setAccount(address);
  constitution.setAccount(address);
  pool.setAccount(address);
}

//NOTE verified functioning pattern, throws in the awaits just get thrown up
async function initializeContracts(shipsAddress, offlineConstitution, offlinePolls)
{
  let s = new web3.eth.Contract(abis.ships, shipsAddress);
  let c, p;
  if (!offline)
  {
    let constitutionAddress = await s.methods.owner().call();
    c = new web3.eth.Contract(abis.constitution, constitutionAddress);
    let pollsAddress = await c.methods.polls().call();
    p = new web3.eth.Contract(abis.polls, pollsAddress);
  } else {
    c = new web3.eth.Contract(abis.constitution, offlineConstitution);
    p = new web3.eth.Contract(abis.polls, offlinePolls);
  }
  //
  ships.setContract(s);
  polls.setContract(p);
  constitution.setContract(c);
}

function initializeContractsDefault()
{
  //TODO update with real address once deployed
  return initializeContracts('0x863d9c2e5c4c133596cfac29d55255f0d0f86381');
}

function setPool(poolAddress)
{
  pool.setContract(new web3.eth.Contract(abis.pool, poolAddress));
}

//
// transactions
//

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
        name: 'TransactionError',
        message: 'Need transaction gas limit.'
      };
    }
    //NOTE you always want to at least +1 because exactly the required gas
    //     causes a revert
    //NOTE we do *2.1 though because in some cases that's the true amount of
    //     gas you need. setManager is the worst offender for some reason
    //TODO do we want to catch gas estimation errors and throw a custom error?
    tx.gas = Math.floor((await web3.eth.estimateGas(tx)) * 2.1);
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
    setRawPrivateKey,
    setPublicAccount,
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
  ships,
  constitution,
  polls,
  pool,
  utils
}
