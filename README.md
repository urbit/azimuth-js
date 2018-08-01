# Urbit Constitution-JS



## Install

`npm install constitution-js --save`



## Test

`npm test`



## Development

### Testnet
In order to test the functionality of the Wallet, you'll need a testnet running the 
Urbit constitution.
1. Clone [the constitution](https://github.com/urbit/constitution)
2. `cd` into the repo and `npm install`
3. `npm install -g ganache-cli`
3. Run a local `ganache` node, boot using the following command to ensure a matching seed:  
   `ganache-cli -m "benefit crew supreme gesture quantum web media hazard theory mercy wing kitten"`
4. Run `truffle deploy` from the constitution's directory to deploy to your local node.

### Useful addresses
Constitution owner (is allowed to create galaxies): `0x6deffb0cafdb11d175f123f6891aa64f01c24f7d`

Test pool: `0x0724ee9912836c2563eee031a739dda6dd775333`



## Important things to know

There are three categories of Urbit ships: galaxies, stars, and planets. Galaxies spawn stars. Stars spawn planets.

Each Urbit ship has a unique integer address. Galaxy addresses are numbered 0 - 255 (2^8). Star addresses are numbered 256 - 65,535 (2^16). Planet addresses are numbered 65,536 - 4,294,967,295 (2^32).

Each Urbit ship also has a unique human-readable name that's determined from its address.



## Functions


### Config

`setServerUrl(serverURL)`

Set the URL `serverURL` for web3


`setPrivateKey(hd, path, index, callback)`

Set the HDKey `hd`, path `path`, and index `index` of the address to use. Callback returns the address at `index`.


`setDefaultAccountWithPathAndIndex(path, index, callback)`

Set the path `path` and index `index` of the address to use. Call this after calling `setPrivateKey()` if you want to switch to a different address from the one originally specified. Callback returns the address at `index`.


`setPoolAddress(poolAddress)`

Set the ETH address of the pool `poolAddress` to use. (Optional, defaults to standard pool)


### Validation and Formatting

`valGalaxy(galaxyAddress)`

Validates Urbit galaxy address `galaxyAddress`


`valStar(starAddress)`

Validates Urbit star address `starAddress`


`valShip(shipAddress)`

Validates Urbit ship address `shipAddress`


`valAddress(ethAddress)`

Validates Ether address `ethAddress`


`formatShipName(shipName)`

Adds a tilde to a valid Urbit ship name `shipName`


`toAddress(shipName)`

Converts an Urbit ship name `shipName` to its Urbit ship address


`toShipName(shipAddress)`

Converts an Urbit ship address `shipAddress` to its ship name


`getSpawnCandidate(shipAddress)`

Returns the address of a random spawn candidate from the Urbit ship `shipAddress`. This call does NOT guarantee availability of the returned address.



### Read 

Read Urbit ship data stored on the blockchain


`readShipData(shipAddress, callback)`

Returns `hasBeenBooted` bool for ship `shipAddress`


`readOwnedShips(ethAddress, callback)`

Returns an object loaded with the ships owned by the account `ethAddress`


`readOwnedShipsStatus(ethAddress, callback)`

Returns an object loaded with the ships owned by `ethAddress` including their `name` and `hasBeenBooted` status


`readTransferringFor(ethAddress, callback)`

Returns an object loaded with the pending transfer ships by the account `ethAddress`


`readHasOwner(shipAddress, callback)`

Returns a bool for whether ship `shipAddress` has an owner


`readIsOwner(shipAddress, ethAddress, callback)`

Returns `true` if `ethAddress` owns the ship `shipAddress`


`readSponsor(shipAddress, callback)`

Returns the address of the sponsor of ship `shipAddress`


`readPoolAssets(poolAddress, callback)`

Returns the total Spark assets of the pool `poolAddress`


`readBalance(poolAddress, callback)`

Returns the balance of Spark assets in the pool `poolAddress` held by the given wallet 


`readIsRequestingEscapeTo(shipAddress, sponsorAddress, callback)`

Returns a bool for whether ship `shipAddress` is currently requesting an escape to ship `sponsorAddress`


`readKeys(shipAddress, callback)`

Returns the keys for ship `shipAddress`


`readIsSpawnProxy(shipAddress, ethAddress, callback)`

Returns a bool for whether the account `ethAddress` is the spawn proxy of the ship`shipAddress`



### Transactions

The callback in each of these functions returns an object in this format:
```
{ 
  error: false,
  signedTx: '0xf8b0138504a817c80083038af494098b6cb45da68c31c751d9df211cbe3056c356d180b84426295b5200000000000000000000000000000000000000000000000000000000000000d70000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d8602c9e6a44eb5a0a6a65a5455e0e5377685be404840eaf917bb5aaeeaf95603e48a7b4498c0d5b0a00ee33788ab4d08e87759f34ea7fb72c2031e9033a63bfcb6ed77a92e1d298c5e',
  rawTx: 
    { 
      from: '0x6deffb0cafdb11d175f123f6891aa64f01c24f7d',
      to: '0x098b6cb45da68c31c751d9df211cbe3056c356d1',
      value: '0x0',
      data: '0x26295b5200000000000000000000000000000000000000000000000000000000000000d70000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d',
      gas: '0x38af4',
      chainId: '0x164f3522749',
      gasPrice: '0x4a817c800',
      nonce: '0x13' 
   } 
}
```



`doCreateGalaxy(galaxy, ethAddress, callback)`

Create galaxy `galaxy` and give it to address `ethAddress`


`doDeposit(star, poolAddress, callback)`

Deposit ship `star` into the pool at `poolAddress`


`doWithdraw(star, poolAddress, callback)`

Withdraw `star` from the pool at `poolAddress`


`doSpawn(shipAddress, ethAddress, callback)`

Spawn ship `shipAddress` and give it to address `ethAddress`


`doSetSpawnProxy(shipAddress, ethAddress, callback)`

Set `ethAddress` as the spawn proxy of `shipAddress`


`doConfigureKeys(shipAddress, encryptionKey, authenticationKey, cryptoSuiteVersion, discontinuous, callback)`

Set `encryptionKey` and `authenticationKey` as the keys for ship `shipAddress` with corresponding `cryptoSuiteVersion`. bool `discontinuous` optionally increments the continuity number of ship `shipAddress`


`doTransferShip(shipAddress, ethAddress, reset, callback)`

Transfer ship `shipAddress` to address `ethAddress`. bool `reset` optionally clears the keys and breaks continuity


`doSetTransferProxy(shipAddress, ethAddress, callback)`

Set address `ethAddress` as the transfer proxy for ship `shipAddress`


`doEscape(shipAddress, sponsorAddress, callback)`

Escape ship `shipAddress` to ship `sponsorAddress`


`doAdopt(sponsorAddress, escapeeAddress, callback)`

Ship `sponsorAddress` adopts ship `escapeeAddress`


`doReject(sponsorAddress, escapeeAddress, callback)`

Ship `sponsorAddress` rejects ship `escapeeAddress`


`doApprove(ethAddress, shipAddress, callback)`

Approve address `ethAddress` to transfer ship `shipAddress`


`doSafeTransferFrom(fromEthAddress, toEthAddress, shipAddress, callback)`

Conduct a safe transfer of ship `shipAddress` from address `fromEthAddress` to address `toEthAddress`


`doCastConstitutionVote(galaxy, prop, vote, callback)`

Cast bool vote `vote` from galaxy `galaxy` on constitution proposal at address `prop`


`doCastDocumentVote(galaxy, prop, vote, callback)`

Cast bool `vote` from galaxy `galaxy` on document proposal at address `prop`




### Send

`sendTransaction(signedTx, callback)`

Submit `signedTx` to the blockchain. The object returned in the callback is in this format:
```
{ 
  error: false,
  txHash: '0xb6b61dc7e59a39dc141e8971e29f86175ef9e9ba0fc4ea2948351c4aa009a8e1'
}
```




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

constitution.setPrivateKey(masterKey, path, idx,console.log)
```
#### Returned object
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
constitution.readSponsor(256, function(data) {
  if (!data['error']) {
    console.log(data);
  }
});
```
#### Logged value
```
0
```


#### 4. Call `readOwnedShipsStatus` with the address from #1 to see your ships
```
constitution.readOwnedShipsStatus('0x6deffb0cafdb11d175f123f6891aa64f01c24f7d', function(data) {
  if (!data['error']) {
    console.log(data);
  }
});
```
#### Logged object
```
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
```



Find out more: https://urbit.org  
