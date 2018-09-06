
module.exports.getConstitutionPoll = (contracts, proposal) => {
  return contracts.polls.methods.constitutionPolls(proposal).call();
}

module.exports.getDocumentPoll = (contracts, proposal) => {
  return contracts.polls.methods.documentPolls(proposal).call();
}

module.exports.constitutionHasAchievedMajority = (contracts, proposal) => {
  return contracts.polls.methods.constitutionHasAchievedMajority(proposal).call();
}

module.exports.documentHasAchievedMajority = (contracts, proposal) => {
  return contracts.polls.methods.documentHasAchievedMajority(proposal).call();
}

module.exports.hasVotedOnConstitutionPoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnConstitutionPoll(galaxy, proposal).call();
}

module.exports.hasVotedOnDocumentPoll = (contracts, galaxy, proposal) => {
  return contracts.polls.methods.hasVotedOnDocumentPoll(galaxy, proposal).call();
}

module.exports.updateDocumentPoll = (contracts, proposal) => {
  return contracts.polls.methods.updateDocumentPoll(proposal).call();
}

