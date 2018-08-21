let p; // polls contract

function setContract(polls)
{
  p = polls;
}

function getConstitutionPoll(proposal)
{
  return p.methods.constitutionPolls(proposal).call();
}

function getDocumentPoll(proposal)
{
  return p.methods.documentPolls(proposal).call();
}

function constitutionHasAchievedMajority(proposal)
{
  return p.methods.constitutionHasAchievedMajority(proposal).call();
}

function documentHasAchievedMajority(proposal)
{
  return p.methods.documentHasAchievedMajority(proposal).call();
}

function canStartPoll(poll)
{
  let now = Math.round(new Date().getTime()/1000);
  return (now > (poll.start + poll.duration + poll.cooldown));
}

function hasVotedOnConstitutionPoll(galaxy, proposal)
{
  return p.methods.hasVotedOnConstitutionPoll(galaxy, proposal).call();
}

function hasVotedOnDocumentPoll(galaxy, proposal)
{
  return p.methods.hasVotedOnDocumentPoll(galaxy, proposal).call();
}

function pollIsActive(poll)
{
  let now = Math.round(new Date().getTime()/1000);
  return (now < (poll.start + poll.duration));
}

module.exports = {
  setContract,
  getConstitutionPoll,
  getDocumentPoll,
  constitutionHasAchievedMajority,
  documentHasAchievedMajority,
  canStartPoll,
  hasVotedOnConstitutionPoll,
  hasVotedOnDocumentPoll,
  pollIsActive
}
