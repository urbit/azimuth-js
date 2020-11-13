const coder = require("web3-eth-abi").AbiCoder();
const gen = require("./genTransaction");

module.exports.addClaim = (contracts, _point, _protocol, _claim, _dossier) =>
  gen.tx(contracts.claims, "addClaim", _point, _protocol, _claim, _dossier);

module.exports.getClaim = (contracts, whose, index) =>
  contracts.claims.methods.claims(whose, index).call();

module.exports.getAllClaims = (contracts, whose) =>
  Promise.all(
    [...Array(16).keys()].map((i) =>
      contracts.claims.methods.claims(whose, i).call()
    )
  ).then((claims) =>
    claims.filter(
      (claim) =>
        claim.claim !== "" || (claim.protocol !== "" && claim.dossier) || null
    )
  );
