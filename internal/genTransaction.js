
// simple unsigned transaction generator
//
// grab the specified contract method, call it with the passed arguments (if
// there are any), and assemble a raw unsigned transaction.
//
function tx(contract, method, ...args) {
  let raw = (to, data, value) => ({
    to: to,
    data: data,
    value: value || 0x0
  })

  let func = contract.methods[method]

  let data =
      args === null
    ? func.call()
    : func.apply(this, args)

  let abi = data.encodeABI()

  return raw(contract._address, abi, 0)
}

module.exports = {
  tx
}
