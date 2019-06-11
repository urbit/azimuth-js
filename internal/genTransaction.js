
// simple unsigned transaction generator
//
// grab the specified contract method, call it with the passed arguments (if
// there are any), and assemble a raw unsigned transaction.
//
function tx(contract, method, ...args) {
  let func = contract.methods[method]

  let called =
      args === null
    ? func.call()
    : func.apply(this, args)

  let data = called.encodeABI()

  return { to: contract._address, data: data, value: 0 }
}

module.exports = {
  tx
}
