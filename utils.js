// misc utility functions
//NOTE most of these should probably be standardized
//     and go into a js lib of their own

const ethUtil = require('ethereumjs-util');

//
// ships
//

function getPrefix(ship)
{
  if (ship < 65536)
  {
    return ship % 256;
  }
  return ship % 65536;
}

let ShipClass = {
  Galaxy: 0,
  Star: 1,
  Planet: 2
}

function getShipClass(ship)
{
  if (ship < 256) return ShipClass.Galaxy;
  if (ship < 65536) return ShipClass.Star;
  return ShipClass.Planet;
}

//
// transactions
//

function protoTx(from, target, callData, value)
{
  if (typeof callData === 'object') callData = callData.encodeABI();
  return {
    from: from,
    to: target,
    data: callData,
    value: value || 0x0
  };
}

//
// input validation
//

const maxGalaxy = 255;
const maxStar = 65535;
const maxPlanet = 4294967295;

function isShip(ship)
{
  return (typeof ship === 'number' && ship >= 0 && ship <= maxPlanet);
}

function isGalaxy(ship)
{
  return (typeof ship === 'number' && ship >= 0 && ship <= maxGalaxy);
}

function isStar(ship)
{
  return (typeof ship === 'number' && ship > maxGalaxy && ship <= maxStar);
}

function isPlanet(ship)
{
  return (typeof ship === 'number' && ship > maxStar && ship <= maxPlanet);
}

function isParent(ship)
{
  return (typeof ship === 'number' && ship > 0 && ship <= maxStar);
}

function isChild(ship)
{
  return (typeof ship === 'number' && ship > maxGalaxy && ship <= maxPlanet);
}

function isBytes32(bytes32)
{
  return (typeof bytes32 === 'object' && bytes32.length <= 32);
}

function isAddress(address)
{
  if (typeof address !== 'string') return false;
  if (/[A-Z]/.test(address))
  {
    return ethUtil.isValidChecksumAddress(address);
  } else {
    return ethUtil.isValidAddress(address);
  }
}

function addressEquals(a1, a2)
{
  return (ethUtil.toChecksumAddress(a1) === ethUtil.toChecksumAddress(a2));
}

function isZeroAddress(address)
{
  return (address === 0 || address === '0' || address === '0x0' ||
          ethUtil.isZeroAddress(address));
}

module.exports = {
  ShipClass,
  getPrefix,
  getShipClass,
  //
  protoTx,
  //
  isShip,
  isGalaxy,
  isStar,
  isPlanet,
  isParent,
  isChild,
  isBytes32,
  isAddress,
  addressEquals,
  isZeroAddress
}
