<a name="module_contracts"></a>

## contracts
Contracts API

<a name="module_contracts..initContracts"></a>

### contracts~initContracts(web3, ship) ⇒ <code>Object</code>
Create a collection of Urbit contracts, given a web3 instance and their
provided addresses.

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <code>Object</code> - The initialised contracts.  

| Param | Type | Description |
| --- | --- | --- |
| web3 | <code>Object</code> | A web3 instance. |
| ship | <code>Object</code> | An addresses object.  Must provide addresses for   constitution, ships, polls, and pool contracts, at those respective key   names. |

