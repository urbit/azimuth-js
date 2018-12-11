
module.exports.getEclipticPoll = (contracts, proposal) => {
  return contracts.polls.methods.eclipticPolls(proposal).call();
}

module.exports.getDocumentPoll = (contracts, proposal) => {
  return contracts.polls.methods.documentPolls(proposal).call();
}

module.exports.eclipticHasAchievedMajority = (contracts, proposal) => {
  return contracts.polls.methods.eclipticHasAchievedMajority(proposal).call();
}

module.exports.documentHasAchievedMajority = (contracts, proposal) => {
  return contracts.polls.methods.documentHasAchievedMajority(proposal).call();
}

module.exports.hasVotedOnEclipticPoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnEclipticPoll(galaxy, proposal).call();
}

module.exports.hasVotedOnDocumentPoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnDocumentPoll(galaxy, proposal).call();
}

module.exports.updateDocumentPoll = (contracts, proposal) => {
  return contracts.polls.methods.updateDocumentPoll(proposal).call();
}

