<a name="module_constitution"></a>

## constitution
Constitution API


* [constitution](#module_constitution)
    * [.owner](#module_constitution.owner) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.balanceOf](#module_constitution.balanceOf) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.ownerOf](#module_constitution.ownerOf) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.exists](#module_constitution.exists) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.getApproved](#module_constitution.getApproved) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.isApprovedForAll](#module_constitution.isApprovedForAll) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.getSpawnLimit](#module_constitution.getSpawnLimit) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.canEscapeTo](#module_constitution.canEscapeTo) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.safeTransferFrom](#module_constitution.safeTransferFrom) ⇒ <code>Object</code>
    * [.transferFrom](#module_constitution.transferFrom) ⇒ <code>Object</code>
    * [.approve](#module_constitution.approve) ⇒ <code>Object</code>
    * [.setApprovalForAll](#module_constitution.setApprovalForAll) ⇒ <code>Object</code>
    * [.setManagementProxy](#module_constitution.setManagementProxy) ⇒ <code>Object</code>
    * [.configureKeys](#module_constitution.configureKeys) ⇒ <code>Object</code>
    * [.spawn](#module_constitution.spawn) ⇒ <code>Object</code>
    * [.setSpawnProxy](#module_constitution.setSpawnProxy) ⇒ <code>Object</code>
    * [.transferShip](#module_constitution.transferShip) ⇒ <code>Object</code>
    * [.setTransferProxy](#module_constitution.setTransferProxy) ⇒ <code>Object</code>
    * [.escape](#module_constitution.escape) ⇒ <code>Object</code>
    * [.cancelEscape](#module_constitution.cancelEscape) ⇒ <code>Object</code>
    * [.adopt](#module_constitution.adopt) ⇒ <code>Object</code>
    * [.reject](#module_constitution.reject) ⇒ <code>Object</code>
    * [.detach](#module_constitution.detach) ⇒ <code>Object</code>
    * [.setDelegate](#module_constitution.setDelegate) ⇒ <code>Object</code>
    * [.startConstitutionPoll](#module_constitution.startConstitutionPoll) ⇒ <code>Object</code>
    * [.startDocumentPoll](#module_constitution.startDocumentPoll) ⇒ <code>Object</code>
    * [.castConstitutionVote](#module_constitution.castConstitutionVote) ⇒ <code>Object</code>
    * [.castDocumentVote](#module_constitution.castDocumentVote) ⇒ <code>Object</code>
    * [.updateConstitutionPoll](#module_constitution.updateConstitutionPoll) ⇒ <code>Object</code>
    * [.updateDocumentPoll](#module_constitution.updateDocumentPoll) ⇒ <code>Object</code>
    * [.createGalaxy](#module_constitution.createGalaxy) ⇒ <code>Object</code>
    * [.setDnsDomains](#module_constitution.setDnsDomains) ⇒ <code>Object</code>

<a name="module_constitution.owner"></a>

### constitution.owner ⇒ <code>Promise.&lt;String&gt;</code>
Get constitution contract owner.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The owner address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="module_constitution.balanceOf"></a>

### constitution.balanceOf ⇒ <code>Promise.&lt;Number&gt;</code>
Get the amount of ships owned by an address.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Number of ships.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | Owner's address. |

<a name="module_constitution.ownerOf"></a>

### constitution.ownerOf ⇒ <code>Promise.&lt;String&gt;</code>
Get the current owner of a ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;String&gt;</code> - Owner's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.exists"></a>

### constitution.exists ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship is active.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if ship is active, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.getApproved"></a>

### constitution.getApproved ⇒ <code>Promise.&lt;String&gt;</code>
Get the transfer proxy for a ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The transfer proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.isApprovedForAll"></a>

### constitution.isApprovedForAll ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is an operator for an owner.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if 'operator' is an operator for 'owner'.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| owner | <code>String</code> | The owner's address. |
| operator | <code>String</code> | The operator's address. |

<a name="module_constitution.getSpawnLimit"></a>

### constitution.getSpawnLimit ⇒ <code>Promise.&lt;Number&gt;</code>
Return the total number of children a ship is allowed to spawn at some time.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The spawn limit.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| time | <code>Number</code> | Time (uint256). |

<a name="module_constitution.canEscapeTo"></a>

### constitution.canEscapeTo ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a ship can escape to a sponsor.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if ship can escape, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| sponsor | <code>Number</code> | Sponsor's ship token. |

<a name="module_constitution.safeTransferFrom"></a>

### constitution.safeTransferFrom ⇒ <code>Object</code>
Safely transfer a ship between addresses (call recipient if it's a contract).

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | Sender's address. |
| to | <code>String</code> | Receiver's address. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.transferFrom"></a>

### constitution.transferFrom ⇒ <code>Object</code>
Transfer a ship between addresses (without notifying recipient contract).

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | Sender's address. |
| to | <code>String</code> | Receiver's address. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.approve"></a>

### constitution.approve ⇒ <code>Object</code>
Allow an address to transfer ownership of a ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| approved | <code>String</code> | The approved address. |
| tokenId | <code>Number</code> | Ship token. |

<a name="module_constitution.setApprovalForAll"></a>

### constitution.setApprovalForAll ⇒ <code>Object</code>
Allow or disallow an operator to transfer ownership of alL ships owner by
the message sender.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| operator | <code>Address</code> | The operator's address. |
| approved | <code>Bool</code> | Whether the operator is approved or not. |

<a name="module_constitution.setManagementProxy"></a>

### constitution.setManagementProxy ⇒ <code>Object</code>
Configure the management address for all ships owned by the message sender.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| manager | <code>String</code> | The management address. |

<a name="module_constitution.configureKeys"></a>

### constitution.configureKeys ⇒ <code>Object</code>
Configure a ship with Urbit public keys, incrementing the ship's continuity
number if needed.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| encryptionKey | <code>String</code> | The encryption key. |
| authenticationKey | <code>String</code> | The auth key. |
| cryptoSuiteVersion | <code>Number</code> | The crypto suite version. |
| discontinuous | <code>Bool</code> | True to increment the continuity number. |

<a name="module_constitution.spawn"></a>

### constitution.spawn ⇒ <code>Object</code>
Spawn a ship, giving ownership of it to the target address.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | A ship token. |
| target | <code>String</code> | The target address. |

<a name="module_constitution.setSpawnProxy"></a>

### constitution.setSpawnProxy ⇒ <code>Object</code>
Give an address the right to spawn ships with the given prefix.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| prefix | <code>Number</code> | A (prefix) ship token. |
| address | <code>String</code> | The address to designate as a spawn proxy. |

<a name="module_constitution.transferShip"></a>

### constitution.transferShip ⇒ <code>Object</code>
Transfer a ship to a target address, optionally clearing all permissions
data and keys.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Ship token. |
| address | <code>String</code> | The target address. |
| reset | <code>Bool</code> | True to reset ship's keys. |

<a name="module_constitution.setTransferProxy"></a>

### constitution.setTransferProxy ⇒ <code>Object</code>
Give an address the right to transfer the given ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| prefix | <code>Number</code> | Ship token. |
| address | <code>String</code> | The address to designate as a transfer proxy. |

<a name="module_constitution.escape"></a>

### constitution.escape ⇒ <code>Object</code>
Request escape from 'ship' to 'sponsor'.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Escapee's ship token. |
| sponsor | <code>Number</code> | Sponsor's ship token. |

<a name="module_constitution.cancelEscape"></a>

### constitution.cancelEscape ⇒ <code>Object</code>
Cancel the currently set escape for a ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| ship | <code>Number</code> | Escapee's ship token. |

<a name="module_constitution.adopt"></a>

### constitution.adopt ⇒ <code>Object</code>
As the sponsor, accept the escapee.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's ship token. |
| escapee | <code>Number</code> | Escapee's ship token. |

<a name="module_constitution.reject"></a>

### constitution.reject ⇒ <code>Object</code>
As the sponsor, reject the escapee's escape request.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's ship token. |
| escapee | <code>Number</code> | Escapee's ship token. |

<a name="module_constitution.detach"></a>

### constitution.detach ⇒ <code>Object</code>
As the sponsor, stop sponsoring the ship.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's ship token. |
| ship | <code>Number</code> | Ship token. |

<a name="module_constitution.setDelegate"></a>

### constitution.setDelegate ⇒ <code>Object</code>
Configure the delegate address for all ships owned by the message sender.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| delegate | <code>String</code> | The delegate's address. |

<a name="module_constitution.startConstitutionPoll"></a>

### constitution.startConstitutionPoll ⇒ <code>Object</code>
As a galaxy, start a poll for the constitution upgrade proposal.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) ship token. |
| proposal | <code>Object</code> | The constitution upgrade proposal. |

<a name="module_constitution.startDocumentPoll"></a>

### constitution.startDocumentPoll ⇒ <code>Object</code>
As a galaxy, start a poll for a proposal.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) ship token. |
| proposal | <code>String</code> | The proposal document. |

<a name="module_constitution.castConstitutionVote"></a>

### constitution.castConstitutionVote ⇒ <code>Object</code>
As a galaxy, cast a vote on the constitution upgrade proposal.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) ship token. |
| proposal | <code>Object</code> | The upgrade proposal. |
| vote | <code>Bool</code> | True if yes, false otherwise. |

<a name="module_constitution.castDocumentVote"></a>

### constitution.castDocumentVote ⇒ <code>Object</code>
As a galaxy, cast a vote on the proposal.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) ship token. |
| proposal | <code>String</code> | The proposal document. |
| vote | <code>Bool</code> | True if yes, false otherwise. |

<a name="module_constitution.updateConstitutionPoll"></a>

### constitution.updateConstitutionPoll ⇒ <code>Object</code>
Check whether the proposal has achieved majority, upgrading to it if so.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| proposal | <code>Object</code> | The upgrade proposal. |

<a name="module_constitution.updateDocumentPoll"></a>

### constitution.updateDocumentPoll ⇒ <code>Object</code>
Check whether the proposal has achieved majority.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| proposal | <code>Object</code> | The proposal document. |

<a name="module_constitution.createGalaxy"></a>

### constitution.createGalaxy ⇒ <code>Object</code>
Grant the target address ownership of the galaxy and register it for voting.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) ship token. |
| target | <code>String</code> | The target address. |

<a name="module_constitution.setDnsDomains"></a>

### constitution.setDnsDomains ⇒ <code>Object</code>
Set primary, secondary, adn tertiary DNS domains for the constitution.

**Kind**: static property of [<code>constitution</code>](#module_constitution)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| primary | <code>String</code> | Primary DNS address. |
| secondary | <code>String</code> | Secondary DNS address. |
| tertiary | <code>String</code> | Tertiary DNS address. |

