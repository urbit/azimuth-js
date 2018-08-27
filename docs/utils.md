# `utils`

## Ships

#### `getPrefix(ship)`

Returns the hierarchical parent of `ship`. Galaxies are their own parent.

#### `ShipClass`

```
{ Galaxy: 0,
  Star: 1,
  Planet: 2 }
```

#### `getShipClass(ship)`

Returns the class of `ship`.

## Input validation

#### `isShip(ship)`

Returns true if `ship` is a valid ship number.

#### `isGalaxy(ship)`

Returns true if `ship` is a galaxy.

#### `isStar(ship)`

Returns true if `ship` is a star.

#### `isPlanet(ship)`

Returns true if `ship` is a planet.

#### `isParent(ship)`

Returns true if `ship` is either a galaxy or a star.

#### `isChild(ship)`

Returns true if `ship` is either a star or a planet.

#### `isBytes32(bytes32)`

Returns true if `bytes32` is a byte-array of 32 or less bytes.

#### `isAddress(address)`

Returns true if `address` is a valid Ethereum address.

#### `addressEquals(a1, a2)`

Returns true if `a1` and `a2` are the same address, ignoring checksumming.

#### `isZeroAddress(address)`

Returns true if `address` is the zero address.
