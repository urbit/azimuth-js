# `constitution`

The `constitution` contains only a single getter. All other functions match
with the Constitution contract's interface.

For every function in the Constitution, we provide a check (`canDoThing()`) and
an action (`doThing()`) function. They take the same arguments, though the
checks don't always use all of them.

The checks return a result object (with a `result` bool, and if that's false,
a `reason` string). The transaction functions return unsigned transaction
objects.

## Getters

#### `async getSpawnLimit(ship, timestamp)`

If no timestamp is provided, the current time is used.

Returns the number of children `ship` is allowed to have spawned at `timestamp`.

## Checks and actions

#### `async canSetManager()`

Returns a true result if the account can set a manager for itself.

#### `setManager(manager)`

Returns a transaction for setting `manager` as the account's manager.

#### `async canConfigureKeys(ship)`

Returns a true result if the account can configure public keys for `ship`.

#### `configureKeys(ship, crypt, auth, suite, discontinuous)`

Returns a transaction for setting public keys for `ship`.

#### `async canSpawn(ship, target)`

Returns a true result if the account can spawn `ship` to the `target` address.

#### `spawn(ship, target)`

Returns a transaction for spawning `ship` to the `target` address.

#### `async canSetSpawnProxy(prefix)`

Returns a true result if the account can set a spawn proxy for the `prefix` ship.

#### `setSpawnProxy(prefix, spawnProxy)`

Returns a transaction for setting the `prefix` ship's spawn proxy to `spawnProxy`.

#### `async canTransferShip(ship, target)`

Returns a true result if the account can transfer `ship` to the `target` address.

#### `transferShip(ship, target)`

Returns a transaction for transferring `ship` to the `target` address.

#### `async canSetTransferProxy(ship)`

Returns a true result if the account can set a transfer proxy for the `ship`.

#### `setTransferProxy(ship, transferProxy)`

Returns a transaction for setting the `ship`'s transfer proxy to `transferProxy`.

#### `async canEscape(ship, sponsor)`

Returns a true result if the account can make the `ship` escape to `sponsor`.

#### `escape(ship, sponsor)`

Returns a transaction for making the `ship` request escape to `sponsor`.

#### `async canCancelEscape(ship)`

Returns a true result if the account can cancel `ship`'s current escape.

#### `cancelEscape(ship)`

Returns a transaction for cancelling `ship`'s current escape.

#### `async canAdopt(sponsor, escapee)`

Returns a true result if the account can adopt the `escapee` as its new `sponsor`.

#### `adopt(sponsor, escapee)`

Returns a transaction for adopting the `escapee` as its new `sponsor`.

#### `async canReject(sponsor, escapee)`

Returns a true result if the account can reject the `escapee` as its requested
`sponsor`.

#### `reject(sponsor, escapee)`

Returns a transaction for rejecting the `escapee` as its requested `sponsor`.

#### `async canDetach(sponsor, ship)`

Returns a true result if the account can detach the `ship` as its current
`sponsor`.

#### `detach(sponsor, ship)`

Returns a transaction for detaching the `ship` from its current `sponsor`.

#### `async canSetDelegate()`

Returns a true result if the account can set a delegate for itself.

#### `setDeletage(delegate)`

Returns a transaction for setting `delegate` as the accounts delegate.

#### `async canStartConstitutionPoll(galaxy, proposal)`

Returns a true result if the account can start a poll on the `proposal` as
`galaxy`.

#### `startConstitutionPoll(galaxy, proposal)`

Returns a transaction for starting a poll on the `proposal` as `galaxy`.

#### `async canStartDocumentPoll(galaxy, proposal)`

Returns a true result if the account can start a poll on the `proposal` as
`galaxy`.

#### `startDocumentPoll(galaxy, proposal)`

Returns a transaction for starting a poll on the `proposal` as `galaxy`.

#### `async canCastConstitutionVote(galaxy, proposal)`

Returns a true result if the account can vote on the `proposal` as `galaxy`.

#### `castConstitutionVote(galaxy, proposal, vote)`

Returns a transaction for casting a `vote` on the `proposal` as `galaxy`.

#### `async canCastDocumentVote(galaxy, proposal)`

Returns a true result if the account can vote on the `proposal` as `galaxy`.

#### `castDocumentVote(galaxy, proposal, vote)`

Returns a transaction for casting a `vote` on the `proposal` as `galaxy`.

#### `updateConstitutionPoll(proposal)`

Returns a transaction for updating the poll on `proposal`.

#### `updateDocumentPoll(proposal)`

Returns a transaction for updating the poll on `proposal`.

#### `async canCreateGalaxy(galaxy, target)`

Returns a true result if the account can create a galaxy for the `target`
address.

#### `createGalaxy(galaxy, target)`

Returns a transaction for creating a `galaxy` and giving it to `target`.

#### `async canSetDnsDomains()`

Returns a true result if the account can configure the DNS domains.

#### `setDnsDomains(primary, secondary, tertiary)`

Returns a transaction for configuring the DNS domains to be `primary`,
`secondary` and `tertiary`.
