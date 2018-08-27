# Urbit Constitution-JS


## Install

`npm install constitution-js --save`


## Usage

Some library functions are asynchronous, returning a `Promise` object rather
than a direct result.  
Functions that use Web3 may throw. The thrown object will always contain at
least `name` and `message` properties. Tread carefully when using Web3 while
offline.  
Contract action checks (`canXYZ()`) return result objects in the form of
`{ result: bool, reason: string }`, where `reason` is only set when `result` is
`false`. These can't resolve when offline.

The library is split up into sections:
[`config`](docs/config.md),
[`transact`](docs/transact.md),
[`ships`](docs/ships.md),
[`constitution`](docs/constitution.md),
`polls`,
[`pool`](docs/pool.md),
[`utils`](docs/utils.md).  
Generally, you'll use `config` to set up, then getters from `ships` to display
current state, `utils` to verify input sanity, checks and actions in
`constitution` to validate and generate transactions, and `transact` to sign
and send the transactions.

As a client implementation, you'll most likely be using:

* `config.`:
  * `setServerUrl(url)`, to connect to an Ethereum node,
  * `setPrivateKey(hd, path, index)`, to set the user's account,
  * `initializeContractsDefault()`, to load in the contract addresses,
  * `setPool(poolAddress)`, to configure a pool address
* `ships.`:
  * `getOwnedShips()`, to get the ships owned by the account,
  * `getShip(ship)`, to get the on-chain state of a ship
* `utils`, to verify user input sanity,
* `constitution.` / `pool.`:
  * `canFunction()`, to verify if the account can perform `function()` on-chain,
  * `function()`, to generate a transaction for doing `function()` on-chain
* `transact.`:
  * `signTransaction(tx)`, to sign a generated transaction,
  * `sendTransaction(signedTx)`, to send a transaction


## Development

### Local testnet

In order to test the functionality of the Wallet, you'll need a testnet running the
Urbit constitution.
1. Clone [the constitution](https://github.com/urbit/constitution)
2. `cd` into the repo and `npm install`
3. `npm install -g ganache-cli`
3. Run a local `ganache` node, boot using the following command to ensure a matching seed:  
   `ganache-cli -m "benefit crew supreme gesture quantum web media hazard theory mercy wing kitten"`
4. Run `truffle deploy` from the constitution's directory to deploy to your local node.

### Useful addresses
Constitution owner (is allowed to create galaxies):
`0x6deffb0cafdb11d175f123f6891aa64f01c24f7d`

Test pool:
`0xb71c0b6cee1bcae56dfe95cd9d3e41ddd7eafc43`

## Test

`npm test`

Make sure a local testnet node is running prior to starting the tests.





## Examples

#### 1. Call `setServerUrl` with the URL of your node. Then call `setPrivateKey` with the HDKey and path of your account and the index of the address you want to use.
```
var bip39 = require('bip39');
var hdkey = require('hdkey');
var constitution = require('constitution-js');

constitution.setServerUrl('http://localhost:8545');

var mnemonic = 'benefit crew supreme gesture quantum web media hazard theory mercy wing kitten';
var masterKey = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
var path = "m/44'/60'/0'/0";
var idx = 0;

constitution.setPrivateKey(masterKey, path, idx, function(res) {
  if (!res.error) {
    console.log(res);
  }
});
```
#### Logged object
```
{
  error: false,
  data: 0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d
}
```

#### 2. Call `getSpawnCandidate` passing in the Urbit address of a ship you own
```
var spawnCandidate = constitution.getSpawnCandidate(256)
console.log(spawnCandidate);
```
#### Logged value
`791085312`

This function is a random number generator, so returned values will vary



#### 3. Call `readSponsor`
```
constitution.readSponsor(256, function(res) {
  if (!res.error) {
    console.log(res);
  }
});
```
#### Logged value
```
{
  error: false,
  data: 0
}
```


#### 4. Call `readOwnedShipsStatus`
```
constitution.readOwnedShipsStatus('0x6deffb0cafdb11d175f123f6891aa64f01c24f7d', function(res) {
  if (!res.error) {
    console.log(res);
  }
});
```
#### Logged object
```
{
  error: false,
  data:
    {
      '0': { name: '~zod', address: 0, hasBeenBooted: true },
      '1': { name: '~nec', address: 1, hasBeenBooted: false },
      '22': { name: '~lup', address: 22, hasBeenBooted: false },
      '256': { name: '~marzod', address: 256, hasBeenBooted: true },
      '512': { name: '~binzod', address: 512, hasBeenBooted: false },
      '65792': { name: '~wicdev-wisryt', address: 65792, hasBeenBooted: false },
      '131328': { name: '~panret-tocsel', address: 131328, hasBeenBooted: false },
      '791085312': { name: '~fadnyd-worsef', address: 791085312, hasBeenBooted: false }
    }
}
```
