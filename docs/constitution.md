<a name="module_ecliptic"></a>

## ecliptic
Ecliptic API


* [ecliptic](#module_ecliptic)
    * [.owner](#module_ecliptic.owner) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.balanceOf](#module_ecliptic.balanceOf) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.ownerOf](#module_ecliptic.ownerOf) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.exists](#module_ecliptic.exists) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.getApproved](#module_ecliptic.getApproved) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.isApprovedForAll](#module_ecliptic.isApprovedForAll) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.getSpawnLimit](#module_ecliptic.getSpawnLimit) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.canEscapeTo](#module_ecliptic.canEscapeTo) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.safeTransferFrom](#module_ecliptic.safeTransferFrom) ⇒ <code>Object</code>
    * [.transferFrom](#module_ecliptic.transferFrom) ⇒ <code>Object</code>
    * [.approve](#module_ecliptic.approve) ⇒ <code>Object</code>
    * [.setApprovalForAll](#module_ecliptic.setApprovalForAll) ⇒ <code>Object</code>
    * [.setManagementProxy](#module_ecliptic.setManagementProxy) ⇒ <code>Object</code>
    * [.configureKeys](#module_ecliptic.configureKeys) ⇒ <code>Object</code>
    * [.spawn](#module_ecliptic.spawn) ⇒ <code>Object</code>
    * [.setSpawnProxy](#module_ecliptic.setSpawnProxy) ⇒ <code>Object</code>
    * [.transferPoint](#module_ecliptic.transferPoint) ⇒ <code>Object</code>
    * [.setTransferProxy](#module_ecliptic.setTransferProxy) ⇒ <code>Object</code>
    * [.escape](#module_ecliptic.escape) ⇒ <code>Object</code>
    * [.cancelEscape](#module_ecliptic.cancelEscape) ⇒ <code>Object</code>
    * [.adopt](#module_ecliptic.adopt) ⇒ <code>Object</code>
    * [.reject](#module_ecliptic.reject) ⇒ <code>Object</code>
    * [.detach](#module_ecliptic.detach) ⇒ <code>Object</code>
    * [.setDelegate](#module_ecliptic.setDelegate) ⇒ <code>Object</code>
    * [.startUpgradePoll](#module_ecliptic.startUpgradePoll) ⇒ <code>Object</code>
    * [.startDocumentPoll](#module_ecliptic.startDocumentPoll) ⇒ <code>Object</code>
    * [.castUpgradeVote](#module_ecliptic.castUpgradeVote) ⇒ <code>Object</code>
    * [.castDocumentVote](#module_ecliptic.castDocumentVote) ⇒ <code>Object</code>
    * [.updateUpgradePoll](#module_ecliptic.updateUpgradePoll) ⇒ <code>Object</code>
    * [.updateDocumentPoll](#module_ecliptic.updateDocumentPoll) ⇒ <code>Object</code>
    * [.createGalaxy](#module_ecliptic.createGalaxy) ⇒ <code>Object</code>
    * [.setDnsDomains](#module_ecliptic.setDnsDomains) ⇒ <code>Object</code>

<a name="module_ecliptic.owner"></a>

### ecliptic.owner ⇒ <code>Promise.&lt;String&gt;</code>
Get ecliptic contract owner.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The owner address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="module_ecliptic.balanceOf"></a>

### ecliptic.balanceOf ⇒ <code>Promise.&lt;Number&gt;</code>
Get the amount of points owned by an address.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Number of points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | Owner's address. |

<a name="module_ecliptic.ownerOf"></a>

### ecliptic.ownerOf ⇒ <code>Promise.&lt;String&gt;</code>
Get the current owner of a point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;String&gt;</code> - Owner's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.exists"></a>

### ecliptic.exists ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point is active.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if point is active, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.getApproved"></a>

### ecliptic.getApproved ⇒ <code>Promise.&lt;String&gt;</code>
Get the transfer proxy for a point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The transfer proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.isApprovedForAll"></a>

### ecliptic.isApprovedForAll ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is an operator for an owner.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if 'operator' is an operator for 'owner'.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| owner | <code>String</code> | The owner's address. |
| operator | <code>String</code> | The operator's address. |

<a name="module_ecliptic.getSpawnLimit"></a>

### ecliptic.getSpawnLimit ⇒ <code>Promise.&lt;Number&gt;</code>
Return the total number of children a point is allowed to spawn at some time.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The spawn limit.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| time | <code>Number</code> | Time (uint256). |

<a name="module_ecliptic.canEscapeTo"></a>

### ecliptic.canEscapeTo ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if a point can escape to a sponsor.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if point can escape, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| sponsor | <code>Number</code> | Sponsor's point number. |

<a name="module_ecliptic.safeTransferFrom"></a>

### ecliptic.safeTransferFrom ⇒ <code>Object</code>
Safely transfer a point between addresses (call recipient if it's a contract).

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | Sender's address. |
| to | <code>String</code> | Receiver's address. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.transferFrom"></a>

### ecliptic.transferFrom ⇒ <code>Object</code>
Transfer a point between addresses (without notifying recipient contract).

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | Sender's address. |
| to | <code>String</code> | Receiver's address. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.approve"></a>

### ecliptic.approve ⇒ <code>Object</code>
Allow an address to transfer ownership of a point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| approved | <code>String</code> | The approved address. |
| pointId | <code>Number</code> | Point number. |

<a name="module_ecliptic.setApprovalForAll"></a>

### ecliptic.setApprovalForAll ⇒ <code>Object</code>
Allow or disallow an operator to transfer ownership of all points owner by
the message sender.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| operator | <code>Address</code> | The operator's address. |
| approved | <code>Bool</code> | Whether the operator is approved or not. |

<a name="module_ecliptic.setManagementProxy"></a>

### ecliptic.setManagementProxy ⇒ <code>Object</code>
Configure the management address for all points owned by the message sender.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| manager | <code>String</code> | The management address. |

<a name="module_ecliptic.configureKeys"></a>

### ecliptic.configureKeys ⇒ <code>Object</code>
Configure a point with Urbit public keys, incrementing the point's continuity
number if needed.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| encryptionKey | <code>String</code> | The encryption key. |
| authenticationKey | <code>String</code> | The auth key. |
| cryptoSuiteVersion | <code>Number</code> | The crypto suite version. |
| discontinuous | <code>Bool</code> | True to increment the continuity number. |

<a name="module_ecliptic.spawn"></a>

### ecliptic.spawn ⇒ <code>Object</code>
Spawn a point, giving ownership of it to the target address.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | A point number. |
| target | <code>String</code> | The target address. |

<a name="module_ecliptic.setSpawnProxy"></a>

### ecliptic.setSpawnProxy ⇒ <code>Object</code>
Give an address the right to spawn points with the given prefix.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| prefix | <code>Number</code> | A (prefix) point number. |
| address | <code>String</code> | The address to designate as a spawn proxy. |

<a name="module_ecliptic.transferPoint"></a>

### ecliptic.transferPoint ⇒ <code>Object</code>
Transfer a point to a target address, optionally clearing all permissions
data and keys.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | The target address. |
| reset | <code>Bool</code> | True to reset point's keys. |

<a name="module_ecliptic.setTransferProxy"></a>

### ecliptic.setTransferProxy ⇒ <code>Object</code>
Give an address the right to transfer the given point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| prefix | <code>Number</code> | Point number. |
| address | <code>String</code> | The address to designate as a transfer proxy. |

<a name="module_ecliptic.escape"></a>

### ecliptic.escape ⇒ <code>Object</code>
Request escape from 'point' to 'sponsor'.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Escapee's point number. |
| sponsor | <code>Number</code> | Sponsor's point number. |

<a name="module_ecliptic.cancelEscape"></a>

### ecliptic.cancelEscape ⇒ <code>Object</code>
Cancel the currently set escape for a point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Escapee's point number. |

<a name="module_ecliptic.adopt"></a>

### ecliptic.adopt ⇒ <code>Object</code>
As the sponsor, accept the escapee.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| escapee | <code>Number</code> | Escapee's point number. |

<a name="module_ecliptic.reject"></a>

### ecliptic.reject ⇒ <code>Object</code>
As the sponsor, reject the escapee's escape request.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| escapee | <code>Number</code> | Escapee's point number. |

<a name="module_ecliptic.detach"></a>

### ecliptic.detach ⇒ <code>Object</code>
As the sponsor, stop sponsoring the point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| sponsor | <code>Number</code> | Sponsor's point number. |
| point | <code>Number</code> | Point number. |

<a name="module_ecliptic.setDelegate"></a>

### ecliptic.setDelegate ⇒ <code>Object</code>
Configure the delegate address for all points owned by the message sender.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| delegate | <code>String</code> | The delegate's address. |

<a name="module_ecliptic.startUpgradePoll"></a>

### ecliptic.startUpgradePoll ⇒ <code>Object</code>
As a galaxy, start a poll for the ecliptic upgrade proposal.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>Object</code> | The ecliptic upgrade proposal. |

<a name="module_ecliptic.startDocumentPoll"></a>

### ecliptic.startDocumentPoll ⇒ <code>Object</code>
As a galaxy, start a poll for a proposal.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal document. |

<a name="module_ecliptic.castUpgradeVote"></a>

### ecliptic.castUpgradeVote ⇒ <code>Object</code>
As a galaxy, cast a vote on the ecliptic upgrade proposal.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>Object</code> | The upgrade proposal. |
| vote | <code>Bool</code> | True if yes, false otherwise. |

<a name="module_ecliptic.castDocumentVote"></a>

### ecliptic.castDocumentVote ⇒ <code>Object</code>
As a galaxy, cast a vote on the proposal.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal document. |
| vote | <code>Bool</code> | True if yes, false otherwise. |

<a name="module_ecliptic.updateUpgradePoll"></a>

### ecliptic.updateUpgradePoll ⇒ <code>Object</code>
Check whether the proposal has achieved majority, upgrading to it if so.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| proposal | <code>Object</code> | The upgrade proposal. |

<a name="module_ecliptic.updateDocumentPoll"></a>

### ecliptic.updateDocumentPoll ⇒ <code>Object</code>
Check whether the proposal has achieved majority.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| proposal | <code>Object</code> | The proposal document. |

<a name="module_ecliptic.createGalaxy"></a>

### ecliptic.createGalaxy ⇒ <code>Object</code>
Grant the target address ownership of the galaxy and register it for voting.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| target | <code>String</code> | The target address. |

<a name="module_ecliptic.setDnsDomains"></a>

### ecliptic.setDnsDomains ⇒ <code>Object</code>
Set primary, secondary, adn tertiary DNS domains for the ecliptic.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| primary | <code>String</code> | Primary DNS address. |
| secondary | <code>String</code> | Secondary DNS address. |
| tertiary | <code>String</code> | Tertiary DNS address. |

