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

//NOTE for testing with the readme mnemonic only
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

async function initializeContracts(shipsAddress,
                                   constitutionAddress,
                                   pollsAddress)
{
  let s = new web3.eth.Contract(abis.ships, shipsAddress);
  if (!constitutionAddress)
  {
    constitutionAddress = await s.methods.owner().call();
  }
  let c = new web3.eth.Contract(abis.constitution, constitutionAddress);
  if (!pollsAddress)
  {
    pollsAddress = await c.methods.polls().call();
  }
  let p = new web3.eth.Contract(abis.polls, pollsAddress);
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
  if (!tx.gas)
  {
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

// configure default server url
setServerUrl('http://localhost:8545');

module.exports = {
  config: {
    setServerUrl,
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
    sendTransaction
  },
  ships,
  constitution,
  polls,
  pool,
  utils
}
