
const a = require('chai').assert;

function can(res)
{
  return a.isTrue(res.result, res.reason);
}

function cant(res, reason)
{
  a.isFalse(res.result);
  return a.equal(res.reason, reason);
}

module.exports = {
  can,
  cant
}
