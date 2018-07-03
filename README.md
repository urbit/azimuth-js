# Urbit Constitution client module

## Validation and Formatting Functions


#### `toAddress(name)`
Returns an int of the ship's Urbit address


#### `valGalaxy(galaxy)`
Returns a bool 


#### `valStar(star)`
Returns a bool


#### `valShip(ship)`
Returns a bool


#### `valAddress(address)`
Returns a bool for an Ether address


#### `formatShipName(ship)`
Adds a tilde to a valid Urbit ship name


#### `toShipName(address)`
Converts an Urbit address to a ship name


## Read from the blockchain


#### `buildOwnedShips(ethAddress, callback)`
Returns an object loaded with the ships owned by `address`


#### `getSpawnCandidate(address)`
Returns a random child ship from the Urbit ship `address`


#### `getConstitutionOwner(callback)`
Returns the Ether address of the owner of the Urbit constitution


#### `readShipData(ship, callback)`
Returns `hasBeenBooted` bool for `ship`


#### `readHasOwner(ship, callback)`
Returns a bool for whether `ship` has an owner


#### `readIsOwner(ship, child, callback)`
Returns a bool for whether `ship` owns `child`


#### `readPoolAssets(poolAddress, callback)`
Returns the total Spark assets of the pool at `poolAddress`


#### `readBalance(poolAddress, callback)`
Returns the balance of Spark assets in the pool at `poolAddress` held by the given wallet 


#### `readParent(ship, callback)`
Returns the parent ship address of `ship`


#### `readOwnedShips(ethAddress, callback)`
Returns the list of ships owned by `ethAddress`


#### `readIsRequestingEscapeTo(ship, sponsor, callback)`
Returns a bool for whether `ship` is currently requesting an escape to `sponsor`


#### `readKeys(ship, callback)`
Returns the keys for `ship`


#### `readIsSpawnProxy(ship, ethAddress, callback)`
Returns a bool for whether `ethAddress` is the spawn proxy of `ship`


## Create blockchain transactions

Each of the `do` functions returns a signed transaction


#### `doCreateGalaxy(galaxy, callback)`
Create `galaxy`


#### `doDeposit(star, poolAddress, callback)`
Deposit `star` into the pool


#### `doWithdraw(star, poolAddress, callback)`
Withdraw `star` from the pool


#### `doSpawn(ship, callback)`
Spawn `ship`


#### `doSetSpawnProxy(ship, ethAddress, callback)`
Set `ethAddress` as the spawn proxy of `ship`


#### `doConfigureKeys(ship, encryptionKey, authenticationKey, discontinuous, callback)`
Set `encryptionKey` and `authenticationKey` as the keys for `ship`. bool `discontinuous` optionally increments the continuity number of `ship`


#### `doTransferShip(ship, ethAddress, reset, callback)`
Transfer `ship` to `ethAddress`. bool `reset` optionally clears the keys and breaks continuity


#### `doSetTransferProxy(ship, ethAddress, callback)`
Set `ethAddress` as the transfer proxy for `ship`


#### `doEscape(ship, sponsor, callback)`
Escape `ship` to `sponsor`


#### `doAdopt(sponsor, escapee, callback)`
`sponsor` accepts `escapee`


#### `doReject(sponsor, escapee, callback)`
`sponsor` rejects `escapee`


#### `doApprove(ethAddress, ship, callback)`
Approve `ethAddress` to transfer `ship`


#### `doSafeTransferFrom(fromAddress, toAddress, ship, callback)`
Conduct a safe transfer of `ship` from `fromAddress` to `toAddress`


#### `doCastConstitutionVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on constitution proposal at `prop`


#### `doCastDocumentVote(galaxy, prop, vote, callback)`
Cast `vote` from `galaxy` on document proposal at `prop`

#### `sendTx(signedTx, callback)`
Submit `signedTx` to the blockchain

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



Find out more: https://urbit.org  
