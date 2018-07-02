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


#### `buildOwnedShips(ethAddress, ajaxReq, callback)`
Returns an object loaded with the ships owned by `address`


#### `getSpawnCandidate(address)`
Returns a random child ship from the Urbit ship `address`


#### `getConstitutionOwner(ajaxReq, callback)`
Returns the Ether address of the owner of the Urbit constitution


#### `readShipData(ship, ajaxReq, callback)`
Returns `hasBeenBooted` bool for `ship`


#### `readHasOwner(ship, ajaxReq, callback)`
Returns a bool for whether `ship` has an owner


#### `readIsOwner(ship, child, ajaxReq, callback)`
Returns a bool for whether `ship` owns `child`


#### `readPoolAssets(poolAddress, ajaxReq, callback)`
Returns the total Spark assets of the pool at `poolAddress`


#### `readBalance(poolAddress, ajaxReq, wallet, callback)`
Returns the balance of Spark assets in the pool at `poolAddress` held by the given wallet 


#### `readParent(ship, ajaxReq, callback)`
Returns the parent ship address of `ship`


#### `readOwnedShips(ethAddress, ajaxReq, callback)`
Returns the list of ships owned by `ethAddress`


#### `readIsRequestingEscapeTo(ship, sponsor, ajaxReq, callback)`
Returns a bool for whether `ship` is currently requesting an escape to `sponsor`


#### `readKeys(ship, ajaxReq, callback)`
Returns the keys for `ship`


#### `readIsSpawnProxy(ship, ethAddress, ajaxReq, callback)`
Returns a bool for whether `ethAddress` is the spawn proxy of `ship`


## Create blockchain transactions

Each of the `do` functions returns a signed transaction


#### `doCreateGalaxy(galaxy, wallet, ajaxReq, callback)`
Create `galaxy`


#### `doDeposit(star, poolAddress, wallet, ajaxReq, callback)`
Deposit `star` into the pool


#### `doWithdraw(star, poolAddress, wallet, ajaxReq, callback)`
Withdraw `star` from the pool


#### `doSpawn(ship, wallet, ajaxReq, callback)`
Spawn `ship`


#### `doSetSpawnProxy(ship, ethAddress, wallet, ajaxReq, callback)`
Set `ethAddress` as the spawn proxy of `ship`


#### `doConfigureKeys(ship, encryptionKey, authenticationKey, discontinuous, wallet, ajaxReq, callback)`
Set `encryptionKey` and `authenticationKey` as the keys for `ship`. bool `discontinuous` optionally increments the continuity number of `ship`


#### `doTransferShip(ship, ethAddress, reset, wallet, ajaxReq, callback)`
Transfer `ship` to `ethAddress`. bool `reset` optionally clears the keys and breaks continuity


#### `doSetTransferProxy(ship, ethAddress, wallet, ajaxReq, callback)`
Set `ethAddress` as the transfer proxy for `ship`


#### `doEscape(ship, sponsor, wallet, ajaxReq, callback)`
Escape `ship` to `sponsor`


#### `doAdopt(sponsor, escapee, wallet, ajaxReq, callback)`
`sponsor` accepts `escapee`


#### `doReject(sponsor, escapee, wallet, ajaxReq, callback)`
`sponsor` rejects `escapee`


#### `doApprove(ethAddress, ship, wallet, ajaxReq, callback)`
Approve `ethAddress` to transfer `ship`


#### `doSafeTransferFrom(fromAddress, toAddress, ship, wallet, ajaxReq, callback)`
Conduct a safe transfer of `ship` from `fromAddress` to `toAddress`


#### `doCastConstitutionVote(galaxy, prop, vote, wallet, ajaxReq, callback)`
Cast `vote` from `galaxy` on constitution proposal at `prop`


#### `doCastDocumentVote(galaxy, prop, vote, wallet, ajaxReq, callback)`
Cast `vote` from `galaxy` on document proposal at `prop`

#### `sendTx(signedTx, ajaxReq, callback)`
Submit `signedTx` to the blockchain


Find out more: https://urbit.org  