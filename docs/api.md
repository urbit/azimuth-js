## Modules

<dl>
<dt><a href="#module_azimuth">azimuth</a></dt>
<dd><p>Azimuth API</p>
</dd>
<dt><a href="#module_check">check</a></dt>
<dd><p>Contract checks, assertions, and verifications</p>
</dd>
<dt><a href="#module_claims">claims</a></dt>
<dd><p>Claims API</p>
</dd>
<dt><a href="#module_contracts">contracts</a></dt>
<dd><p>Contracts API</p>
</dd>
<dt><a href="#module_delegatedSending">delegatedSending</a></dt>
<dd><p>Delegated Sending</p>
</dd>
<dt><a href="#module_ecliptic">ecliptic</a></dt>
<dd><p>Ecliptic API</p>
</dd>
<dt><a href="#module_index">index</a></dt>
<dd><p>azimuth-js</p>
</dd>
<dt><a href="#module_polls">polls</a></dt>
<dd><p>Polls API</p>
</dd>
<dt><a href="#module_txn">txn</a></dt>
<dd><p>Transaction handling</p>
</dd>
<dt><a href="#module_utils">utils</a></dt>
<dd><p>Utilities</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#getCommitment">getCommitment</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Return the details of a commitment.</p>
</dd>
<dt><a href="#getRemainingStars">getRemainingStars</a> ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code></dt>
<dd><p>Return the list of stars that have been deposited into, but not yet
withdrawn from a commitment.</p>
</dd>
<dt><a href="#getBatches">getBatches</a> ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code></dt>
<dd><p>Return the configured sizes of the batches for the commitment.</p>
</dd>
<dt><a href="#verifyBalance">verifyBalance</a> ⇒ <code>Promise.&lt;Bool&gt;</code></dt>
<dd><p>Return whether the amount of stars deposited into the commitment checks out.</p>
</dd>
<dt><a href="#getStartTime">getStartTime</a> ⇒ <code>Promise.&lt;Number&gt;</code></dt>
<dd><p>Return the timestamp at which the release was started.</p>
</dd>
<dt><a href="#getWithdrawn">getWithdrawn</a> ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code></dt>
<dd><p>Return the amount of stars a participant has already withdrawn from
each of their batches at the current time</p>
</dd>
<dt><a href="#getWithdrawLimit">getWithdrawLimit</a> ⇒ <code>Promise.&lt;Number&gt;</code></dt>
<dd><p>Return the amount of stars a participant is allowed to withdraw from
one of their batches at the current time.</p>
</dd>
<dt><a href="#getApprovedTransfer">getApprovedTransfer</a> ⇒ <code>Promise.&lt;String&gt;</code></dt>
<dd><p>Return the address this commitment can be transferred to.</p>
</dd>
<dt><a href="#getForfeited">getForfeited</a> ⇒ <code>Promise.&lt;Array.&lt;Bool&gt;&gt;</code></dt>
<dd><p>Return whether or not each of the batches have been forfeited at the
current time.</p>
</dd>
<dt><a href="#approveCommitmentTransfer">approveCommitmentTransfer</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Approve the transfer of a commitment to another address.</p>
</dd>
<dt><a href="#transferCommitment">transferCommitment</a> ⇒ <code>Object</code></dt>
<dd><p>Make an approved transfer of the specified commitment to the caller&#39;s address.</p>
</dd>
<dt><a href="#withdraw">withdraw</a> ⇒ <code>Object</code></dt>
<dd><p>Withdraw one star from a batch to the caller&#39;s address.</p>
</dd>
<dt><a href="#withdrawTo">withdrawTo</a> ⇒ <code>Object</code></dt>
<dd><p>Withdraw one star from a batch to the specified address.</p>
</dd>
<dt><a href="#forfeit">forfeit</a> ⇒ <code>Object</code></dt>
<dd><p>Forfeit stars contained in a batch with missed deadline, and all after it.</p>
</dd>
<dt><a href="#analyzeCondition">analyzeCondition</a> ⇒ <code>Object</code></dt>
<dd><p>Analyze a condition for satisfaction.</p>
</dd>
<dt><a href="#getBatch">getBatch</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Return the details of a batch.</p>
</dd>
<dt><a href="#getRemainingStars">getRemainingStars</a> ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code></dt>
<dd><p>Return the list of stars that have been deposited into, but not yet
withdrawn from a batch.</p>
</dd>
<dt><a href="#verifyBalance">verifyBalance</a> ⇒ <code>Promise.&lt;Bool&gt;</code></dt>
<dd><p>Return whether the amount of stars deposited into the batch checks out.</p>
</dd>
<dt><a href="#getStartTime">getStartTime</a> ⇒ <code>Promise.&lt;Number&gt;</code></dt>
<dd><p>Return the timestamp at which the release was started.</p>
</dd>
<dt><a href="#getWithdrawLimit">getWithdrawLimit</a> ⇒ <code>Promise.&lt;Number&gt;</code></dt>
<dd><p>Return the amount of stars a participant is allowed to withdraw from their
batch at the current time.</p>
</dd>
<dt><a href="#getApprovedTransfer">getApprovedTransfer</a> ⇒ <code>Promise.&lt;String&gt;</code></dt>
<dd><p>Return the address this batch can be transferred to.</p>
</dd>
<dt><a href="#approveBatchTransfer">approveBatchTransfer</a> ⇒ <code>Object</code></dt>
<dd><p>Approve the transfer of a batch to another address.</p>
</dd>
<dt><a href="#transferBatch">transferBatch</a> ⇒ <code>Object</code></dt>
<dd><p>Make an approved transfer of the specified batch to the caller&#39;s address.</p>
</dd>
<dt><a href="#withdraw">withdraw</a> ⇒ <code>Object</code></dt>
<dd><p>Withdraw one star to the caller&#39;s address.</p>
</dd>
<dt><a href="#withdrawTo">withdrawTo</a> ⇒ <code>Object</code></dt>
<dd><p>Withdraw one star to the specified address.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getConditionsState">getConditionsState(contracts)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Return conditions configuration and state data.</p>
</dd>
</dl>

