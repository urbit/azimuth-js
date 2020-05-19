'use strict';

const assert = require('chai').assert;
const bip39  = require('bip39');
const hdkey  = require('hdkey');
const Web3   = require('web3');
const ethUtil  = require('ethereumjs-util');

const ajs = require('..');
const check = ajs.check;
const ecliptic = ajs.ecliptic;
const azimuth = ajs.azimuth;
const delsend = ajs.delegatedSending;
const details = ajs.chainDetails;
const txn = ajs.txn;
const claims = ajs.claims;

const reasons = require('../resources/reasons.json');

// accounts

const mnemonic = 'benefit crew supreme gesture quantum web media hazard theory mercy wing kitten';

const seed = bip39.mnemonicToSeed(mnemonic);

const hd = hdkey.fromMasterSeed(seed);

const path = "m/44'/60'/0'/0";

const pair0 = ajs.getKeyPair(hd, path, 0);
const pair1 = ajs.getKeyPair(hd, path, 1);
const pair2 = ajs.getKeyPair(hd, path, 2);

const ac0 = ethUtil.addHexPrefix(pair0.address.toString('hex'));
const ac1 = ethUtil.addHexPrefix(pair1.address.toString('hex'));
const ac2 = ethUtil.addHexPrefix(pair2.address.toString('hex'));

const pk0 = pair0.privateKey;
const pk1 = pair1.privateKey;
const pk2 = pair2.privateKey;

const zaddr = ethUtil.zeroAddress();

// contract addresses

const contractAddresses = {
    ecliptic: '0x56db68f29203ff44a803faa2404a44ecbb7a7480',
    azimuth:  '0x863d9c2e5c4c133596cfac29d55255f0d0f86381',
    polls:    '0x935452c45eda2958976a429c9733c40302995efd',
    claims:   '0xe0834579269eac6beca2882a6a21f6fb0b1d7196',
    delegatedSending: '0xb71c0b6cee1bcae56dfe95cd9d3e41ddd7eafc43'
  }

// helpers

function can(res) {
  return assert.isTrue(res.result, res.reason);
}

function cant(res, reason) {
  assert.isFalse(res.result);
  return assert.equal(res.reason, reason);
}

function renderAsHex(value) {
  return ethUtil.addHexPrefix(value.toString('hex'));
}

async function firstUnownedGalaxy(contracts) {
  let galaxy = 0;
  while (await check.hasOwner(contracts, galaxy)) galaxy++;
  return galaxy;
}

async function sendTransaction(web3, tx, privateKey) {
  if (!ethUtil.isValidPrivate(privateKey)) {
    throw "Invalid key";
  }

  let addr = ethUtil.privateToAddress(privateKey);

  // NB (jtobin):
  //
  //   Explicitly set the tx.from field to whoever owns the supplied private
  //   key.  We don't want to depend on the state of web3.eth.defaultAccount,
  //   implicitly or otherwise, ever.

  tx.from = renderAsHex(addr);

  let stx = await txn.signTransaction(web3, tx, privateKey);
  return txn.sendSignedTransaction(web3, stx);
}


// tests

