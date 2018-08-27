'use strict';

//NOTE expects to be run against fresh chain state

const a = require('chai').assert;
const h = require('./helpers');
const r = require('../resources/reasons.json');
const u = require('../utils');

// benefit crew supreme gesture quantum web media hazard theory mercy wing kitten

const ac0 = '0x6deffb0cafdb11d175f123f6891aa64f01c24f7d';
const ac1 = '0xd53208cf45fc9bd7938b200bff8814a26146688f';
const ac2 = '0x7b2a2d51e4d8fac602e20a5f6907ff9fbd88e1fd';

const pk0 = 'a44de2416ee6beb2f323fab48b432925c9785808d33a6ca6d7ba00b45e9370c3';
const pk1 = '420b20f3538f7ddf4527770acbd33ed8aa858ba24eec5038bd22158f23a8a002';
const pk2 = '655eae6e301ebe9da6384f717f774f6addb165606a6990ce13e86ead710fff8b';

const cj = require('..');
const c = cj.constitution;
const s = cj.ships;

function setAccount0()
{
  cj.config.setPublicAccount(ac0);
  cj.config.setRawPrivateKey(pk0);
}

function setAccount1()
{
  cj.config.setPublicAccount(ac1);
  cj.config.setRawPrivateKey(pk1);
}

function setAccount2()
{
  cj.config.setPublicAccount(ac2);
  cj.config.setRawPrivateKey(pk2);
}

async function send(tx)
{
  return cj.transact.sendTransaction(await cj.transact.signTransaction(tx));
}

let galaxy = 0;
let galaxyPlanet = 65536;
let star1 = 256;
let star2 = 512;
let planet1a = 65792;
let planet1b = 131328;

it('prepare the environment', async function() {
  await cj.config.initializeContractsDefault();
  // find the first unused galaxy, so we have a clean-ish testing environment
  while (await s.hasOwner(galaxy)) galaxy++;
  console.log('using galaxy ' + galaxy + '/255')
  galaxyPlanet = galaxyPlanet + galaxy;
  star1 = star1 + galaxy;
  star2 = star2 + galaxy;
  planet1a = planet1a + galaxy;
  planet1b = planet1b + galaxy;
  // reset state from previous runs
  setAccount0();
  //NOTE this reset costs ~2.1 times as much gas as estimated...
  await send(c.setManager(0x0));
});

describe('#createGalaxy', async function() {
  it('can only be done by contract owner', async function() {
    setAccount1();
    h.cant(await c.canCreateGalaxy(galaxy, ac0), r.permission);
    setAccount0();
    h.can(await c.canCreateGalaxy(galaxy, ac0));
  });
  it('prevents targetting the zero address', async function() {
    h.cant(await c.canCreateGalaxy(galaxy, 0x0), r.zero);
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.isOwner(galaxy, ac0));
    await send(c.createGalaxy(galaxy, ac0));
    a.isTrue(await s.isOwner(galaxy, ac0));
  });
  it('prevents creating existing galaxies', async function() {
    h.cant(await c.canCreateGalaxy(galaxy, ac0), r.spawned);
  });
});

describe('#setManager', async function() {
  it('can always set manager for self', async function() {
    h.can(await c.canSetManager());
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.canManage(galaxy, ac2));
    await send(c.setManager(ac2));
    a.isTrue(await s.canManage(galaxy, ac2));
  });
});

describe('#spawn', async function() {
  it('cannot spawn from unbooted ship', async function() {
    h.cant(await c.canSpawn(star1), r.spawnPrefix);
  });
  it('cannot spawn if not parent owner (or spawn proxy)', async function() {
    setAccount1();
    h.cant(await c.canSpawn(star1), r.permission);
  });
  it('cannot spawn galaxy planets', async function() {
    setAccount0();
    h.cant(await c.canSpawn(galaxyPlanet), r.spawnClass);
  });
  it('can spawn child to self, directly', async function() {
    await send(c.configureKeys(galaxy, '0xaa', '0xbb', 1, false));
    h.can(await c.canSpawn(star1));
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.isOwner(star1, ac0));
    a.isFalse(await s.isActive(star1));
    await send(c.spawn(star1, ac0));
    await send(c.configureKeys(star1, '0xaa', '0xbb', 1, false));
    a.isTrue(await s.isOwner(star1, ac0));
    a.isTrue(await s.isActive(star1));
    a.isFalse(await s.isOwner(star2, ac0));
    a.isFalse(await s.isActive(star2));
    await send(c.spawn(star2, ac1));
    a.isTrue(await s.isOwner(star2, ac0));
    a.isFalse(await s.isActive(star2));
    a.isTrue(await s.isTransferProxy(star2, ac1));
  });
  it('prevents spawning spawned ships', async function() {
    h.cant(await c.canSpawn(star2), r.spawned);
  });
});

describe('#setSpawnProxy', async function() {
  it('can only be done by owner or operator', async function() {
    setAccount1();
    h.cant(await c.canSetSpawnProxy(galaxy), r.permission);
    setAccount0();
    h.can(await c.canSetSpawnProxy(galaxy));
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.isSpawnProxy(galaxy, ac1));
    await send(c.setSpawnProxy(galaxy, ac1));
    a.isTrue(await s.isSpawnProxy(galaxy, ac1));
  });
});

