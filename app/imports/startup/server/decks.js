import { Meteor } from 'meteor/meteor';
import { Affinity } from '../../api/affinity/affinity.js';
import { Naya } from '../../api/naya/naya.js';
// import { _ } from 'meteor/underscore';
import { FS } from 'meteor/cfs:base-package';

Affinity.allow({
  'download'() {
    // add custom authentication code here
    return true;
  },
});

Affinity.deny({
  'insert'() {
    return false;
  },
  'update'() {
    return false;
  },
  'remove'() {
    return false;
  },
});

Naya.allow({
  'download'() {
    // add custom authentication code here
    return true;
  },
  'insert'() {
    return true;
  },
  'update'() {
    return true;
  },
});

Naya.deny({
  'remove'() {
    return false;
  },
});

// Naya Burn Fill

if (Naya.find().count() === 0) {
  const nayaC1 = new FS.File();
  nayaC1.attachData(Assets.absoluteFilePath('NayaBurn/GoblinGuide1.jpg'), function (error) {
    if (error) throw error;
    nayaC1.metadata = { card: 'Creature' };
    Naya.insert(nayaC1);
  });
  const nayaC2 = new FS.File();
  nayaC2.attachData(Assets.absoluteFilePath('NayaBurn/GoblinGuide2.jpg'), function (error) {
    if (error) throw error;
    nayaC2.metadata = { card: 'Creature' };
    Naya.insert(nayaC2);
  });
  const nayaC3 = new FS.File();
  nayaC3.attachData(Assets.absoluteFilePath('NayaBurn/GoblinGuide3.jpg'), function (error) {
    if (error) throw error;
    nayaC3.metadata = { card: 'Creature' };
    Naya.insert(nayaC3);
  });
  const nayaC4 = new FS.File();
  nayaC4.attachData(Assets.absoluteFilePath('NayaBurn/GoblinGuide4.jpg'), function (error) {
    if (error) throw error;
    nayaC4.metadata = { card: 'Creature' };
    Naya.insert(nayaC4);
  });
  const nayaC5 = new FS.File();
  nayaC5.attachData(Assets.absoluteFilePath('NayaBurn/GrimLavamancer1.jpg'), function (error) {
    if (error) throw error;
    nayaC5.metadata = { card: 'Creature' };
    Naya.insert(nayaC5);
  });
  const nayaC6 = new FS.File();
  nayaC6.attachData(Assets.absoluteFilePath('NayaBurn/GrimLavamancer2.jpg'), function (error) {
    if (error) throw error;
    nayaC6.metadata = { card: 'Creature' };
    Naya.insert(nayaC6);
  });
  const nayaC7 = new FS.File();
  nayaC7.attachData(Assets.absoluteFilePath('NayaBurn/MonasterySwiftspear1.jpg'), function (error) {
    if (error) throw error;
    nayaC7.metadata = { card: 'Creature' };
    Naya.insert(nayaC7);
  });
  const nayaC8 = new FS.File();
  nayaC8.attachData(Assets.absoluteFilePath('NayaBurn/MonasterySwiftspear2.jpg'), function (error) {
    if (error) throw error;
    nayaC8.metadata = { card: 'Creature' };
    Naya.insert(nayaC8);
  });
  const nayaC9 = new FS.File();
  nayaC9.attachData(Assets.absoluteFilePath('NayaBurn/MonasterySwiftspear3.jpg'), function (error) {
    if (error) throw error;
    nayaC9.metadata = { card: 'Creature' };
    Naya.insert(nayaC9);
  });
  const nayaC10 = new FS.File();
  nayaC10.attachData(Assets.absoluteFilePath('NayaBurn/MonasterySwiftspear4.jpg'), function (error) {
    if (error) throw error;
    nayaC10.metadata = { card: 'Creature' };
    Naya.insert(nayaC10);
  });
  const nayaC11 = new FS.File();
  nayaC11.attachData(Assets.absoluteFilePath('NayaBurn/EidolonoftheGreatRevel1.jpg'), function (error) {
    if (error) throw error;
    nayaC11.metadata = { card: 'Creature' };
    Naya.insert(nayaC11);
  });
  const nayaC12 = new FS.File();
  nayaC12.attachData(Assets.absoluteFilePath('NayaBurn/EidolonoftheGreatRevel2.jpg'), function (error) {
    if (error) throw error;
    nayaC12.metadata = { card: 'Creature' };
    Naya.insert(nayaC12);
  });
  const nayaC13 = new FS.File();
  nayaC13.attachData(Assets.absoluteFilePath('NayaBurn/EidolonoftheGreatRevel3.jpg'), function (error) {
    if (error) throw error;
    nayaC13.metadata = { card: 'Creature' };
    Naya.insert(nayaC13);
  });
  const nayaC14 = new FS.File();
  nayaC14.attachData(Assets.absoluteFilePath('NayaBurn/EidolonoftheGreatRevel4.jpg'), function (error) {
    if (error) throw error;
    nayaC14.metadata = { card: 'Creature' };
    Naya.insert(nayaC14);
  });
  const nayaC15 = new FS.File();
  nayaC15.attachData(Assets.absoluteFilePath('NayaBurn/LavaSpike1.jpg'), function (error) {
    if (error) throw error;
    nayaC15.metadata = { card: 'Spell' };
    Naya.insert(nayaC15);
  });
  const nayaC16 = new FS.File();
  nayaC16.attachData(Assets.absoluteFilePath('NayaBurn/LavaSpike2.jpg'), function (error) {
    if (error) throw error;
    nayaC16.metadata = { card: 'Spell' };
    Naya.insert(nayaC16);
  });
  const nayaC17 = new FS.File();
  nayaC17.attachData(Assets.absoluteFilePath('NayaBurn/LavaSpike3.jpg'), function (error) {
    if (error) throw error;
    nayaC17.metadata = { card: 'Spell' };
    Naya.insert(nayaC17);
  });
  const nayaC18 = new FS.File();
  nayaC18.attachData(Assets.absoluteFilePath('NayaBurn/LavaSpike4.jpg'), function (error) {
    if (error) throw error;
    nayaC18.metadata = { card: 'Spell' };
    Naya.insert(nayaC18);
  });
  const nayaC19 = new FS.File();
  nayaC19.attachData(Assets.absoluteFilePath('NayaBurn/LightningBolt1.jpg'), function (error) {
    if (error) throw error;
    nayaC19.metadata = { card: 'Spell' };
    Naya.insert(nayaC19);
  });
  const nayaC20 = new FS.File();
  nayaC20.attachData(Assets.absoluteFilePath('NayaBurn/LightningBolt2.jpg'), function (error) {
    if (error) throw error;
    nayaC20.metadata = { card: 'Spell' };
    Naya.insert(nayaC20);
  });
  const nayaC21 = new FS.File();
  nayaC21.attachData(Assets.absoluteFilePath('NayaBurn/LightningBolt3.jpg'), function (error) {
    if (error) throw error;
    nayaC21.metadata = { card: 'Spell' };
    Naya.insert(nayaC21);
  });
  const nayaC22 = new FS.File();
  nayaC22.attachData(Assets.absoluteFilePath('NayaBurn/LightningBolt4.jpg'), function (error) {
    if (error) throw error;
    nayaC22.metadata = { card: 'Spell' };
    Naya.insert(nayaC22);
  });
  const nayaC23 = new FS.File();
  nayaC23.attachData(Assets.absoluteFilePath('NayaBurn/BorosCharm1.jpg'), function (error) {
    if (error) throw error;
    nayaC23.metadata = { card: 'Spell' };
    Naya.insert(nayaC23);
  });
  const nayaC24 = new FS.File();
  nayaC24.attachData(Assets.absoluteFilePath('NayaBurn/BorosCharm2.jpg'), function (error) {
    if (error) throw error;
    nayaC24.metadata = { card: 'Spell' };
    Naya.insert(nayaC24);
  });
  const nayaC25 = new FS.File();
  nayaC25.attachData(Assets.absoluteFilePath('NayaBurn/BorosCharm3.jpg'), function (error) {
    if (error) throw error;
    nayaC25.metadata = { card: 'Spell' };
    Naya.insert(nayaC25);
  });
  const nayaC26 = new FS.File();
  nayaC26.attachData(Assets.absoluteFilePath('NayaBurn/BorosCharm4.jpg'), function (error) {
    if (error) throw error;
    nayaC26.metadata = { card: 'Spell' };
    Naya.insert(nayaC26);
  });
  const nayaC27 = new FS.File();
  nayaC27.attachData(Assets.absoluteFilePath('NayaBurn/LightningHelix1.jpg'), function (error) {
    if (error) throw error;
    nayaC27.metadata = { card: 'Spell' };
    Naya.insert(nayaC27);
  });
  const nayaC28 = new FS.File();
  nayaC28.attachData(Assets.absoluteFilePath('NayaBurn/LightningHelix2.jpg'), function (error) {
    if (error) throw error;
    nayaC28.metadata = { card: 'Spell' };
    Naya.insert(nayaC28);
  });
  const nayaC29 = new FS.File();
  nayaC29.attachData(Assets.absoluteFilePath('NayaBurn/LightningHelix3.jpg'), function (error) {
    if (error) throw error;
    nayaC29.metadata = { card: 'Spell' };
    Naya.insert(nayaC29);
  });
  const nayaC30 = new FS.File();
  nayaC30.attachData(Assets.absoluteFilePath('NayaBurn/SearingBlaze1.jpg'), function (error) {
    if (error) throw error;
    nayaC30.metadata = { card: 'Spell' };
    Naya.insert(nayaC30);
  });
  const nayaC31 = new FS.File();
  nayaC31.attachData(Assets.absoluteFilePath('NayaBurn/SearingBlaze2.jpg'), function (error) {
    if (error) throw error;
    nayaC31.metadata = { card: 'Spell' };
    Naya.insert(nayaC31);
  });
  const nayaC32 = new FS.File();
  nayaC32.attachData(Assets.absoluteFilePath('NayaBurn/SearingBlaze3.jpg'), function (error) {
    if (error) throw error;
    nayaC32.metadata = { card: 'Spell' };
    Naya.insert(nayaC32);
  });
  const nayaC33 = new FS.File();
  nayaC33.attachData(Assets.absoluteFilePath('NayaBurn/SearingBlaze4.jpg'), function (error) {
    if (error) throw error;
    nayaC33.metadata = { card: 'Spell' };
    Naya.insert(nayaC33);
  });
  const nayaC34 = new FS.File();
  nayaC34.attachData(Assets.absoluteFilePath('NayaBurn/Skullcrack1.jpg'), function (error) {
    if (error) throw error;
    nayaC34.metadata = { card: 'Spell' };
    Naya.insert(nayaC34);
  });
  const nayaC35 = new FS.File();
  nayaC35.attachData(Assets.absoluteFilePath('NayaBurn/Skullcrack2.jpg'), function (error) {
    if (error) throw error;
    nayaC35.metadata = { card: 'Spell' };
    Naya.insert(nayaC35);
  });
  const nayaC36 = new FS.File();
  nayaC36.attachData(Assets.absoluteFilePath('NayaBurn/Skullcrack3.jpg'), function (error) {
    if (error) throw error;
    nayaC36.metadata = { card: 'Spell' };
    Naya.insert(nayaC36);
  });
  const nayaC37 = new FS.File();
  nayaC37.attachData(Assets.absoluteFilePath('NayaBurn/RiftBolt1.jpg'), function (error) {
    if (error) throw error;
    nayaC37.metadata = { card: 'Spell' };
    Naya.insert(nayaC37);
  });
  const nayaC38 = new FS.File();
  nayaC38.attachData(Assets.absoluteFilePath('NayaBurn/RiftBolt2.jpg'), function (error) {
    if (error) throw error;
    nayaC38.metadata = { card: 'Spell' };
    Naya.insert(nayaC38);
  });
  const nayaC39 = new FS.File();
  nayaC39.attachData(Assets.absoluteFilePath('NayaBurn/RiftBolt3.jpg'), function (error) {
    if (error) throw error;
    nayaC39.metadata = { card: 'Spell' };
    Naya.insert(nayaC39);
  });
  const nayaC40 = new FS.File();
  nayaC40.attachData(Assets.absoluteFilePath('NayaBurn/RiftBolt4.jpg'), function (error) {
    if (error) throw error;
    nayaC40.metadata = { card: 'Spell' };
    Naya.insert(nayaC40);
  });
  const nayaC41 = new FS.File();
  nayaC41.attachData(Assets.absoluteFilePath('NayaBurn/AridMesa1.jpg'), function (error) {
    if (error) throw error;
    nayaC41.metadata = { card: 'Land' };
    Naya.insert(nayaC41);
  });
  const nayaC42 = new FS.File();
  nayaC42.attachData(Assets.absoluteFilePath('NayaBurn/AridMesa2.jpg'), function (error) {
    if (error) throw error;
    nayaC42.metadata = { card: 'Land' };
    Naya.insert(nayaC42);
  });
  const nayaC43 = new FS.File();
  nayaC43.attachData(Assets.absoluteFilePath('NayaBurn/BloodstainedMire1.jpg'), function (error) {
    if (error) throw error;
    nayaC43.metadata = { card: 'Land' };
    Naya.insert(nayaC43);
  });
  const nayaC44 = new FS.File();
  nayaC44.attachData(Assets.absoluteFilePath('NayaBurn/BloodstainedMire2.jpg'), function (error) {
    if (error) throw error;
    nayaC44.metadata = { card: 'Land' };
    Naya.insert(nayaC44);
  });
  const nayaC45 = new FS.File();
  nayaC45.attachData(Assets.absoluteFilePath('NayaBurn/BloodstainedMire3.jpg'), function (error) {
    if (error) throw error;
    nayaC45.metadata = { card: 'Land' };
    Naya.insert(nayaC45);
  });
  const nayaC46 = new FS.File();
  nayaC46.attachData(Assets.absoluteFilePath('NayaBurn/InspiringVantage1.jpg'), function (error) {
    if (error) throw error;
    nayaC46.metadata = { card: 'Land' };
    Naya.insert(nayaC46);
  });
  const nayaC47 = new FS.File();
  nayaC47.attachData(Assets.absoluteFilePath('NayaBurn/InspiringVantage2.jpg'), function (error) {
    if (error) throw error;
    nayaC47.metadata = { card: 'Land' };
    Naya.insert(nayaC47);
  });
  const nayaC48 = new FS.File();
  nayaC48.attachData(Assets.absoluteFilePath('NayaBurn/Mountain1.jpg'), function (error) {
    if (error) throw error;
    nayaC48.metadata = { card: 'Land' };
    Naya.insert(nayaC48);
  });
  const nayaC49 = new FS.File();
  nayaC49.attachData(Assets.absoluteFilePath('NayaBurn/Mountain2.jpg'), function (error) {
    if (error) throw error;
    nayaC49.metadata = { card: 'Land' };
    Naya.insert(nayaC49);
  });
  const nayaC50 = new FS.File();
  nayaC50.attachData(Assets.absoluteFilePath('NayaBurn/Mountain3.jpg'), function (error) {
    if (error) throw error;
    nayaC50.metadata = { card: 'Land' };
    Naya.insert(nayaC50);
  });
  const nayaC51 = new FS.File();
  nayaC51.attachData(Assets.absoluteFilePath('NayaBurn/SacredFoundry1.jpg'), function (error) {
    if (error) throw error;
    nayaC51.metadata = { card: 'Land' };
    Naya.insert(nayaC51);
  });
  const nayaC52 = new FS.File();
  nayaC52.attachData(Assets.absoluteFilePath('NayaBurn/SacredFoundry2.jpg'), function (error) {
    if (error) throw error;
    nayaC52.metadata = { card: 'Land' };
    Naya.insert(nayaC52);
  });
  const nayaC53 = new FS.File();
  nayaC53.attachData(Assets.absoluteFilePath('NayaBurn/ScaldingTarn1.jpg'), function (error) {
    if (error) throw error;
    nayaC53.metadata = { card: 'Land' };
    Naya.insert(nayaC53);
  });
  const nayaC54 = new FS.File();
  nayaC54.attachData(Assets.absoluteFilePath('NayaBurn/ScaldingTarn2.jpg'), function (error) {
    if (error) throw error;
    nayaC54.metadata = { card: 'Land' };
    Naya.insert(nayaC54);
  });
  const nayaC55 = new FS.File();
  nayaC55.attachData(Assets.absoluteFilePath('NayaBurn/ScaldingTarn3.jpg'), function (error) {
    if (error) throw error;
    nayaC55.metadata = { card: 'Land' };
    Naya.insert(nayaC55);
  });
  const nayaC56 = new FS.File();
  nayaC56.attachData(Assets.absoluteFilePath('NayaBurn/StompingGround1.jpg'), function (error) {
    if (error) throw error;
    nayaC56.metadata = { card: 'Land' };
    Naya.insert(nayaC56);
  });
  const nayaC57 = new FS.File();
  nayaC57.attachData(Assets.absoluteFilePath('NayaBurn/WoodedFoothills1.jpg'), function (error) {
    if (error) throw error;
    nayaC57.metadata = { card: 'Land' };
    Naya.insert(nayaC57);
  });
  const nayaC58 = new FS.File();
  nayaC58.attachData(Assets.absoluteFilePath('NayaBurn/WoodedFoothills2.jpg'), function (error) {
    if (error) throw error;
    nayaC58.metadata = { card: 'Land' };
    Naya.insert(nayaC58);
  });
  const nayaC59 = new FS.File();
  nayaC59.attachData(Assets.absoluteFilePath('NayaBurn/WoodedFoothills3.jpg'), function (error) {
    if (error) throw error;
    nayaC59.metadata = { card: 'Land' };
    Naya.insert(nayaC59);
  });
  const nayaC60 = new FS.File();
  nayaC60.attachData(Assets.absoluteFilePath('NayaBurn/WoodedFoothills4.jpg'), function (error) {
    if (error) throw error;
    nayaC60.metadata = { card: 'Land' };
    Naya.insert(nayaC60);
  });
}

Meteor.publish('naya', function () {
  return Naya.find();
});
