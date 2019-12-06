
module.exports.getDocumentProposals = (contracts) =>
  contracts.polls.methods.getDocumentProposals().call()

module.exports.getUpgradeProposals = (contracts) =>
  contracts.polls.methods.getUpgradeProposals().call()

module.exports.getDocumentMajorities = (contracts) =>
  contracts.polls.methods.getDocumentMajorities().call()

module.exports.getUpgradePoll = (contracts, proposal) =>
  contracts.polls.methods.upgradePolls(proposal).call()

module.exports.getDocumentPoll = (contracts, proposal) =>
  contracts.polls.methods.documentPolls(proposal).call()

module.exports.eclipticHasAchievedMajority = (contracts, proposal) =>
  contracts.polls.methods.eclipticHasAchievedMajority(proposal).call()

module.exports.documentHasAchievedMajority = (contracts, proposal) =>
  contracts.polls.methods.documentHasAchievedMajority(proposal).call()

module.exports.hasVotedOnUpgradePoll = (contracts, galaxy, proposal) =>
  contracts.polls.methods.hasVotedOnUpgradePoll(galaxy, proposal).call()

module.exports.hasVotedOnDocumentPoll = (contracts, galaxy, proposal) =>
  contracts.polls.methods.hasVotedOnDocumentPoll(galaxy, proposal).call()

module.exports.updateDocumentPoll = (contracts, proposal) =>
  contracts.polls.methods.updateDocumentPoll(proposal).call()

