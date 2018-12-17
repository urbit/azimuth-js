# urbit-constitution-js

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/urbit/constitution-js/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/urbit-constitution-js.svg)](https://www.npmjs.com/package/urbit-constitution-js)

Interact with [Azimuth](https://github.com/urbit/azimuth) from Javascript.

## Install

Just grab from npm like so:

```
npm install urbit-constitution-js
```

## API Reference

[./docs/](./docs/index.md)

## Usage

Require the library via something like:

```javascript
const cjs = require('urbit-constitution-js');
```

In general: use the functions in `cjs.ecliptic`, `cjs.azimuth`, and
`cjs.polls` to interact with the corresponding Ethereum contracts.  Use
`cjs.check` to verify any required state is what you expect it to be.
`cjs.txn` contains functions for signing and sending transactions, and
`cjs.utils` mostly re-exports useful utility functions from
[ethereumjs-util](https://github.com/ethereumjs/ethereumjs-util).

You might want to define something like the following, for convenience:

```javascript
const ecliptic = cjs.ecliptic;
const azimuth = cjs.azimuth;
const check = cjs.check;
const txn = cjs.txn
```

The library exposes a purely-functional API.  This means you'll have to supply
your own state (e.g. web3 instance, contracts instance) whenever dealing with
transactions and contract initialisation.  For example, when running a fresh
local Ganache node with the appropriate mnemonic (see below), this will get you
set up:

```javascript
const Web3 = require('web3');

let provider = new Web3.providers.HttpProvider('http://localhost:8545');
let web3 = new Web3(provider);

let contractAddresses = {
    ecliptic: '0x56db68f29203ff44a803faa2404a44ecbb7a7480',
    azimuth:  '0x863d9c2e5c4c133596cfac29d55255f0d0f86381',
    polls:    '0x935452c45eda2958976a429c9733c40302995efd'
  }

let contracts = cjs.initContracts(web3, contractAddresses);
```

Note that the web3 object is passed to `cjs.initContracts` explicitly.  Aside
from contract initialisation, this is typically only required when sending
transactions (more below).

When interacting with the contract APIs, on the other hand, you'll almost
always have to pass a contracts object explicitly.  For example:

```javascript
// ecliptic owner
const owner = '0x6deffb0cafdb11d175f123f6891aa64f01c24f7d';

const galaxy = 42;

check.canCreateGalaxy(contracts, galaxy, owner);
```

Note that the 'contracts' object initialised previously is passed as the first
argument.  Again, this is almost always the case.

Most of the exposed contracts API consists of functions that, at most, read
from the Ethereum chain state, returning some result in a Promise.  The primary
exceptions are some of the functions in the 'ecliptic' contract; for those
that modify chain state, the function will return a transaction object, e.g.:

```javascript
let tx = ecliptic.createGalaxy(contracts, galaxy, owner);
```

To modify contract state, you'll have to sign ('signTransaction') and send
('sendSignedTransaction') the transaction explicitly.  For example:

```javascript
txn.signTransaction(web3, tx, pk).then(stx =>
  txn.sendSignedTransaction(web3, stx));
```

or, in the body of an `async` function, you can use `await`:

```javascript
let stx = await txn.signTransaction(web3, tx, pk);
txn.sendSignedTransaction(web3, stx);
```

Note again that, when dealing with transactions, a web3 object must be passed
as the first argument.

Many of the functions for the 'azimuth' contract will work when the function is
passed either a point identifier (i.e. an unsigned integer), meaning the
computation will be carried out on-chain, or a point object (i.e. something that
has been retrieved via 'azimuth.getPoint'), meaning the computation will be
carried out purely, simply by reference to the point object.  The result is
wrapped in a Promise, in either case.

Functions that use Web3 may throw. The thrown object will always contain at
least 'name' and 'message' properties. Tread carefully when using Web3 while
offline.

Contract action checks ('canXYZ') return result objects in the form of `{
result: bool, reason: string }`, where 'reason' is only set when 'result' is
'false'.  These can't resolve when offline.

## Development

### Library Structure

The modules found in the `internal` directory are intended to be fairly close
mappings to the public, external, or view functions located in the contracts
themselves.  Mostly these are re-exported via the user-facing API, defined in
`ecliptic.js` and friends.

The one notable exception is in the `azimuth` module, where the behaviour of a
function can often depend on the type of the argument passed to it.  If one
passes them a cached `point` object (retrieved via `getPoint`), then these
functions will compute their values locally; if one supplies them with a point
number (i.e., an integer), they will instead hit the network.

## Testing

Use a simple:

`npm test`

to run the tests on a one-off local Ganache node.

### Local Testnet

For debugging and custom testing, you'll need a local testnet running Azimuth.

1. Clone [Azimuth](https://github.com/urbit/azimuth)
2. `cd` into the repo and `npm install`
3. `npm install -g ganache-cli`
3. Run a local `ganache` node, boot using the following command to ensure a matching seed:
   `ganache-cli -m "benefit crew supreme gesture quantum web media hazard theory mercy wing kitten"`
4. Run `truffle deploy` from the ecliptic's directory to deploy to your local node.

### Useful addresses

Ecliptic owner (is allowed to create galaxies):
`0x6deffb0cafdb11d175f123f6891aa64f01c24f7d`

