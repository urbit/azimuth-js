<a name="module_check"></a>

## check
Contract checks, assertions, and verifications


* [check](#module_check)
    * [~isShip(ship)](#module_check..isShip) ⇒ <code>Bool</code>
    * [~isGalaxy(ship)](#module_check..isGalaxy) ⇒ <code>Bool</code>
    * [~isStar(ship)](#module_check..isStar) ⇒ <code>Bool</code>
    * [~isPlanet(ship)](#module_check..isPlanet) ⇒ <code>Bool</code>
    * [~isParent(ship)](#module_check..isParent) ⇒ <code>Bool</code>
    * [~isChild(ship)](#module_check..isChild) ⇒ <code>Bool</code>
    * [~pollIsActive(poll)](#module_check..pollIsActive) ⇒ <code>Bool</code>
    * [~canStartPoll(poll)](#module_check..canStartPoll) ⇒ <code>Bool</code>
    * [~hasOwner(contracts, tokenId)](#module_check..hasOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isConstitutionOwner(contracts, address)](#module_check..isConstitutionOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canCreateGalaxy(contracts, tokenId, address)](#module_check..canCreateGalaxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSpawn(contracts, tokenId, address)](#module_check..canSpawn) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSetSpawnProxy(contracts, tokenId, address)](#module_check..canSetSpawnProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canTransferShip(contracts, tokenId, sender, target)](#module_check..canTransferShip) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canSetTransferProxy(contracts, tokenId, address)](#module_check..canSetTransferProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canConfigureKeys(contracts, tokenId, address)](#module_check..canConfigureKeys) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canEscape(contracts, ship, sponsor, address)](#module_check..canEscape) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~checkActiveShipManager(contracts, ship, address)](#module_check..checkActiveShipManager) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canAdopt(contracts, escapee, sponsor, address)](#module_check..canAdopt) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canReject(contracts, sponsor, escapee, address)](#module_check..canReject) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canDetach(contracts, sponsor, ship, address)](#module_check..canDetach) ⇒ <code>Promise.&lt;Bool&gt;</code>

<a name="module_check..isShip"></a>

### check~isShip(ship) ⇒ <code>Bool</code>
Check if something is a ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a ship, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_check..isGalaxy"></a>

### check~isGalaxy(ship) ⇒ <code>Bool</code>
Check if something is a galaxy.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a galaxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_check..isStar"></a>

### check~isStar(ship) ⇒ <code>Bool</code>
Check if something is a star.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a star, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_check..isPlanet"></a>

### check~isPlanet(ship) ⇒ <code>Bool</code>
Check if something is a planet.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a planet, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_check..isParent"></a>

### check~isParent(ship) ⇒ <code>Bool</code>
Check if a ship is a parent of another ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a parent, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

<a name="module_check..isChild"></a>

### check~isChild(ship) ⇒ <code>Bool</code>
Check if a ship is a child of another ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a child, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ship | <code>Number</code> | Ship token. |

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

### check~hasOwner(contracts, tokenId) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship has an owner.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_check..isConstitutionOwner"></a>

### check~isConstitutionOwner(contracts, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is the constitution owner.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | Owner's address. |

<a name="module_check..canCreateGalaxy"></a>

### check~canCreateGalaxy(contracts, tokenId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can create the specified galaxy.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSpawn"></a>

### check~canSpawn(contracts, tokenId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can spawn the given ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSetSpawnProxy"></a>

### check~canSetSpawnProxy(contracts, tokenId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address can set a spawn proxy for the given ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canTransferShip"></a>

### check~canTransferShip(contracts, tokenId, sender, target) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the sender address can send the provided ship to the target
address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| sender | <code>String</code> | Sender's address. |
| target | <code>String</code> | Target address. |

<a name="module_check..canSetTransferProxy"></a>

### check~canSetTransferProxy(contracts, tokenId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the address can set a transfer proxy for the ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canConfigureKeys"></a>

### check~canConfigureKeys(contracts, tokenId, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the address can configure public keys for the ship.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canEscape"></a>

### check~canEscape(contracts, ship, sponsor, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can make a ship escape to the given sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| sponsor | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..checkActiveShipManager"></a>

### check~checkActiveShipManager(contracts, ship, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is active and the target address can manage it.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canAdopt"></a>

### check~canAdopt(contracts, escapee, sponsor, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can adopt the escapee as its new sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| escapee | <code>Number</code> | Escapee's ship token. |
| sponsor | <code>Number</code> | Sponsor's ship token. |
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
| sponsor | <code>Number</code> | Sponsor's ship token. |
| escapee | <code>Number</code> | Escapee's ship token. |
| address | <code>String</code> | Target address. |

<a name="module_check..canDetach"></a>

### check~canDetach(contracts, sponsor, ship, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can detach a ship from its sponsor.
sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's ship token. |
| ship | <code>Number</code> | Ship token. |
| address | <code>String</code> | Target address. |

