
### `pool.`

#### Getters

#### `async getOneStar()`

Returns the token value of one star.

#### `async getBalance(address)`

If no `address` is provided, the configured account is used.

Returns the balance the `address` has with the pool.

#### `async getAllAssets()`

Returns an array of all the stars held in the pool.

#### `async getAssetCount()`

Returns the amount of stars held in the pool.

#### Checks and actions

#### `async canDeposit(star)`

Returns a true result if the account can deposit `star` into the pool.

#### `deposit(star)`

Returns a transaction for depositing `star` into the pool.

#### `async canWithdrawAny()`

Returns a true result if the account can withdraw a star from the pool.

#### `withdrawAny()`

Returns a transaction for withdrawing a star from the pool.

#### `async canWithdraw(star)`

Returns a true result if the account can withdraw `star` from the pool.

#### `withdraw(star)`

Returns a transaction for withdrawing `star` from the pool.