<a name="module_azimuth"></a>

## azimuth
Azimuth API


* [azimuth](#module_azimuth)
    * [~mainnet](#module_azimuth..mainnet)
    * [~getSponsoring](#module_azimuth..getSponsoring) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [~getSponsoringCount](#module_azimuth..getSponsoringCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getEscapeRequests](#module_azimuth..getEscapeRequests) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getEscapeRequestsCount](#module_azimuth..getEscapeRequestsCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~owner](#module_azimuth..owner) ⇒ <code>Promise.&lt;String&gt;</code>
    * [~getOwnedPoints](#module_azimuth..getOwnedPoints) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getOwnedPointCount](#module_azimuth..getOwnedPointCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getOwnedPointAtIndex](#module_azimuth..getOwnedPointAtIndex) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~canManage](#module_azimuth..canManage) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getManagerForCount](#module_azimuth..getManagerForCount) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~getManagerFor](#module_azimuth..getManagerFor) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~isVotingProxy](#module_azimuth..isVotingProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
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
    * [~getSpawned(contracts, point)](#module_azimuth..getSpawned) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
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
    * [~getPoint(contracts, point, what)](#module_azimuth..getPoint) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~getUnspawnedChildren(contracts, point)](#module_azimuth..getUnspawnedChildren) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [~getActivationBlock(contracts, point, minBlock, maxBlock)](#module_azimuth..getActivationBlock) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [~isManagementProxy(contracts, point, address)](#module_azimuth..isManagementProxy) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~getManagementProxy(contracts, point)](#module_azimuth..getManagementProxy) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="module_azimuth..mainnet"></a>

### azimuth~mainnet
The Azimuth contract's address on the Ethereum mainnet.

Unlike that of the Ecliptic, Polls, etc. contracts, the Azimuth contract's
address never changes.  It is also registered as 'azimuth.eth' on ENS.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
<a name="module_azimuth..getSponsoring"></a>

### azimuth~getSponsoring ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Get an array of all points the target point is sponsoring.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - The points being sponsored.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getSponsoringCount"></a>

### azimuth~getSponsoringCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get the number of points the target point is sponsoring.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The amount of points being sponsored.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getEscapeRequests"></a>

### azimuth~getEscapeRequests ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get a list of points that are requesting escape to a sponsor.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - An array of points requesting escape  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getEscapeRequestsCount"></a>

### azimuth~getEscapeRequestsCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get the number of points that are requesting escape to a sponsor.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The number of points requesting escape  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..owner"></a>

### azimuth~owner ⇒ <code>Promise.&lt;String&gt;</code>
Get the azimuth contract owner.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The contract owner's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="module_azimuth..getOwnedPoints"></a>

### azimuth~getOwnedPoints ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points that an address owns.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - An array of owned azimuth.  

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
Get the point at the given index of the array containing an owner's azimuth.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The point at the provided index.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |
| index | <code>Number</code> | The index of the array. |

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

<a name="module_azimuth..getManagerForCount"></a>

### azimuth~getManagerForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address is managing.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of points being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getManagerFor"></a>

### azimuth~getManagerFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is managing.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The points being managed.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..isVotingProxy"></a>

### azimuth~isVotingProxy ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a voting proxy for an owner.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True is voting proxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The owner's address. |
| address | <code>String</code> | The voting proxy's address. |

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
| address | <code>String</code> | The target address. |

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
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of azimuth.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getSpawningFor"></a>

### azimuth~getSpawningFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is a spawn proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The azimuth.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getTransferringForCount"></a>

### azimuth~getTransferringForCount ⇒ <code>Promise.&lt;Number&gt;</code>
Get a count of the points an address is a transfer proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The count of azimuth.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The target address. |

<a name="module_azimuth..getTransferringFor"></a>

### azimuth~getTransferringFor ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the points an account is a transfer proxy for.

**Kind**: inner constant of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The azimuth.  

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
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getSpawned"></a>

### azimuth~getSpawned(contracts, point) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get an array of all child points the target point has spawned.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The spawned points.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

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

<a name="module_azimuth..getPoint"></a>

### azimuth~getPoint(contracts, point, what) ⇒ <code>Promise.&lt;Object&gt;</code>
Get a point object, given its point id.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A point object with the requested data.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| what | <code>string</code> | 'state', 'rights', defaults to 'both' |

<a name="module_azimuth..getUnspawnedChildren"></a>

### azimuth~getUnspawnedChildren(contracts, point) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get a list of unspawned/spawnable points

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - - Unspawned children of point  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_azimuth..getActivationBlock"></a>

### azimuth~getActivationBlock(contracts, point, minBlock, maxBlock) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the block at which the point was activated. Returns zero if it hasn't
been activated yet.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - - Block of activation.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| minBlock | <code>Number</code> | (optional) Block to start search at. (Default 0.) |
| maxBlock | <code>Number</code> | (optional) Block to end search at. (Default latest.) |

<a name="module_azimuth..isManagementProxy"></a>

### azimuth~isManagementProxy(contracts, point, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if an address is a management proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if address is management proxy, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |
| address | <code>String</code> | Target address. |

<a name="module_azimuth..getManagementProxy"></a>

### azimuth~getManagementProxy(contracts, point) ⇒ <code>Promise.&lt;String&gt;</code>
Get the management proxy for a point.

**Kind**: inner method of [<code>azimuth</code>](#module_azimuth)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The management proxy's address.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> \| <code>Object</code> | Point number or point object. |

<a name="module_check"></a>

## check
Contract checks, assertions, and verifications


* [check](#module_check)
    * [~isPoint(point)](#module_check..isPoint) ⇒ <code>Bool</code>
    * [~isGalaxy(point)](#module_check..isGalaxy) ⇒ <code>Bool</code>
    * [~isStar(point)](#module_check..isStar) ⇒ <code>Bool</code>
    * [~isPlanet(point)](#module_check..isPlanet) ⇒ <code>Bool</code>
    * [~isPrefix(point)](#module_check..isPrefix) ⇒ <code>Bool</code>
    * [~isChild(point)](#module_check..isChild) ⇒ <code>Bool</code>
    * [~pollIsActive(poll)](#module_check..pollIsActive) ⇒ <code>Bool</code>
    * [~canStartPoll(poll)](#module_check..canStartPoll) ⇒ <code>Bool</code>
    * [~hasOwner(contracts, pointId)](#module_check..hasOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~isEclipticOwner(contracts, address)](#module_check..isEclipticOwner) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~canCreateGalaxy(contracts, pointId, address)](#module_check..canCreateGalaxy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSpawn(contracts, pointId, address)](#module_check..canSpawn) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSetSpawnProxy(contracts, pointId, address)](#module_check..canSetSpawnProxy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canTransferPoint(contracts, pointId, sender, target)](#module_check..canTransferPoint) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSetTransferProxy(contracts, pointId, address)](#module_check..canSetTransferProxy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canEscape(contracts, point, sponsor, address)](#module_check..canEscape) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~checkActivePointOwner(contracts, point, address)](#module_check..checkActivePointOwner) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~checkActivePointManager(contracts, point, address)](#module_check..checkActivePointManager) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canConfigureKeys(contracts, point, address)](#module_check..canConfigureKeys) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canAdopt(contracts, escapee, address)](#module_check..canAdopt) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canReject(contracts, escapee, address)](#module_check..canReject) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canDetach(contracts, point, address)](#module_check..canDetach) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~checkActivePointVoter(contracts, point, voter)](#module_check..checkActivePointVoter) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canStartUpgradePoll(web3, contracts, galaxy, proposal, address)](#module_check..canStartUpgradePoll) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canStartDocumentPoll(contracts, galaxy, proposal, address)](#module_check..canStartDocumentPoll) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canCastUpgradeVote(contracts, galaxy, proposal, address)](#module_check..canCastUpgradeVote) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canCastDocumentVote(contracts, galaxy, proposal, address)](#module_check..canCastDocumentVote) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSetDnsDomains(contracts, address)](#module_check..canSetDnsDomains) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [~lsrCanWithdraw(contracts, address)](#module_check..lsrCanWithdraw) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~lsrCanTransferBatch(contracts, from, to)](#module_check..lsrCanTransferBatch) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~csrCanWithdraw(contracts, address)](#module_check..csrCanWithdraw) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~csrCanTransferBatch(contracts, from, to)](#module_check..csrCanTransferBatch) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~csrCanForfeit(contracts, batch, address)](#module_check..csrCanForfeit) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSetPoolSize(point, address)](#module_check..canSetPoolSize) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~canSendInvitePoint(as, point, to, address)](#module_check..canSendInvitePoint) ⇒ <code>Promise.&lt;Object&gt;</code>

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

<a name="module_check..isPrefix"></a>

### check~isPrefix(point) ⇒ <code>Bool</code>
Check if a point is a prefix of another point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Bool</code> - True if a prefix, false otherwise.  

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

### check~canCreateGalaxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if an address can create the specified galaxy.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSpawn"></a>

### check~canSpawn(contracts, pointId, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if an address can spawn the given point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSetSpawnProxy"></a>

### check~canSetSpawnProxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if an address can set a spawn proxy for the given point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canTransferPoint"></a>

### check~canTransferPoint(contracts, pointId, sender, target) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the sender address can send the provided point to the target
address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| sender | <code>String</code> | Sender's address. |
| target | <code>String</code> | Target address. |

<a name="module_check..canSetTransferProxy"></a>

### check~canSetTransferProxy(contracts, pointId, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can set a transfer proxy for the point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| pointId | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canEscape"></a>

### check~canEscape(contracts, point, sponsor, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the target address can make a point escape to the given sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| sponsor | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..checkActivePointOwner"></a>

### check~checkActivePointOwner(contracts, point, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a point is active and the target address is its owner.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..checkActivePointManager"></a>

### check~checkActivePointManager(contracts, point, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a point is active and the target address can manage it.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canConfigureKeys"></a>

### check~canConfigureKeys(contracts, point, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if an address can configure public keys for a point.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canAdopt"></a>

### check~canAdopt(contracts, escapee, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the target address can adopt the escapee as its new sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| escapee | <code>Number</code> | Escapee's point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canReject"></a>

### check~canReject(contracts, escapee, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the target address can reject the escapee's request to the given
sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| escapee | <code>Number</code> | Escapee's point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..canDetach"></a>

### check~canDetach(contracts, point, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the target address can detach a point from its sponsor.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| address | <code>String</code> | Target address. |

<a name="module_check..checkActivePointVoter"></a>

### check~checkActivePointVoter(contracts, point, voter) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a point is active and an address can vote for it.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |
| voter | <code>String</code> | Target address. |

<a name="module_check..canStartUpgradePoll"></a>

### check~canStartUpgradePoll(web3, contracts, galaxy, proposal, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a target address and point can initiate a upgrade poll at the
 given address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Object</code> | A web3 object. |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal address. |
| address | <code>String</code> | Target address. |

<a name="module_check..canStartDocumentPoll"></a>

### check~canStartDocumentPoll(contracts, galaxy, proposal, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a target address and point can initiate the given proposal.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal address. |
| address | <code>String</code> | Target address. |

<a name="module_check..canCastUpgradeVote"></a>

### check~canCastUpgradeVote(contracts, galaxy, proposal, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a target address and point can vote on the proposal at the target
address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal address. |
| address | <code>String</code> | Target address. |

<a name="module_check..canCastDocumentVote"></a>

### check~canCastDocumentVote(contracts, galaxy, proposal, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if a target address and point can vote on the proposal at the given
address.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | A (galaxy) point number. |
| proposal | <code>String</code> | The proposal address. |
| address | <code>String</code> | Target address. |

<a name="module_check..canSetDnsDomains"></a>

### check~canSetDnsDomains(contracts, address) ⇒ <code>Promise.&lt;Bool&gt;</code>
Check if the target address can set the DNS domains for the ecliptic.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - True if so, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | Target address. |

<a name="module_check..lsrCanWithdraw"></a>

### check~lsrCanWithdraw(contracts, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can withdraw a star from their batch at this moment.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="module_check..lsrCanTransferBatch"></a>

### check~lsrCanTransferBatch(contracts, from, to) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can withdraw a star from their batch at this moment.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | The participant/registered address for the batch. |
| to | <code>String</code> | The intended new address of the participant. |

<a name="module_check..csrCanWithdraw"></a>

### check~csrCanWithdraw(contracts, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can withdraw a star from their commitment at this moment.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="module_check..csrCanTransferBatch"></a>

### check~csrCanTransferBatch(contracts, from, to) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can withdraw a star from their commitment at this moment.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| from | <code>String</code> | The participant/registered address for the commitment. |
| to | <code>String</code> | The intended new address of the participant. |

<a name="module_check..csrCanForfeit"></a>

### check~csrCanForfeit(contracts, batch, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can forfeit their commitment starting at the batch.

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| batch | <code>Number</code> | The batch they want to forfeit from. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="module_check..canSetPoolSize"></a>

### check~canSetPoolSize(point, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if the address can give invites to point

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number to give invites to |
| address | <code>String</code> | The caller address |

<a name="module_check..canSendInvitePoint"></a>

### check~canSendInvitePoint(as, point, to, address) ⇒ <code>Promise.&lt;Object&gt;</code>
Check if as can send point as an invite to to

**Kind**: inner method of [<code>check</code>](#module_check)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A result and reason pair  

| Param | Type | Description |
| --- | --- | --- |
| as | <code>Number</code> | The point that would send the invite |
| point | <code>Number</code> | The point that would be sent as invite |
| to | <code>String</code> | The Ethereum address recipient of the invite |
| address | <code>String</code> | The caller address |

<a name="module_claims"></a>

## claims
Claims API

<a name="module_contracts"></a>

## contracts
Contracts API


* [contracts](#module_contracts)
    * [~initContracts(web3, addresses)](#module_contracts..initContracts) ⇒ <code>Object</code>
    * [~initContractsPartial(web3, azimuthAddress)](#module_contracts..initContractsPartial) ⇒ <code>Object</code>

<a name="module_contracts..initContracts"></a>

### contracts~initContracts(web3, addresses) ⇒ <code>Object</code>
Create a collection of Urbit contracts, given a web3 instance and their
provided addresses.

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <code>Object</code> - The initialised contracts.  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Object</code> | A web3 instance. |
| addresses | <code>Object</code> | An addresses object.  Must provide addresses for   ecliptic, azimuth, and polls contracts, at those respective key names. |

<a name="module_contracts..initContractsPartial"></a>

### contracts~initContractsPartial(web3, azimuthAddress) ⇒ <code>Object</code>
Initialise as many Urbit contracts as possible, given a azimuth contract
address.

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <code>Object</code> - The initialised contracts.  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Object</code> | A web3 instance. |
| azimuthAddress | <code>String</code> | An address to a azimuth contract. |

<a name="module_delegatedSending"></a>

## delegatedSending
Delegated Sending


* [delegatedSending](#module_delegatedSending)
    * [.pools](#module_delegatedSending.pools) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.getInvited](#module_delegatedSending.getInvited) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.invitedBy](#module_delegatedSending.invitedBy) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.canSend](#module_delegatedSending.canSend) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.getPool](#module_delegatedSending.getPool) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.getPoolStars](#module_delegatedSending.getPoolStars) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.canReceive](#module_delegatedSending.canReceive) ⇒ <code>Promise.&lt;Bool&gt;</code>
    * [.setPoolSize](#module_delegatedSending.setPoolSize) ⇒ <code>Object</code>
    * [.sendPoint](#module_delegatedSending.sendPoint) ⇒ <code>Object</code>
    * [.getTotalUsableInvites(point)](#module_delegatedSending.getTotalUsableInvites) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.getPlanetsToSend(as, amount)](#module_delegatedSending.getPlanetsToSend) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>

<a name="module_delegatedSending.pools"></a>

### delegatedSending.pools ⇒ <code>Promise.&lt;Number&gt;</code>
Return the amount of invites left in the pool

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Number of invites remaining  

| Param | Type | Description |
| --- | --- | --- |
| pool | <code>Number</code> | Pool number |
| prefix | <code>Number</code> | Invites from this prefix |

<a name="module_delegatedSending.getInvited"></a>

### delegatedSending.getInvited ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Return the points invited by point

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - Points invited by point  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number |

<a name="module_delegatedSending.invitedBy"></a>

### delegatedSending.invitedBy ⇒ <code>Promise.&lt;Number&gt;</code>
Return the point that point was invited by

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The inviter point (0 if not invited)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number |

<a name="module_delegatedSending.canSend"></a>

### delegatedSending.canSend ⇒ <code>Promise.&lt;Bool&gt;</code>
Returns true if as can send point, false otherwise

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - Whether as can send point  

| Param | Type | Description |
| --- | --- | --- |
| as | <code>Number</code> | The inviter |
| point | <code>Number</code> | The point to send |

<a name="module_delegatedSending.getPool"></a>

### delegatedSending.getPool ⇒ <code>Promise.&lt;Number&gt;</code>
Get the invite pool point belongs to

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Pool number  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | Point number |

<a name="module_delegatedSending.getPoolStars"></a>

### delegatedSending.getPoolStars ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Get the stars that have put invites into the pool

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - Stars that touched the pool  

| Param | Type | Description |
| --- | --- | --- |
| pool | <code>Number</code> | Pool number |

<a name="module_delegatedSending.canReceive"></a>

### delegatedSending.canReceive ⇒ <code>Promise.&lt;Bool&gt;</code>
Returns true if receipients is eligible to receive a point, false otherwise

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - Whether recipient can receive a point  

| Param | Type | Description |
| --- | --- | --- |
| recipient | <code>String</code> | Ethereum address |

<a name="module_delegatedSending.setPoolSize"></a>

### delegatedSending.setPoolSize ⇒ <code>Object</code>
Give for (and their invite tree) access to size invites

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Object</code> - An unsigned transaction object  

| Param | Type | Description |
| --- | --- | --- |
| as | <code>Number</code> | prefix to give invites as |
| for | <code>Number</code> | point to give invites to |
| size | <code>Number</code> | amount of invites to give |

<a name="module_delegatedSending.sendPoint"></a>

### delegatedSending.sendPoint ⇒ <code>Object</code>
As as, send the point to to

**Kind**: static property of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Object</code> - An unsigned transaction object  

| Param | Type | Description |
| --- | --- | --- |
| as | <code>Number</code> | point to send the invite as |
| point | <code>Number</code> | the point to send as an invite |
| to | <code>String</code> | target Ethereum address |

<a name="module_delegatedSending.getTotalUsableInvites"></a>

### delegatedSending.getTotalUsableInvites(point) ⇒ <code>Promise.&lt;Number&gt;</code>
Returns the total amount of usable invites available to point.
Invites are usable if the star they're associated with has its spawn proxy
set to the Delegated Sending contract, and is still under its spawn limit.

**Kind**: static method of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - Total amount of invites  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Number</code> | The point whose invites to count |

<a name="module_delegatedSending.getPlanetsToSend"></a>

### delegatedSending.getPlanetsToSend(as, amount) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Generate a list of planets for as to send as invites
NOTE that the returned list isn't guaranteed to contain exactly amount items,
     it may return fewer in cases where not enough invites are available,
     usable, or spawn limits are being hit

**Kind**: static method of [<code>delegatedSending</code>](#module_delegatedSending)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - Pseudo-random list of planets that as can send  

| Param | Type | Description |
| --- | --- | --- |
| as | <code>Number</code> | point to send the planets with |
| amount | <code>Number</code> | amount of planets to generate |

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
    * [.setVotingProxy](#module_ecliptic.setVotingProxy) ⇒ <code>Object</code>
    * [.startUpgradePoll](#module_ecliptic.startUpgradePoll) ⇒ <code>Object</code>
    * [.startDocumentPoll](#module_ecliptic.startDocumentPoll) ⇒ <code>Object</code>
    * [.castUpgradeVote](#module_ecliptic.castUpgradeVote) ⇒ <code>Object</code>
    * [.castDocumentVote](#module_ecliptic.castDocumentVote) ⇒ <code>Object</code>
    * [.updateUpgradePoll](#module_ecliptic.updateUpgradePoll) ⇒ <code>Object</code>
    * [.updateDocumentPoll](#module_ecliptic.updateDocumentPoll) ⇒ <code>Object</code>
    * [.createGalaxy](#module_ecliptic.createGalaxy) ⇒ <code>Object</code>
    * [.setDnsDomains](#module_ecliptic.setDnsDomains) ⇒ <code>Object</code>
    * [.getSpawnsRemaining(contracts, point)](#module_ecliptic.getSpawnsRemaining) ⇒ <code>Promise.&lt;Number&gt;</code>

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
**Returns**: <code>Promise.&lt;Number&gt;</code> - Number of azimuth.  

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
Allow or disallow an operator to transfer ownership of all points owned by
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
Configure the management address for a point owned by the message sender.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | The point to manage. |
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
| escapee | <code>Number</code> | Escapee's point number. |

<a name="module_ecliptic.reject"></a>

### ecliptic.reject ⇒ <code>Object</code>
As the sponsor, reject the escapee's escape request.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| escapee | <code>Number</code> | Escapee's point number. |

<a name="module_ecliptic.detach"></a>

### ecliptic.detach ⇒ <code>Object</code>
As the sponsor, stop sponsoring the point.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_ecliptic.setVotingProxy"></a>

### ecliptic.setVotingProxy ⇒ <code>Object</code>
Configure the voting proxy address for the galaxy.

**Kind**: static property of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| galaxy | <code>Number</code> | Point number. |
| proxy | <code>String</code> | The proxy's address. |

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

<a name="module_ecliptic.getSpawnsRemaining"></a>

### ecliptic.getSpawnsRemaining(contracts, point) ⇒ <code>Promise.&lt;Number&gt;</code>
Get the amount of children point can still spawn before hitting the limit.

**Kind**: static method of [<code>ecliptic</code>](#module_ecliptic)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - The amount of children still spawnable from point.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| point | <code>Number</code> | Point number. |

<a name="module_index"></a>

## index
azimuth-js

<a name="module_polls"></a>

## polls
Polls API

<a name="module_txn"></a>

## txn
Transaction handling


* [txn](#module_txn)
    * [~signTransaction(web3, tx, privateKey)](#module_txn..signTransaction) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [~sendSignedTransaction(web3, signedTx)](#module_txn..sendSignedTransaction) ⇒ <code>Promise</code>

<a name="module_txn..signTransaction"></a>

### txn~signTransaction(web3, tx, privateKey) ⇒ <code>Promise.&lt;Object&gt;</code>
Sign an unsigned transaction with the provided private key.

If `tx.gas` is undefined, it will be estimated.  If `tx.gasPrice` is
undefined, a default is used.  If `tx.nonce` is undefined, Web3 will
retrieve the next nonce.  And if `tx.chainId` is undefined, Web3 fills it
in.

Note that Web3 cannot fill in most of those blanks when not connected to
a functioning node (i.e. "offline mode"), so those will have to be filled
in by the UI or user prior to signing.

**Kind**: inner method of [<code>txn</code>](#module_txn)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A signed transaction object with `messageHash`,
 `v`, `r`, `s`, and `rawTransaction` fields.  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Web3</code> | a web3 object. |
| tx | <code>Object</code> | an unsigned transaction. |
| privateKey | <code>Buffer</code> | a private key. |

<a name="module_txn..sendSignedTransaction"></a>

### txn~sendSignedTransaction(web3, signedTx) ⇒ <code>Promise</code>
Forward a signed transaction to the blockchain.

**Kind**: inner method of [<code>txn</code>](#module_txn)  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Web3</code> | a web3 object. |
| signedTx | <code>Object</code> | a signed transaction. |

<a name="module_utils"></a>

## utils
Utilities

<a name="module_utils..addressEquals"></a>

### utils~addressEquals(a1, a2) ⇒ <code>Bool</code>
Check if two addresses are equal.

**Kind**: inner method of [<code>utils</code>](#module_utils)  
**Returns**: <code>Bool</code> - True if the addresses are equal, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| a1 | <code>String</code> | an Ethereum address. |
| a2 | <code>String</code> | an Ethereum address. |

<a name="getCommitment"></a>

## getCommitment ⇒ <code>Promise.&lt;Object&gt;</code>
Return the details of a commitment.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A commitment object, with windup, rate, rateUnit,
amount, withdrawn.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="getRemainingStars"></a>

## getRemainingStars ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Return the list of stars that have been deposited into, but not yet
withdrawn from a commitment.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The stars left in the commitment.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="getBatches"></a>

## getBatches ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Return the configured sizes of the batches for the commitment.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The batch sizes for the commitment.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="verifyBalance"></a>

## verifyBalance ⇒ <code>Promise.&lt;Bool&gt;</code>
Return whether the amount of stars deposited into the commitment checks out.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if sufficient stars have been deposited.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="getStartTime"></a>

## getStartTime ⇒ <code>Promise.&lt;Number&gt;</code>
Return the timestamp at which the release was started.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Number&gt;</code> - A timestamp.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="getWithdrawn"></a>

## getWithdrawn ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Return the amount of stars a participant has already withdrawn from
each of their batches at the current time

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - the number of stars already withdrawn for
each batch.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="getWithdrawLimit"></a>

## getWithdrawLimit ⇒ <code>Promise.&lt;Number&gt;</code>
Return the amount of stars a participant is allowed to withdraw from
one of their batches at the current time.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Number&gt;</code> - the withdraw limit.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |
| batch | <code>Number</code> | The batch number to look up |

<a name="getApprovedTransfer"></a>

## getApprovedTransfer ⇒ <code>Promise.&lt;String&gt;</code>
Return the address this commitment can be transferred to.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;String&gt;</code> - The approved transfer address, 0x0 for none.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="getForfeited"></a>

## getForfeited ⇒ <code>Promise.&lt;Array.&lt;Bool&gt;&gt;</code>
Return whether or not each of the batches have been forfeited at the
current time.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Array.&lt;Bool&gt;&gt;</code> - the number of stars already withdrawn for
each batch.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the commitment. |

<a name="approveCommitmentTransfer"></a>

## approveCommitmentTransfer ⇒ <code>Promise.&lt;Object&gt;</code>
Approve the transfer of a commitment to another address.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Object&gt;</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The address to transfer to. |

<a name="transferCommitment"></a>

## transferCommitment ⇒ <code>Object</code>
Make an approved transfer of the specified commitment to the caller's address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The address to transfer from. |

<a name="withdraw"></a>

## withdraw ⇒ <code>Object</code>
Withdraw one star from a batch to the caller's address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| batch | <code>Number</code> | The batch number to withdraw from |

<a name="withdrawTo"></a>

## withdrawTo ⇒ <code>Object</code>
Withdraw one star from a batch to the specified address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| batch | <code>Number</code> | The batch number |
| address | <code>String</code> | The address to withdraw to. |

<a name="forfeit"></a>

## forfeit ⇒ <code>Object</code>
Forfeit stars contained in a batch with missed deadline, and all after it.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| batch | <code>Number</code> | The condition/batch to base forfeiture off. |

<a name="analyzeCondition"></a>

## analyzeCondition ⇒ <code>Object</code>
Analyze a condition for satisfaction.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| condition | <code>String</code> | The condition (index) to analyze. |

<a name="getBatch"></a>

## getBatch ⇒ <code>Promise.&lt;Object&gt;</code>
Return the details of a batch.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A batch object, with windup, rate, rateUnit,
amount, withdrawn.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="getRemainingStars"></a>

## getRemainingStars ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Return the list of stars that have been deposited into, but not yet
withdrawn from a batch.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - The stars left in the batch.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="verifyBalance"></a>

## verifyBalance ⇒ <code>Promise.&lt;Bool&gt;</code>
Return whether the amount of stars deposited into the batch checks out.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Bool&gt;</code> - true if sufficient stars have been deposited.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="getStartTime"></a>

## getStartTime ⇒ <code>Promise.&lt;Number&gt;</code>
Return the timestamp at which the release was started.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Number&gt;</code> - A timestamp.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="getWithdrawLimit"></a>

## getWithdrawLimit ⇒ <code>Promise.&lt;Number&gt;</code>
Return the amount of stars a participant is allowed to withdraw from their
batch at the current time.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;Number&gt;</code> - the withdraw limit.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="getApprovedTransfer"></a>

## getApprovedTransfer ⇒ <code>Promise.&lt;String&gt;</code>
Return the address this batch can be transferred to.

**Kind**: global variable  
**Returns**: <code>Promise.&lt;String&gt;</code> - The approved transfer address, 0x0 for none.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The participant/registered address for the batch. |

<a name="approveBatchTransfer"></a>

## approveBatchTransfer ⇒ <code>Object</code>
Approve the transfer of a batch to another address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The address to transfer to. |

<a name="transferBatch"></a>

## transferBatch ⇒ <code>Object</code>
Make an approved transfer of the specified batch to the caller's address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The address to transfer from. |

<a name="withdraw"></a>

## withdraw ⇒ <code>Object</code>
Withdraw one star to the caller's address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

<a name="withdrawTo"></a>

## withdrawTo ⇒ <code>Object</code>
Withdraw one star to the specified address.

**Kind**: global variable  
**Returns**: <code>Object</code> - An unsigned transaction object.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |
| address | <code>String</code> | The address to withdraw to. |

<a name="getConditionsState"></a>

## getConditionsState(contracts) ⇒ <code>Promise.&lt;Object&gt;</code>
Return conditions configuration and state data.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - An object containing conditions state, with
{ conditions, livelines, deadlines, timestamps } arrays.  

| Param | Type | Description |
| --- | --- | --- |
| contracts | <code>Object</code> | An Urbit contracts object. |

