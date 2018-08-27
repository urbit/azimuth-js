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
