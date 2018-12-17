<a name="module_azimuth"></a>

## azimuth
Azimuth API


* [azimuth](#module_azimuth)
    * [~owner](#module_azimuth..owner) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~getPoint](#module_azimuth..getPoint) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~getOwnedPointsByAddress](#module_azimuth..getOwnedPointsByAddress) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getOwnedPointCount](#module_azimuth..getOwnedPointCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getOwnedPointAtIndex](#module_azimuth..getOwnedPointAtIndex) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~isManager](#module_azimuth..isManager) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canManage](#module_azimuth..canManage) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getManagingForCount](#module_azimuth..getManagingForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getManagingFor](#module_azimuth..getManagingFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~isDelegate](#module_azimuth..isDelegate) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canVoteAs](#module_azimuth..canVoteAs) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getVotingForCount](#module_azimuth..getVotingForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getVotingFor](#module_azimuth..getVotingFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getSpawningForCount](#module_azimuth..getSpawningForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawningFor](#module_azimuth..getSpawningFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getTransferringForCount](#module_azimuth..getTransferringForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getTransferringFor](#module_azimuth..getTransferringFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~isOperator](#module_azimuth..isOperator) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isOwner(contracts, point, address)](#module_azimuth..isOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getOwner(contracts, point)](#module_azimuth..getOwner) ⇒ <code>Promise.&lt;Address&gt;</code>
    * [~isActive(contracts, point)](#module_azimuth..isActive) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getKeys(contracts, point)](#module_azimuth..getKeys) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~getKeyRevisionNumber(contracts, point)](#module_azimuth..getKeyRevisionNumber) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~hasBeenLinked(contracts, point)](#module_azimuth..hasBeenLinked) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isLive(contracts, point)](#module_azimuth..isLive) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getContinuityNumber(contracts, point)](#module_azimuth..getContinuityNumber) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawnCount(contracts, point)](#module_azimuth..getSpawnCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getSpawned(contracts, point)](#module_azimuth..getSpawned) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getSponsor(contracts, point)](#module_azimuth..getSponsor) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~hasSponsor(contracts, point)](#module_azimuth..hasSponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isSponsor(contracts, point, sponsor)](#module_azimuth..isSponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isEscaping(contracts, point)](#module_azimuth..isEscaping) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getEscapeRequest(contracts, point)](#module_azimuth..getEscapeRequest) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~isRequestingEscapeTo(contracts, point, sponsor)](#module_azimuth..isRequestingEscapeTo) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isSpawnProxy(contracts, point, address)](#module_azimuth..isSpawnProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getSpawnProxy(contracts, point)](#module_azimuth..getSpawnProxy) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~isTransferProxy(contracts, point, address)](#module_azimuth..isTransferProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getTransferProxy(contracts, point)](#module_azimuth..getTransferProxy) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~getPrefix(point)](#module_azimuth..getPrefix) ⇒ <code>Number</code>
    * [~getPointSize(point)](#module_azimuth..getPointSize) ⇒ <code>Number</code>

<a name="module_azimuth..owner"></a>

### azimuth~owner ⇒ <code>Promise.&lt;String&gt;</code>
Get the azimuth contract owner.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The contract owner's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="module_azimuth..getPoint"></a>

### azimuth~getPoint ⇒ <code>Promise.&lt;Object&gt;</code>
Get a point object, given its point id.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A point object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getOwnedPointsByAddress"></a>

### azimuth~getOwnedPointsByAddress ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points that an address owns.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - An array of owned points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getOwnedPointCount"></a>

### azimuth~getOwnedPointCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of points owned by an address.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Owned point count for the address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getOwnedPointAtIndex"></a>

### azimuth~getOwnedPointAtIndex ⇒ <code>Promise.&lt;Number&gt;</code>
Get the point at the given index of the array containing an owner's points.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point at the provided index.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |
| index | <code>Number</code> | The index of the array. |

<a name="module_azimuth..isManager"></a>

### azimuth~isManager ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a manager for an owner.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address is a manager, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| owner | <code>String</code> | The owner's address. |
| manager | <code>String</code> | The manager's address. |

<a name="module_azimuth..canManage"></a>

### azimuth~canManage ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can manage a point.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address can manage the point, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | The manager's address. |

<a name="module_azimuth..getManagingForCount"></a>

### azimuth~getManagingForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address is managing.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of points being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getManagingFor"></a>

### azimuth~getManagingFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is managing.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The points being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..isDelegate"></a>

### azimuth~isDelegate ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a delegate for an owner.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is delegate, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The owner's address. |
| address | <code>String</code> | The delegate's address. |

<a name="module_azimuth..canVoteAs"></a>

### azimuth~canVoteAs ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can vote for a point.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is the address can vote for the point, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | The delegate's address. |

<a name="module_azimuth..getVotingForCount"></a>

### azimuth~getVotingForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address can vote for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of points that can be voted for.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getVotingFor"></a>

### azimuth~getVotingFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is voting for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The points being voted for.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getSpawningForCount"></a>

### azimuth~getSpawningForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address is a spawn proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getSpawningFor"></a>

### azimuth~getSpawningFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is a spawn proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getTransferringForCount"></a>

### azimuth~getTransferringForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address is a transfer proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getTransferringFor"></a>

### azimuth~getTransferringFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is a transfer proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..isOperator"></a>

### azimuth~isOperator ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is an operator for another.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is operator, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The owner's address. |
| address | <code>String</code> | The operator's address. |

<a name="module_azimuth..isOwner"></a>

### azimuth~isOwner(contracts, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is the owner of a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if owner of the point, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| address | <code>Number</code> | Owner's address. |

<a name="module_azimuth..getOwner"></a>

### azimuth~getOwner(contracts, point) ⇒ <code>Promise.&lt;Address&gt;</code>
Get the owner of a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Address&gt;</code> - The point's owner.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..isActive"></a>

### azimuth~isActive(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is active.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the point is active, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getKeys"></a>

### azimuth~getKeys(contracts, point) ⇒ <code>Promise.&lt;Object&gt;</code>
Get the key configuration for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The point's key configuration.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getKeyRevisionNumber"></a>

### azimuth~getKeyRevisionNumber(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the key revision number of a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point's key revision number.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..hasBeenLinked"></a>

### azimuth~hasBeenLinked(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point has been booted.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if it has been booted, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..isLive"></a>

### azimuth~isLive(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is live.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the point is live, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getContinuityNumber"></a>

### azimuth~getContinuityNumber(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a point's continuity number.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point's continuity number.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getSpawnCount"></a>

### azimuth~getSpawnCount(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a point's spawn count.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point's spawn count.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getSpawned"></a>

### azimuth~getSpawned(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point has been spawned.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the point has been spawned, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getSponsor"></a>

### azimuth~getSponsor(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get a point's sponsor.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point's sponsor.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..hasSponsor"></a>

### azimuth~hasSponsor(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point has a sponsor.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the point has a sponsor, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..isSponsor"></a>

### azimuth~isSponsor(contracts, point, sponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is the sponsor of another.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if a sponsor, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| sponsor | <code>Number</code> | The sponsor's point number. |

<a name="module_azimuth..isEscaping"></a>

### azimuth~isEscaping(contracts, point) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is requesting escape.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if requesting escape, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getEscapeRequest"></a>

### azimuth~getEscapeRequest(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the sponsor that another point is requesting escape to.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The sponsor point number.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..isRequestingEscapeTo"></a>

### azimuth~isRequestingEscapeTo(contracts, point, sponsor) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is requesting escape to another point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if escape to sponsor requested, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| sponsor | <code>Number</code> | Sponsor's point number. |

<a name="module_azimuth..isSpawnProxy"></a>

### azimuth~isSpawnProxy(contracts, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a spawn proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if address is spawn proxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| address | <code>String</code> | Target address. |

<a name="module_azimuth..getSpawnProxy"></a>

### azimuth~getSpawnProxy(contracts, point) ⇒ <code>Promise.&lt;String&gt;</code>
Get the spawn proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The spawn proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..isTransferProxy"></a>

### azimuth~isTransferProxy(contracts, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a transfer proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if the address is a transfer proxy, false
 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| address | <code>String</code> | Target address. |

<a name="module_azimuth..getTransferProxy"></a>

### azimuth~getTransferProxy(contracts, point) ⇒ <code>Promise.&lt;String&gt;</code>
Get the transfer proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The transfer proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_azimuth..getPrefix"></a>

### azimuth~getPrefix(point) ⇒ <code>Number</code>
Calculate the prefix of a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Number</code> - The point's prefix.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getPointSize"></a>

### azimuth~getPointSize(point) ⇒ <code>Number</code>
Calculate the size of a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Number</code> - The point's size.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