describe('#transferShip', async function() {
  it('can only be done by owner, operator, or transfer proxy', async function(){
    setAccount2();
    h.cant(await c.canTransferShip(star2, ac1), r.permission);
    setAccount1();
    h.can(await c.canTransferShip(star2, ac1));
    setAccount0();
    h.can(await c.canTransferShip(star2, ac1));
  });
  it('prevents targetting the zero address', async function() {
    h.cant(await c.canTransferShip(star2, 0x0), r.zero);
  });
  it('generates usable transaction', async function() {
    setAccount1();
    a.isFalse(await s.isOwner(star2, ac1));
    await send(c.transferShip(star2, ac1));
    a.isTrue(await s.isOwner(star2, ac1));
  });
});

describe('#setTransferProxy', async function() {
  it('can only be done by owner', async function() {
    h.cant(await c.canSetTransferProxy(galaxy), r.permission);
    setAccount0();
    h.can(await c.canSetTransferProxy(galaxy));
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.isTransferProxy(galaxy, ac1));
    await send(c.setTransferProxy(galaxy, ac1));
    a.isTrue(await s.isTransferProxy(galaxy, ac1));
  });
});

describe('#setManager', async function() {
  it('generates usable transaction, also configureKeys', async function() {
    setAccount1();
    h.cant(await c.canConfigureKeys(galaxy), r.permission);
    setAccount0();
    await send(c.setManager(ac1));
    setAccount1();
    h.can(await c.canConfigureKeys(galaxy));
  });
});

describe('#escape', async function() {
  it('prevents invalid sponsors', async function() {
    h.cant(await c.canEscape(planet1a, star1), r.permission);
    h.cant(await c.canEscape(star1, planet1a), r.sponsor);
    h.cant(await c.canEscape(star1, galaxy+1), r.sponsorBoot);
    h.can(await c.canEscape(star2, star1));
    h.can(await c.canEscape(star1, galaxy));
  });
  it('generates usable transaction', async function() {
    a.isFalse(await s.isRequestingEscape(star2));
    await send(c.escape(star2, star1));
    a.isTrue(await s.isRequestingEscape(star2, star1));
  });
});

describe('#cancelEscape', async function() {
  it('can only be done by active ship manager', async function() {
    h.cant(await c.canCancelEscape(planet1a), r.permission);
    h.can(await c.canCancelEscape(star2));
  });
  it('generates usable transaction', async function() {
    await send(c.cancelEscape(star2));
    a.isFalse(await s.isRequestingEscape(star2));
  });
});

describe('#adopt', async function() {
  it('can only be done for actual escapees', async function() {
    h.cant(await c.canAdopt(star1, star2), r.notEscape);
    await send(c.escape(star2, star1));
    h.can(await c.canAdopt(star1, star2));
  });
  it('generates usable transaction', async function() {
    a.notEqual((await s.getShip(star2)).sponsor, star1);
    await send(c.adopt(star1, star2));
    a.equal((await s.getShip(star2)).sponsor, star1);
  });
});

describe('#reject', async function() {
  it('can only be done for actual escapees', async function() {
    h.cant(await c.canReject(galaxy, star2), r.notEscape);
    await send(c.escape(star2, galaxy));
    h.can(await c.canReject(galaxy, star2));
  });
  it('generates usable transaction', async function() {
    a.isTrue(await s.isRequestingEscape(star2, galaxy));
    await send(c.reject(galaxy, star2));
    a.isFalse(await s.isRequestingEscape(star2));
  });
});

describe('#detach', async function() {
  it('can only be done by the sponsor', async function() {
    h.cant(await c.canDetach(star2, star2), r.notSponsor);
    h.can(await c.canDetach(star1, star2));
  });
  it('generates usable transaction', async function() {
    a.isTrue((await s.getShip(star2)).hasSponsor);
    await send(c.detach(star1, star2));
    a.isFalse((await s.getShip(star2)).hasSponsor);
  });
});

describe('#polls', async function() {
  it('cannot be done by non-voters', async function() {
    h.cant(await c.canStartConstitutionPoll(star1), r.notGalaxy);
    h.cant(await c.canStartConstitutionPoll(galaxy), r.permission);
    h.cant(await c.canStartDocumentPoll(star1), r.notGalaxy);
    h.cant(await c.canStartDocumentPoll(galaxy), r.permission);
    h.cant(await c.canCastConstitutionVote(star1), r.notGalaxy);
    h.cant(await c.canCastConstitutionVote(galaxy), r.permission);
    h.cant(await c.canCastDocumentVote(star1), r.notGalaxy);
    h.cant(await c.canCastDocumentVote(galaxy), r.permission);
  });
  it('checks for proposal correctness', async function() {
    setAccount0();
    h.cant(await c.canStartConstitutionPoll(galaxy, ac2), r.upgradePath);
  });
  //NOTE there's more different cant-cases to test here,
  //     but that's a royal pain
  it('generates usable transactions', async function() {
    let fakeHash = '0x';
    if (galaxy < 10 || galaxy >= 100)
      fakeHash = fakeHash + '0';
    fakeHash = fakeHash + galaxy;
    h.cant(await c.canCastDocumentVote(galaxy, fakeHash), r.pollInactive);
    await send(c.startDocumentPoll(galaxy, fakeHash));
    h.can(await c.canCastDocumentVote(galaxy, fakeHash));
    await send(c.castDocumentVote(galaxy, fakeHash, true));
    await send(c.updateDocumentPoll(fakeHash));
    // this one depends on how many galaxies have been spawned...
    // h.cant(await c.canCastDocumentVote(galaxy, fakeHash), r.pollVoted);
  });
});
