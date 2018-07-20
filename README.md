# Urbit Constitution-JS



## Install

#### `npm install urbit-constitution-client --save`



## Test

#### `npm test`



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



## Validation and Formatting Functions


#### `toAddress(shipName)`
Converts an Urbit ship name to its address


#### `toShipName(shipAddress)`
Converts an Urbit address to its ship name


#### `valGalaxy(galaxyAddress)`
Validates an Urbit galaxy address


#### `valStar(starAddress)`
Validates an Urbit star address


#### `valShip(shipAddress)`
Validates an Urbit ship address


#### `valAddress(ethAddress)`
Validates an Ether address


#### `formatShipName(shipName)`
Adds a tilde to a valid Urbit ship name


#### `getSpawnCandidate(shipAddress)`
Returns the address of a random spawn candidate from the Urbit ship `address`. This call does NOT guarantee availability of the returned address.



## Read Functions

Read Urbit ship data stored on the blockchain


#### `buildOwnedShips(ethAddress, callback)`
Returns an object loaded with the ships owned by `ethAddress`


#### `getConstitutionOwner(callback)`
Returns the Ether address of the owner of the Urbit constitution


#### `readShipData(shipAddress, callback)`
Returns `hasBeenBooted` bool for ship with `shipAddress`


#### `readHasOwner(shipAddress, callback)`
Returns a bool for whether ship with `shipAddress` has an owner


#### `readIsOwner(shipAddress, ethAddress, callback)`
Returns `true` if `ethAddress` owns the ship at `shipAddress`


#### `readPoolAssets(poolAddress, callback)`
Returns the total Spark assets of the pool at `poolAddress`


#### `readBalance(poolAddress, callback)`
Returns the balance of Spark assets in the pool at `poolAddress` held by the given wallet 


#### `readParent(shipAddress, callback)`
Returns the parent ship address of `shipAddress`


#### `readOwnedShips(ethAddress, callback)`
Returns the list of ships owned by `ethAddress`


#### `readIsRequestingEscapeTo(shipAddress, sponsorAddress, callback)`
Returns a bool for whether `shipAddress` is currently requesting an escape to `sponsorAddress`


#### `readKeys(shipAddress, callback)`
Returns the keys for ship at `shipAddress`


#### `readIsSpawnProxy(shipAddress, ethAddress, callback)`
Returns a bool for whether `ethAddress` is the spawn proxy of `shipAddress`



## Transaction Functions

The callback in each of these functions returns an object in this format:
```
{ 
  error: false,
  rawTx: 
    '{
  	  "nonce":"0x14",
  	  "gasPrice":"0x04e3b29200",
  	  "gasLimit":"0x0446c6",
  	  "to":"0x098b6cb45da68c31c751d9df211cbe3056c356d1",
  	  "value":"0x00",
  	  "data":"0xa0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d",
  	  "chainId":1
    }',
  signedTx: '0xf8aa148504e3b29200830446c694098b6cb45da68c31c751d9df211cbe3056c356d180b844a0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a0f216335c74c4e7151feaa1afb83bf5d08cfc72eab336268e5edd4ffae6ca3f55a068ffbb95cd3eb20b2aaf83960df96e1ff6ff3ddce2d68ca4fd762de8fcd350cd',
  showRaw: true 
}
```



#### `doCreateGalaxy(galaxy, callback)`
Create `galaxy`


#### `doDeposit(star, poolAddress, callback)`
Deposit `star` into the pool at `poolAddress`


#### `doWithdraw(star, poolAddress, callback)`
Withdraw `star` from the pool at `poolAddress`


#### `doSpawn(shipAddress, callback)`
Spawn ship `shipAddress`


#### `doSetSpawnProxy(shipAddress, ethAddress, callback)`
Set `ethAddress` as the spawn proxy of `shipAddress`


#### `doConfigureKeys(shipAddress, encryptionKey, authenticationKey, discontinuous, callback)`
Set `encryptionKey` and `authenticationKey` as the keys for `shipAddress`. bool `discontinuous` optionally increments the continuity number of `shipAddress`


#### `doTransferShip(shipAddress, ethAddress, reset, callback)`
Transfer `shipAddress` to `ethAddress`. bool `reset` optionally clears the keys and breaks continuity


