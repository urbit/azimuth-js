<a name="module_check"></a>

## check
Contract checks, assertions, and verifications


* [check](#module_check)
    * [~isPoint(point)](#module_check..isPoint) ⇒ <code>Bool</code>
    * [~isGalaxy(point)](#module_check..isGalaxy) ⇒ <code>Bool</code>
    * [~isStar(point)](#module_check..isStar) ⇒ <code>Bool</code>
    * [~isPlanet(point)](#module_check..isPlanet) ⇒ <code>Bool</code>
    * [~isParent(point)](#module_check..isParent) ⇒ <code>Bool</code>
    * [~isChild(point)](#module_check..isChild) ⇒ <code>Bool</code>
    * [~pollIsActive(poll)](#module_check..pollIsActive) ⇒ <code>Bool</code>
    * [~canStartPoll(poll)](#module_check..canStartPoll) ⇒ <code>Bool</code>
    * [~hasOwner(contracts, pointId)](#module_check..hasOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isEclipticOwner(contracts, address)](#module_check..isEclipticOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canCreateGalaxy(contracts, pointId, address)](#module_check..canCreateGalaxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSpawn(contracts, pointId, address)](#module_check..canSpawn) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSetSpawnProxy(contracts, pointId, address)](#module_check..canSetSpawnProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canTransferPoint(contracts, pointId, sender, target)](#module_check..canTransferPoint) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSetTransferProxy(contracts, pointId, address)](#module_check..canSetTransferProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canConfigureKeys(contracts, pointId, address)](#module_check..canConfigureKeys) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canEscape(contracts, point, sponsor, address)](#module_check..canEscape) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~checkActivePointManager(contracts, point, address)](#module_check..checkActivePointManager) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canAdopt(contracts, escapee, sponsor, address)](#module_check..canAdopt) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canReject(contracts, sponsor, escapee, address)](#module_check..canReject) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canDetach(contracts, sponsor, point, address)](#module_check..canDetach) ⇒ <code>Promise.&lt;Bool&gt;</code>

<a name="module_check..isPoint"></a>

### check~isPoint(point) ⇒ <code>Bool</code>
Check if something is a point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a point, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..isGalaxy"></a>

### check~isGalaxy(point) ⇒ <code>Bool</code>
Check if something is a galaxy.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a galaxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..isStar"></a>

### check~isStar(point) ⇒ <code>Bool</code>
Check if something is a star.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a star, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..isPlanet"></a>

### check~isPlanet(point) ⇒ <code>Bool</code>
Check if something is a planet.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a planet, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..isParent"></a>

### check~isParent(point) ⇒ <code>Bool</code>
Check if a point is a parent of another point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a parent, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..isChild"></a>

### check~isChild(point) ⇒ <code>Bool</code>
Check if a point is a child of another point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a child, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number. |

<a name="module_check..pollIsActive"></a>

### check~pollIsActive(poll) ⇒ <code>Bool</code>
Check if a poll is active.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if active, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| poll | <code>Object</code> | A poll object. |

<a name="module_check..canStartPoll"></a>

### check~canStartPoll(poll) ⇒ <code>Bool</code>
Check if a poll can be started.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| poll | <code>Object</code> | A poll object. |

<a name="module_check..hasOwner"></a>

### check~hasOwner(contracts, pointId) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point has an owner.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |

<a name="module_check..isEclipticOwner"></a>

### check~isEclipticOwner(contracts, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is the ecliptic owner.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | Owner's address. |

<a name="module_check..canCreateGalaxy"></a>

### check~canCreateGalaxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can create the specified galaxy.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSpawn"></a>

### check~canSpawn(contracts, pointId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can spawn the given point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSetSpawnProxy"></a>

### check~canSetSpawnProxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can set a spawn proxy for the given point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canTransferPoint"></a>

### check~canTransferPoint(contracts, pointId, sender, target) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the sender address can send the provided point to the target
address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| sender | <code>String</code> | Sender's address. |
| target | <code>String</code> | Target address. |

<a name="module_check..canSetTransferProxy"></a>

### check~canSetTransferProxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the address can set a transfer proxy for the point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canConfigureKeys"></a>

### check~canConfigureKeys(contracts, pointId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the address can configure public keys for the point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canEscape"></a>

### check~canEscape(contracts, point, sponsor, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can make a point escape to the given sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| sponsor | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..checkActivePointManager"></a>

### check~checkActivePointManager(contracts, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is active and the target address can manage it.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canAdopt"></a>

### check~canAdopt(contracts, escapee, sponsor, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can adopt the escapee as its new sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| escapee | <code>Number</code> | Escapee's point number. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canReject"></a>

### check~canReject(contracts, sponsor, escapee, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can reject the escapee's request to the given
sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| escapee | <code>Number</code> | Escapee's point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canDetach"></a>

### check~canDetach(contracts, sponsor, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can detach a point from its sponsor.
sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

