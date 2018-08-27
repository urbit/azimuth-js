# `ships`

Unless specified otherwise, `ship` refers to the integer representation of an
Urbit address. Anything that isn't obviously a ship is an Ethereum address.

## Getters

#### `async getShip(ship)`

Returns an object containing all on-chain state of the `ship`, except for its
list of spawned children.

It is strongly recommended to use this rather than multiple granular calls to
read ship data from the chain.

#### `async getSpawned(ship)`

Returns an array containing the ships spawned by `ship`.

#### `async getOwnedShips(address)`

If no `address` is provided, the configured account is used.

Returns an array of all ships directly owned by `address`.

#### `async getManagingFor(address)`

If no `address` is provided, the configured account is used.

Returns an array of all addresses `address` is managing ships for.

#### `async getTransferringFor(address)`

If no `address` is provided, the configured account is used.

Returns an array of all ships `address` can transfer.

#### `async getSpawningFor(address)`

If no `address` is provided, the configured account is used.

Returns an array of all ships `address` can spawn from.

#### `async getVotingFor(address)`

If no `address` is provided, the configured account is used.

Returns an array of all addresses `address` is a voting delegate for.

## Data checks

These do more granular checking of on-chain data. These are exposed primarily
for use by the `constitution`'s checks. Think twice whether you really need to
use these. If yes, documentation below.

When a data check accepts both a ship number and a ship object, providing an
object returns the result directly, rather than returning a Promise.

All data checks return booleans.

#### `async isActive(ship)`

`ship` can be either a number or object.

Returns true if the `ship` is active (ie has been spawned).

#### `async hasBeenBooted(ship)`

`ship` can be either a number or object.

Returns true if the `ship` has been booted (ie has had keys configured).

#### `async hasOwner(ship)`

`ship` can be either a number or object.

Returns true if the `ship` has an owner that is not the zero address.

#### `async isOwner(ship, owner)`

`ship` can be either a number or object.  
If no `owner` is provided, the configured account is used.

Returns true if `owner` is the registered owner of `ship`.

#### `async isOperator(owner, operator)`

If no `operator` is provided, the configured account is used.

Returns true if `operator` is an operator of `owner`'s assets.

#### `async isTransferProxy(ship, proxy)`

`ship` can be either a number or object.  
If no `proxy` is provided, the configured account is used.

Returns true if `proxy` is the transfer proxy registered for `ship`.

#### `async isSpawnProxy(ship, proxy)`

`ship` can be either a number or object.  
If no `proxy` is provided, the configured account is used.

Returns true if `proxy` is the spawn proxy registered for `ship`.

#### `async canManage(ship, address)`

If no `address` is provided, the configured account is used.

Returns true if `address` can manage (configure keys, escape & adopt) `ship`.

#### `async canVoteAs(ship, address)`

If no `address` is provided, the configured account is used.

Returns true if `address` can vote as `ship`.

#### `async isRequestingEscape(ship, sponsor)`

If sponsor is undefined, returns true if `ship` is trying to escape.

Otherwise, returns true if `ship` is trying to escape to `sponsor` specifically.

#### `async isSponsor(ship, sponsor)`

`ship` can be either a number or object.  

Returns true if `sponsor` is currently sponsoring `ship`.

## Checks

Again, primarily for repetitive use by `constitution`'s action checks.  
Return result objects, with a `result` bool, and if that's false,
a `reason` string.

#### `async checkActiveShipManager(ship, owner)`

If no `owner` is provided, the configured account is used.

Returns a true result if `ship` is active and `owner` can manage it.

#### `async checkActiveShipVoter(galaxy, voter)`

If no `voter` is provided, the configured account is used.

Returns a true result if `ship` is active and `voter` can vote with it.
