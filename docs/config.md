# `config`

Configuring the library. Mainly for setting the Ethereum account to use with
Web3 and to specify contract addresses. Do these before calling other functions.

#### `setServerUrl(url)`

Configure Web3 to use the given `url` as its server node.

#### `async setPrivateKey(hd, path, index)`

Set the HDKey `hd`, path `path`, and index `index` of the address to use.

Returns the public address of the account at `index`.

#### `async setHdAccount(path, index)`

Set the path `path` and index `index` of the address to use. Call this after
calling `setPrivateKey()` if you want to switch to a different address from the
one originally specified.

Returns the public address of the account at `index`.

#### `setPublicAccount(address)`

Set the public address to use as account.

#### `async initializeContracts(shipsAddress, constitutionAddress, pollsAddress)`

Set the addresses of the contracts.

If `constitutionAddress` or `pollsAddress` are not given, they are read off the
blockchain using Web3.

#### `async initializeContractsDefault()`

Set the Ships address to the official on-chain address, then read the
Constitution and Polls addresses using Web3.

#### `setPool(poolAddress)`

Set the address of the Pool contract.