function main() {

  let provider  = new Web3.providers.HttpProvider('http://localhost:8545');
  let web3      = new Web3(provider);
  let contracts = ajs.initContracts(web3, contractAddresses);

  const someBytes32 = web3.utils.asciiToHex('whatever');

  let galaxy       = 0;
  let galaxyPlanet = 65536;
  let star1        = 256;
  let star2        = 512;
  let star3        = 768;
  let planet1a     = 65792;
  let planet1b     = 131328;
  let planet1c     = 196864;
  let planet1d     = 262400;

  it('prepare the environment', async function() {
    this.timeout(20000)

    // NB (jtobin):
    //
    // The polls tests require that a sufficient number of galaxies have
    // been spawned, so we explicitly create ~zod and ~nec below.

    let tx = ecliptic.createGalaxy(contracts, 0, ac0);
    await sendTransaction(web3, tx, pk0);

    tx = ecliptic.createGalaxy(contracts, 1, ac0);
    await sendTransaction(web3, tx, pk0);

    galaxy   = await firstUnownedGalaxy(contracts);
    star1    = star1 + galaxy;
    star2    = star2 + galaxy;
    planet1a = planet1a + galaxy;
    planet1b = planet1b + galaxy;
    planet1c = planet1c + galaxy;
    planet1d = planet1d + galaxy;
  });

  describe('#createGalaxy', async function() {

    it('can only be done by contract owner', async function() {
      can(await check.canCreateGalaxy(contracts, galaxy, ac0));
      cant(await check.canCreateGalaxy(contracts, galaxy, ac1),
           reasons.permission);
    });

    it('prevents targeting the zero address', async function() {
      cant(await check.canCreateGalaxy(contracts, galaxy, zaddr), reasons.zero);
    });

    it('generates usable transaction', async function() {
      assert.isFalse(await azimuth.isOwner(contracts, galaxy, ac0));

      let tx = ecliptic.createGalaxy(contracts, galaxy, ac0);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isOwner(contracts, galaxy, ac0));
    });

    it('prevents creating existing galaxies', async function() {
      cant(await check.canCreateGalaxy(contracts, galaxy, ac0), reasons.spawned);
    });

  });

  describe('#setManagementProxy', async function() {

    it('can only be done by owner', async function() {
      assert.isFalse(await azimuth.canManage(contracts, galaxy, ac2));
      cant(await check.canSetManagementProxy(contracts, galaxy, ac1),
           reasons.permission);
      can(await check.canSetManagementProxy(contracts, galaxy, ac0));
    });

    it('generates usable transaction', async function() {
      let tx = ecliptic.setManagementProxy(contracts, galaxy, ac2);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.canManage(contracts, galaxy, ac2));
    });

  });

  describe('#setVotingProxy', async function() {

    it('can only be done by owner of galaxy', async function() {
      assert.isFalse(await azimuth.canVoteAs(contracts, galaxy, ac2));
      cant(await check.canSetVotingProxy(contracts, galaxy, ac1),
           reasons.permission);
      cant(await check.canSetVotingProxy(contracts, star1, ac0),
           reasons.notGalaxy);
      can(await check.canSetVotingProxy(contracts, galaxy, ac0));
    });

    it('generates usable transaction', async function() {
      let tx = ecliptic.setVotingProxy(contracts, galaxy, ac2);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.canVoteAs(contracts, galaxy, ac2));

      tx = ecliptic.setVotingProxy(contracts, galaxy, ac0);
      await sendTransaction(web3, tx, pk0);
    });

  });

  describe('#spawn', async function() {

    it('cannot spawn from unbooted point', async function() {
      cant(await check.canSpawn(contracts, star1, ac0), reasons.spawnPrefix);
    });

    it('cannot spawn if not prefix owner (or spawn proxy)', async function() {
      cant(await check.canSpawn(contracts, star1, ac1), reasons.permission);
    });

    it('cannot spawn galaxy planets', async function() {
      cant(await check.canSpawn(contracts, galaxyPlanet, ac0),
           reasons.spawnSize);
    });

    it('can spawn child to self, directly', async function() {
      let tx = ecliptic.configureKeys(
                 contracts, galaxy, someBytes32, someBytes32, 1, false);
      await sendTransaction(web3, tx, pk0);

      can(await check.canSpawn(contracts, star1, ac0));
    });

    it('generates usable transaction', async function() {
      this.timeout(10000) // this one can take awhile

      assert.isFalse(await azimuth.isOwner(contracts, star1, ac0));
      assert.isFalse(await azimuth.isActive(contracts, star1));
      assert.equal((await azimuth.getUnspawnedChildren(contracts, galaxy)).length, 255);

      let tx = ecliptic.spawn(contracts, star1, ac0);
      await sendTransaction(web3, tx, pk0);

      tx = await ecliptic.configureKeys(
             contracts, star1, someBytes32, someBytes32, 1, false);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isOwner(contracts, star1, ac0));
      assert.isTrue(await azimuth.isActive(contracts, star1));
      assert.isFalse(await azimuth.isOwner(contracts, star2, ac0));
      assert.isFalse(await azimuth.isActive(contracts, star2));

      tx = await ecliptic.spawn(contracts, star2, ac1);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isOwner(contracts, star2, ac0));
      assert.isFalse(await azimuth.isActive(contracts, star2));
      assert.isTrue(await azimuth.isTransferProxy(contracts, star2, ac1));
      assert.equal((await azimuth.getUnspawnedChildren(contracts, galaxy)).length, 253);
    });

    it('prevents spawning spawned points', async function() {
      cant(await check.canSpawn(contracts, star2, ac0), reasons.spawned);
    });

    it('prevents targeting the zero address', async function() {
      cant(await check.canSpawn(contracts, star2, zaddr), reasons.zero);
    });

  });

  describe('#setSpawnProxy', async function() {

    it('can only be done by owner or operator', async function() {
      cant(await check.canSetSpawnProxy(contracts, galaxy, ac1),
           reasons.permission);
      can(await check.canSetSpawnProxy(contracts, galaxy, ac0));
    });

    it('generates usable transaction', async function() {
      assert.isFalse(await azimuth.isSpawnProxy(contracts, galaxy, ac1));

      let tx = ecliptic.setSpawnProxy(contracts, galaxy, ac1);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isSpawnProxy(contracts, galaxy, ac1));
    });

  });

  describe('#transferPoint', async function() {

    it('can only be done by owner/operator/transfer proxy', async function(){
      cant(await check.canTransferPoint(contracts, star2, ac2, ac1),
           reasons.permission);
      can(await check.canTransferPoint(contracts, star2, ac1, ac1));
      can(await check.canTransferPoint(contracts, star2, ac0, ac1));
    });

    it('prevents targeting the zero address', async function() {
      cant(await check.canTransferPoint(contracts, star2, ac0, zaddr),
           reasons.zero);
    });

    it('generates usable transaction', async function() {
      assert.isFalse(await azimuth.isOwner(contracts, star2, ac1));

      let tx = ecliptic.transferPoint(contracts, star2, ac1);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isOwner(contracts, star2, ac1));
    });

  });

  describe('#setTransferProxy', async function() {

    it('can only be done by owner', async function() {
      cant(await check.canSetTransferProxy(contracts, galaxy, ac1),
           reasons.permission);
      can(await check.canSetTransferProxy(contracts, galaxy, ac0));
    });

    it('generates usable transaction', async function() {
      assert.isFalse(await azimuth.isTransferProxy(contracts, galaxy, ac1));

      let tx = ecliptic.setTransferProxy(contracts, galaxy, ac1);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isTransferProxy(contracts, galaxy, ac1));
    });

  });

  describe('#setManagementProxy', async function() {

    it('generates usable transaction, also configureKeys', async function() {
      cant(await check.canConfigureKeys(contracts, galaxy, ac1),
           reasons.permission);

      let tx = ecliptic.setManagementProxy(contracts, galaxy, ac1);
      await sendTransaction(web3, tx, pk0);

      can(await check.canConfigureKeys(contracts, galaxy, ac1));
    });

  });

  describe('#escape', async function() {

    it('prevents invalid sponsors', async function() {
      cant(await check.canEscape(contracts, planet1a, star1, ac0),
           reasons.permission);
      cant(await check.canEscape(contracts, star1, planet1a, ac0),
           reasons.sponsor);
      cant(await check.canEscape(contracts, star1, galaxy + 1, ac0),
           reasons.sponsorBoot);
      can(await check.canEscape(contracts, star1, galaxy, ac0));
    });

    it('generates usable transaction', async function() {
      assert.isFalse(await azimuth.isEscaping(contracts, star2));
      can(await check.canEscape(contracts, star2, star1, ac1));

      let tx = ecliptic.escape(contracts, star2, star1);
      await sendTransaction(web3, tx, pk1);

      assert.isTrue(await azimuth.isEscaping(contracts, star2));
    });

  });

  describe('#cancelEscape', async function() {

    it('can only be done by active point manager', async function() {
      cant(await check.checkActivePointManager(contracts, planet1a, ac1),
           reasons.permission);
      can(await check.checkActivePointManager(contracts, star2, ac1));
    });

    it('generates usable transaction', async function() {
      let tx = ecliptic.cancelEscape(contracts, star2);
      await sendTransaction(web3, tx, pk1);

      assert.isFalse(await azimuth.isEscaping(contracts, star2));
    });

  });

  describe('#adopt', async function() {

    it('can only be done for actual escapees', async function() {
      cant(await check.canAdopt(contracts, star2, ac0),
           reasons.notEscape);

      let tx = ecliptic.escape(contracts, star2, star1);
      await sendTransaction(web3, tx, pk1);

      can(await check.canAdopt(contracts, star2, ac0));
    });

    it('generates usable transaction', async function() {
      let sponsor = (await azimuth.getPoint(contracts, star2)).sponsor;
      assert.notEqual(sponsor, star1);

      let tx = ecliptic.adopt(contracts, star2);
      await sendTransaction(web3, tx, pk0);

      sponsor = (await azimuth.getPoint(contracts, star2)).sponsor;
      assert.equal(sponsor, star1);
    });

  });

  describe('#reject', async function() {

    it('can only be done for actual escapees', async function() {
      cant(await check.canReject(contracts, star2, ac1),
           reasons.notEscape);

      let tx = ecliptic.escape(contracts, star2, galaxy);
      await sendTransaction(web3, tx, pk1);

      can(await check.canReject(contracts, star2, ac1));
    });

    it('generates usable transaction', async function() {
      assert.isTrue(await azimuth.isEscaping(contracts, star2));

      let tx = ecliptic.reject(contracts, star2);
      await sendTransaction(web3, tx, pk1);

      assert.isFalse(await azimuth.isEscaping(contracts, star2));
    });
  });

  describe('#detach', async function() {

    it('can only be done by the sponsor', async function() {
      cant(await check.canDetach(contracts, star2, ac1),
           reasons.permission);
      can(await check.canDetach(contracts, star2, ac0));
    });

    it('generates usable transaction', async function() {
      assert.isTrue((await azimuth.getPoint(contracts, star2)).hasSponsor);

      let tx = ecliptic.detach(contracts, star2);
      await sendTransaction(web3, tx, pk0);

      assert.isFalse((await azimuth.getPoint(contracts, star2)).hasSponsor);

      cant(await check.canDetach(contracts, star2, ac1), reasons.sponsorless);
    });

  });

  describe('#polls', async function() {
    it('cannot be done by non-voters', async function() {
      cant(await check.canStartUpgradePoll(web3, contracts, star1),
        reasons.notGalaxy);

      cant(await check.canStartUpgradePoll(web3, contracts, galaxy, zaddr, ac1),
        reasons.permission);

      cant(await check.canStartDocumentPoll(contracts, star1),
        reasons.notGalaxy);

      cant(await check.canStartDocumentPoll(contracts, galaxy, zaddr, ac1),
        reasons.permission);

      cant(await check.canCastUpgradeVote(contracts, star1),
        reasons.notGalaxy);

      cant(await check.canCastUpgradeVote(contracts, galaxy, zaddr, ac1),
        reasons.permission);

      cant(await check.canCastDocumentVote(contracts, star1),
        reasons.notGalaxy);

      cant(await check.canCastDocumentVote(contracts, galaxy, zaddr, ac1),
        reasons.permission);
    });

    it('checks for proposal correctness', async function() {
      cant(await check.canStartUpgradePoll(web3, contracts, galaxy, ac2, ac0),
        reasons.upgradePath);
    });

    it('generates usable transactions', async function() {
      this.timeout(10000) // this one can take awhile

      let fakeHash = web3.utils.asciiToHex('poll hash ' + galaxy);

      cant(await check.canCastDocumentVote(contracts, galaxy, fakeHash, ac0),
        reasons.pollInactive);

      await sendTransaction(
        web3,
        ecliptic.startDocumentPoll(contracts, galaxy, fakeHash),
        pk0);

      can(await check.canCastDocumentVote(contracts, galaxy, fakeHash, ac0));

      await sendTransaction(
        web3,
        ecliptic.castDocumentVote(contracts, galaxy, fakeHash, true),
        pk0);

      await sendTransaction(
        web3,
        ecliptic.updateDocumentPoll(contracts, fakeHash),
        pk0);

      cant(await check.canCastDocumentVote(contracts, galaxy, fakeHash, ac0),
        reasons.pollVoted);
    });
  });

  describe('#delegatedSending', async function() {
    it('sets up for tests', async function() {
      let prep = ecliptic.spawn(contracts, planet1c, ac0);
      await sendTransaction(web3, prep, pk0);
      prep = ecliptic.setSpawnProxy(contracts, star1, contracts.delegatedSending._address);
      await sendTransaction(web3, prep, pk0);
      prep = ecliptic.setSpawnProxy(contracts, star2, contracts.delegatedSending._address);
      await sendTransaction(web3, prep, pk1);
      // ac0 now owns planet1c (in addition to star1)
    });

    it('checks for star ownership', async function() {
      cant(await check.canSetPoolSize(contracts, planet1c, ac1),
        reasons.permission);
      can(await check.canSetPoolSize(contracts, planet1c, ac0));
    });

    it('generates usable transaction', async function() {
      assert.equal(await delsend.pools(contracts, planet1c, star1), 0);

      let tx = delsend.setPoolSize(contracts, star1, planet1c, 9);
      await sendTransaction(web3, tx, pk0);
      tx = delsend.setPoolSize(contracts, star2, planet1c, 1);
      await sendTransaction(web3, tx, pk1);

      assert.equal(await delsend.pools(contracts, planet1c, star1), 9);
      assert.equal(await delsend.pools(contracts, planet1c, star2), 1);
    });

    it('checks invite send ability', async function() {
      cant(await check.canSendInvitePoint(contracts, planet1c, planet1d, ac0, ac0),
        reasons.cantReceive);
      cant(await check.canSendInvitePoint(contracts, planet1c, planet1d, ac1, ac0),
        reasons.cantReceive);
      can(await check.canSendInvitePoint(contracts, planet1c, planet1d, ac2, ac0));
    });

    it('generates usable transaction', async function() {
      let tx = delsend.sendPoint(contracts, planet1c, planet1d, ac2);
      await sendTransaction(web3, tx, pk0);

      assert.isTrue(await azimuth.isTransferProxy(contracts, planet1d, ac2));
      assert.equal(await delsend.pools(contracts, planet1c, star1), 8);
      assert.equal(await delsend.getTotalUsableInvites(contracts, planet1c), 8);
      assert.equal(await delsend.invitedBy(contracts, planet1d), planet1c);
      assert.equal(await delsend.getPool(contracts, planet1d), planet1c);
      let invited = await delsend.getInvited(contracts, planet1c);
      assert.equal(invited.length, 1);
      assert.equal(invited[0], planet1d);
    });

    it('counts & generates planets to send', async function() {
      this.timeout(10000) // this one can take awhile
      let shortList = await delsend.getPlanetsToSend(contracts, planet1c, 3);
      let longList = await delsend.getPlanetsToSend(contracts, planet1c, 15);
      let count = await delsend.getTotalUsableInvites(contracts, planet1c);
      assert.equal(shortList.length, 3);
      assert.equal(longList.length, 8);
      assert.equal(count, 8);

      let tx = ecliptic.configureKeys(
        contracts, star2, someBytes32, someBytes32, 1, false
      );
      await sendTransaction(web3, tx, pk1);

      longList = await delsend.getPlanetsToSend(contracts, planet1c, 15);
      count = await delsend.getTotalUsableInvites(contracts, planet1c);
      assert.equal(longList.length, 9);
      assert.equal(count, 9);

      tx = ecliptic.setSpawnProxy(contracts, star2, zaddr);
      await sendTransaction(web3, tx, pk1);

      longList = await delsend.getPlanetsToSend(contracts, planet1c, 15);
      count = await delsend.getTotalUsableInvites(contracts, planet1c);
      assert.equal(longList.length, 8);
      assert.equal(count, 8);

    });
  });

  describe('#eventLog', async function() {

    it('can find activated ship block', async function() {
      const latest = await web3.eth.getBlockNumber();
      const res = await azimuth.getActivationBlock(
        contracts,
        star1,
        details.local.azimuth.genesis,
        latest
      );
      assert.notEqual(res, 0);
    });

    it('cannot find unactivated ship block', async function() {
      const latest = await web3.eth.getBlockNumber();
      const res = await azimuth.getActivationBlock(
        contracts,
        star3,
        details.local.azimuth.genesis,
        latest
      );
      assert.equal(res, 0);
    });
  });

  describe('#claims', async function() {
    const btcAddress = '1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ';
    const protocol = 'BTC'
    const dossier = '0x00';
    it('can write a claim', async function() {
      const newClaimTx = await claims.addClaim(contracts, galaxy, protocol, btcAddress, dossier);
      await sendTransaction(web3, newClaimTx, pk0);

      const claim = await claims.getClaim(contracts, galaxy, 0);

      assert.equal(claim.claim, btcAddress);
      assert.equal(claim.protocol, protocol);
      assert.equal(claim.dossier, dossier);
    });
  });
}

main();
