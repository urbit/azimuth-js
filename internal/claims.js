const gen = require("./genTransaction");

module.exports.addClaim = (contracts, _point, _protocol, _claim, _dossier) =>
  gen.tx(contracts.claims, "addClaim", _point, _protocol, _claim, _dossier);

module.exports.removeClaim = (contracts, _point, _protocol, _claim) =>
  gen.tx(contracts.claims, "removeClaim", _point, _protocol, _claim);


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
        claim.protocol !== "" || claim.claim !== ""
    )
  );
