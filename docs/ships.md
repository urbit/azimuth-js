<a name="module_ships"></a>

## ships
Ships API


* [ships](#module_ships)
    * [~owner](#module_ships..owner) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~getShip](#module_ships..getShip) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~getOwnedShipsByAddress](#module_ships..getOwnedShipsByAddress) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getOwnedShipCount](#module_ships..getOwnedShipCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getOwnedShipAtIndex](#module_ships..getOwnedShipAtIndex) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~isManager](#module_ships..isManager) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canManage](#module_ships..canManage) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getManagingForCount](#module_ships..getManagingForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getManagingFor](#module_ships..getManagingFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~isDelegate](#module_ships..isDelegate) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canVoteAs](#module_ships..canVoteAs) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getVotingForCount](#module_ships..getVotingForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getVotingFor](#module_ships..getVotingFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getSpawningForCount](#module_ships..getSpawningForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawningFor](#module_ships..getSpawningFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getTransferringForCount](#module_ships..getTransferringForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getTransferringFor](#module_ships..getTransferringFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~isOperator](#module_ships..isOperator) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isOwner(contracts, ship, address)](#module_ships..isOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getOwner(contracts, ship)](#module_ships..getOwner) ⇒ <code>Promise.&lt;Address&gt;</code>
    * [~isActive(contracts, ship)](#module_ships..isActive) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getKeys(contracts, ship)](#module_ships..getKeys) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~getKeyRevisionNumber(contracts, ship)](#module_ships..getKeyRevisionNumber) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~hasBeenBooted(contracts, ship)](#module_ships..hasBeenBooted) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isLive(contracts, ship)](#module_ships..isLive) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getContinuityNumber(contracts, ship)](#module_ships..getContinuityNumber) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawnCount(contracts, ship)](#module_ships..getSpawnCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawned(contracts, ship)](#module_ships..getSpawned) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getSponsor(contracts, ship)](#module_ships..getSponsor) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~hasSponsor(contracts, ship)](#module_ships..hasSponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isSponsor(contracts, ship, sponsor)](#module_ships..isSponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isEscaping(contracts, ship)](#module_ships..isEscaping) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getEscapeRequest(contracts, ship)](#module_ships..getEscapeRequest) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~isRequestingEscapeTo(contracts, ship, sponsor)](#module_ships..isRequestingEscapeTo) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isSpawnProxy(contracts, ship, address)](#module_ships..isSpawnProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getSpawnProxy(contracts, ship)](#module_ships..getSpawnProxy) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~isTransferProxy(contracts, ship, address)](#module_ships..isTransferProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getTransferProxy(contracts, ship)](#module_ships..getTransferProxy) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~getPrefix(ship)](#module_ships..getPrefix) ⇒ <code>Number</code>
    * [~getShipClass(ship)](#module_ships..getShipClass) ⇒ <code>Number</code>

<a name="module_ships..owner"></a>

### ships~owner ⇒ <code>Promise.&lt;String&gt;</code>
Get the ships contract owner.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The contract owner's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="module_ships..getShip"></a>

### ships~getShip ⇒ <code>Promise.&lt;Object&gt;</code>
Get a ship object, given its token id.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A ship object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |

<a name="module_ships..getOwnedShipsByAddress"></a>

### ships~getOwnedShipsByAddress ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the ships that an address owns.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - An array of owned ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getOwnedShipCount"></a>

### ships~getOwnedShipCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of ships owned by an address.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Owned ship count for the address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getOwnedShipAtIndex"></a>

### ships~getOwnedShipAtIndex ⇒ <code>Promise.&lt;Number&gt;</code>
Get the ship at the given index of the array containing an owner's ships.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The ship at the provided index.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |
| index | <code>Number</code> | The index of the array. |

<a name="module_ships..isManager"></a>

### ships~isManager ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a manager for an owner.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address is a manager, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| owner | <code>String</code> | The owner's address. |
| manager | <code>String</code> | The manager's address. |

<a name="module_ships..canManage"></a>

### ships~canManage ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can manage a ship.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address can manage the ship, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| address | <code>String</code> | The manager's address. |

<a name="module_ships..getManagingForCount"></a>

### ships~getManagingForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the ships an address is managing.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of ships being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getManagingFor"></a>

### ships~getManagingFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the ships an account is managing.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The ships being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..isDelegate"></a>

### ships~isDelegate ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a delegate for an owner.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is delegate, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The owner's address. |
| address | <code>String</code> | The delegate's address. |

<a name="module_ships..canVoteAs"></a>

### ships~canVoteAs ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can vote for a ship.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is the address can vote for the ship, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| address | <code>String</code> | The delegate's address. |

<a name="module_ships..getVotingForCount"></a>

### ships~getVotingForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the ships an address can vote for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of ships that can be voted for.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getVotingFor"></a>

### ships~getVotingFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the ships an account is voting for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The ships being voted for.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getSpawningForCount"></a>

### ships~getSpawningForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the ships an address is a spawn proxy for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getSpawningFor"></a>

### ships~getSpawningFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the ships an account is a spawn proxy for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getTransferringForCount"></a>

### ships~getTransferringForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the ships an address is a transfer proxy for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..getTransferringFor"></a>

### ships~getTransferringFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the ships an account is a transfer proxy for.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_ships..isOperator"></a>

### ships~isOperator ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is an operator for another.

**Kind**: inner constant of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is operator, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The owner's address. |
| address | <code>String</code> | The operator's address. |

<a name="module_ships..isOwner"></a>

### ships~isOwner(contracts, ship, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is the owner of a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if owner of the ship, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |
| address | <code>Number</code> | Owner's address. |

<a name="module_ships..getOwner"></a>

### ships~getOwner(contracts, ship) ⇒ <code>Promise.&lt;Address&gt;</code>
Get the owner of a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Address&gt;</code> - The ship's owner.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..isActive"></a>

### ships~isActive(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is active.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the ship is active, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getKeys"></a>

### ships~getKeys(contracts, ship) ⇒ <code>Promise.&lt;Object&gt;</code>
Get the key configuration for a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The ship's key configuration.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getKeyRevisionNumber"></a>

### ships~getKeyRevisionNumber(contracts, ship) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the key revision number of a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The ship's key revision number.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..hasBeenBooted"></a>

### ships~hasBeenBooted(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship has been booted.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if it has been booted, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..isLive"></a>

### ships~isLive(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is live.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the ship is live, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getContinuityNumber"></a>

### ships~getContinuityNumber(contracts, ship) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a ship's continuity number.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The ship's continuity number.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getSpawnCount"></a>

### ships~getSpawnCount(contracts, ship) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a ship's spawn count.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The ship's spawn count.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getSpawned"></a>

### ships~getSpawned(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship has been spawned.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the ship has been spawned, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getSponsor"></a>

### ships~getSponsor(contracts, ship) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a ship's sponsor.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The ship's sponsor.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..hasSponsor"></a>

### ships~hasSponsor(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship has a sponsor.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the ship has a sponsor, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..isSponsor"></a>

### ships~isSponsor(contracts, ship, sponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is the sponsor of another.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if a sponsor, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |
| sponsor | <code>Number</code> | The sponsor's ship token. |

<a name="module_ships..isEscaping"></a>

### ships~isEscaping(contracts, ship) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is requesting escape.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if requesting escape, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getEscapeRequest"></a>

### ships~getEscapeRequest(contracts, ship) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the sponsor that another ship is requesting escape to.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The sponsor ship token.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..isRequestingEscapeTo"></a>

### ships~isRequestingEscapeTo(contracts, ship, sponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is requesting escape to another ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if escape to sponsor requested, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |
| sponsor | <code>Number</code> | Sponsor's ship token. |

<a name="module_ships..isSpawnProxy"></a>

### ships~isSpawnProxy(contracts, ship, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a spawn proxy for a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if address is spawn proxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |
| address | <code>String</code> | Target address. |

<a name="module_ships..getSpawnProxy"></a>

### ships~getSpawnProxy(contracts, ship) ⇒ <code>Promise.&lt;String&gt;</code>
Get the spawn proxy for a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The spawn proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..isTransferProxy"></a>

### ships~isTransferProxy(contracts, ship, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a transfer proxy for a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address is a transfer proxy, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |
| address | <code>String</code> | Target address. |

<a name="module_ships..getTransferProxy"></a>

### ships~getTransferProxy(contracts, ship) ⇒ <code>Promise.&lt;String&gt;</code>
Get the transfer proxy for a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The transfer proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> \| <code>Object</code> | Ship token or ship object. |

<a name="module_ships..getPrefix"></a>

### ships~getPrefix(ship) ⇒ <code>Number</code>
Calculate the prefix of a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Number</code> - The ship's prefix.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_ships..getShipClass"></a>

### ships~getShipClass(ship) ⇒ <code>Number</code>
Calculate the class of a ship.

**Kind**: inner method of [<code>ships</code>](#module_ships)  
**Returns**: <code>Number</code> - The ship's class.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

