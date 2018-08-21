// misc utility functions

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
  if (ship < 256) return Class.Galaxy;
  if (ship < 65536) return Class.Star;
  return Class.Planet;
}

//
// transactions
//

function protoTx(target, callData, value)
{
  if (typeof callData === 'object') callData = callData.encodeABI();
  return {
    from: account,
    to: target,
    data: callData,
    value: value || 0x0
  };
}

module.exports = {
  ShipClass,
  getPrefix,
  getShipClass,
  //
  protoTx
}
