const coder = require('web3-eth-abi').AbiCoder()
const gen = require('./genTransaction')

module.exports.addClaim = (contracts, _point, _protocol, _claim, _dossier) =>
  gen.tx(contracts.claims, 'addClaim', _point, _protocol, _claim, _dossier)

module.exports.getClaim = (contracts, whose, index) =>
  contracts.claims.methods.claims(whose, index).call()

module.exports.getAllClaims = (contracts, whose) =>
  contracts.multicall.methods.aggregate(
    [...Array(16).keys()].map(i => 
      ([contracts.claims.address,
        contracts.claims.methods.claims(whose, i).encodeABI()
      ]))
  ).call().then(
    rets => rets.returnData
      .map(ret => coder.decodeParameters(['string', 'string', 'bytes'], ret))
      .filter(claim => claim[0] !== '' || claim[1] !== '' && claim[2] || null)
  )