#### `doSetTransferProxy(shipAddress, ethAddress, callback)`
Set `ethAddress` as the transfer proxy for `shipAddress`


#### `doEscape(shipAddress, sponsorAddress, callback)`
Escape `shipAddress` to `sponsorAddress`


#### `doAdopt(sponsorAddress, escapeeAddress, callback)`
`sponsorAddress` adopts `escapeeAddress`


#### `doReject(sponsorAddress, escapeeAddress, callback)`
`sponsorAddress` rejects `escapeeAddress`


#### `doApprove(ethAddress, shipAddress, callback)`
Approve `ethAddress` to transfer `shipAddress`


#### `doSafeTransferFrom(fromEthAddress, toEthAddress, shipAddress, callback)`
Conduct a safe transfer of `shipAddress` from `fromEthAddress` to `toEthAddress`


#### `doCastConstitutionVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on constitution proposal at `prop`


#### `doCastDocumentVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on document proposal at `prop`




## Send signed transactions

#### `sendTx(signedTx, callback)`
Submit `signedTx` to the blockchain. The object returned in the callback is in this format:
```
{ 
  error: false,
  data: 
    {
      resp: '0x5b32667f0ce0032007dba91c1011942a3140f826c69a6c689632caa91321c7b0',
   	  tx: 
        { 
      	  gasLimit: '',
          data: '',
          to: '',
          unit: 'ether',
          value: 0,
          nonce: null,
          gasPrice: null 
    	} 
    } 
}
```




## Command Line Example

### Get a random spawn candidate for a ship you own and then spawn it 

#### 1. Call `getSpawnCandidate` passing in the Urbit address of a ship you own 
```
node -pe 'require("./index").getSpawnCandidate(256)'
```

Note that because this function doesn't use a callback this command uses the `-pe` flag in order to print the returned value. Most of the functions have callbacks, so their commands use the `-e` flag and `console.log` as the final parameter
#### Returned value
`791085312`

This function is a random number generator, so returned values will vary



#### 2. Call `doSpawn` with the returned spawn candidate address
`node -e 'require("./index").doSpawn(791085312,console.log)'`
#### Returned object
```
{ 
  error: false,
  rawTx: 
    '{
  	  "nonce":"0x14",
  	  "gasPrice":"0x04e3b29200",
  	  "gasLimit":"0x0446c6",
  	  "to":"0x098b6cb45da68c31c751d9df211cbe3056c356d1",
  	  "value":"0x00",
  	  "data":"0xa0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d",
  	  "chainId":1
    }',
  signedTx: '0xf8aa148504e3b29200830446c694098b6cb45da68c31c751d9df211cbe3056c356d180b844a0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a0f216335c74c4e7151feaa1afb83bf5d08cfc72eab336268e5edd4ffae6ca3f55a068ffbb95cd3eb20b2aaf83960df96e1ff6ff3ddce2d68ca4fd762de8fcd350cd',
  showRaw: true 
}
```


#### 3. Call `sendTx` with the `signedTx` value from the returned object
```
node -e 'require("./index").sendTx("0xf8aa148504e3b29200830446c694098b6cb45da68c31c751d9df211cbe3056c356d180b844a0d3253f000000000000000000000000000000000000000000000000000000002f2701000000000000000000000000006deffb0cafdb11d175f123f6891aa64f01c24f7d25a0f216335c74c4e7151feaa1afb83bf5d08cfc72eab336268e5edd4ffae6ca3f55a068ffbb95cd3eb20b2aaf83960df96e1ff6ff3ddce2d68ca4fd762de8fcd350cd",console.log)'
```
#### Returned object
```
{ 
  error: false,
  data: 
    {
      resp: '0x5b32667f0ce0032007dba91c1011942a3140f826c69a6c689632caa91321c7b0',
   	  tx: 
        { 
      	  gasLimit: '',
          data: '',
          to: '',
          unit: 'ether',
          value: 0,
          nonce: null,
          gasPrice: null 
    	} 
    } 
}
```


#### 4. Call `buildOwnedShips` to see your newly spawned ship
```
node -e 'require("./index").buildOwnedShips("0x6deffb0cafdb11d175f123f6891aa64f01c24f7d",console.log)'
```
#### Returned object
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
