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

