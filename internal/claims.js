const gen = require('./genTransaction')

module.exports.addClaim = (contracts, _point, _protocol, _claim, _dossier) =>
  gen.tx(contracts.claims, 'addClaim', _point, _protocol, _claim, _dossier)

module.exports.getClaim = (contracts, whose, index) =>
  contracts.claims.methods.claims(whose, index).call()
