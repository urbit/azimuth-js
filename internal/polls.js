
module.exports.getUpgradePoll = (contracts, proposal) => {
  return contracts.polls.methods.upgradePolls(proposal).call();
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

module.exports.hasVotedOnUpgradePoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnUpgradePoll(galaxy, proposal).call();
}

module.exports.hasVotedOnDocumentPoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnDocumentPoll(galaxy, proposal).call();
}

module.exports.updateDocumentPoll = (contracts, proposal) => {
  return contracts.polls.methods.updateDocumentPoll(proposal).call();
}

