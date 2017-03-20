import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// import { Affinity } from '../../api/affinity/affinity.js';
import { Naya } from '../../api/naya/naya.js';
import { Hand } from '../../api/pHand/pHand.js';
import { _ } from 'meteor/underscore';

export const results = new Mongo.Collection('results');
export const draws = new Mongo.Collection('draws');

// Affinity.allow({
//   'download'() {
//     // add custom authentication code here
//     return true;
//   },
// });
//
// Affinity.deny({
//   'insert'() {
//     return false;
//   },
//   'update'() {
//     return false;
//   },
//   'remove'() {
//     return false;
//   },
// });
//
// Naya.allow({
//   'download'() {
//     // add custom authentication code here
//     return true;
//   },
//   'insert'() {
//     return true;
//   },
//   'update'() {
//     return true;
//   },
// });
//
// Naya.deny({
//   'remove'() {
//     return false;
//   },
// });

// Naya Burn Fill
const nayaBurnCards = [
  {
    card: 'Arid Mesa',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/AridMesa1.jpg',
  },
  {
    card: 'Arid Mesa',
    type: 'land',
    location: 'deck',

    path: '/images/NayaBurn/AridMesa2.jpg',
  },
  {
    card: 'Bloodstained Mire.jpg',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire1.jpg',
  },
  {
    card: 'Bloodstained Mire.jpg',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire2.jpg',
  },
  {
    card: 'Bloodstained Mire.jpg',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire3.jpg',
  },
  {
    card: 'Boros Charm.jpg',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm1.jpg',
  },
  {
    card: 'Boros Charm.jpg',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm2.jpg',
  },
  {
    card: 'Boros Charm.jpg',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm3.jpg',
  },
  {
    card: 'Boros Charm.jpg',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm4.jpg',
  },
  {
    card: 'Eidolon of the Great Revel.jpg',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel1.jpg',
  },
  {
    card: 'Eidolon of the Great Revel.jpg',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel2.jpg',
  },
  {
    card: 'Eidolon of the Great Revel.jpg',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel3.jpg',
  },
  {
    card: 'Eidolon of the Great Revel.jpg',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel4.jpg',
  },
  {
    card: 'Goblin Guide',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GoblinGuide1.jpg',
  },
  {
    card: 'Goblin Guide',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GoblinGuide2.jpg',
  },
  {
    card: 'Goblin Guide',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GoblinGuide3.jpg',
  },
  {
    card: 'Goblin Guide',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GoblinGuide4.jpg',
  },
  {
    card: 'Grim Lavamancer',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GrimLavamancer1.jpg',
  },
  {
    card: 'Grim Lavamancer',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/GrimLavamancer2.jpg',
  },
  {
    card: 'Inspiring Vantage',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/InspiringVantage1.jpg',
  },
  {
    card: 'Inspiring Vantage',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/InspiringVantage2.jpg',
  },
  {
    card: 'Lava Spike',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LavaSpike1.jpg',
  },
  {
    card: 'Lava Spike',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LavaSpike2.jpg',
  },
  {
    card: 'Lava Spike',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LavaSpike3.jpg',
  },
  {
    card: 'Lava Spike',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LavaSpike4.jpg',
  },
  {
    card: 'Lightning Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningBolt1.jpg',
  },
  {
    card: 'Lightning Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningBolt2.jpg',
  },
  {
    card: 'Lightning Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningBolt3.jpg',
  },
  {
    card: 'Lightning Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningBolt4.jpg',
  },
  {
    card: 'Lightning Helix',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningHelix1.jpg',
  },
  {
    card: 'Lightning Helix',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningHelix2.jpg',
  },
  {
    card: 'Lightning Helix',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/LightningHelix3.jpg',
  },
  {
    card: 'Monastery Swiftspear',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/MonasterySwiftspear1.jpg',
  },
  {
    card: 'Monastery Swiftspear',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/MonasterySwiftspear2.jpg',
  },
  {
    card: 'Monastery Swiftspear',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/MonasterySwiftspear3.jpg',
  },
  {
    card: 'Monastery Swiftspear',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/MonasterySwiftspear4.jpg',
  },
  {
    card: 'Mountain',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/Mountain1.jpg',
  },
  {
    card: 'Mountain',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/Mountain2.jpg',
  },
  {
    card: 'Mountain',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/Mountain3.jpg',
  },
  {
    card: 'Rift Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/RiftBolt1.jpg',
  },
  {
    card: 'Rift Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/RiftBolt2.jpg',
  },
  {
    card: 'Rift Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/RiftBolt3.jpg',
  },
  {
    card: 'Rift Bolt',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/RiftBolt4.jpg',
  },
  {
    card: 'Sacred Foundry',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/SacredFoundry1.jpg',
  },
  {
    card: 'Sacred Foundry',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/SacredFoundry2.jpg',
  },
  {
    card: 'Scalding Tarn',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/ScaldingTarn1.jpg',
  },
  {
    card: 'Scalding Tarn',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/ScaldingTarn2.jpg',
  },
  {
    card: 'Scalding Tarn',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/ScaldingTarn3.jpg',
  },
  {
    card: 'Searing Blaze',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/SearingBlaze1.jpg',
  },
  {
    card: 'Searing Blaze',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/SearingBlaze2.jpg',
  },
  {
    card: 'Searing Blaze',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/SearingBlaze3.jpg',
  },
  {
    card: 'Searing Blaze',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/SearingBlaze4.jpg',
  },
  {
    card: 'Skullcrack',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/Skullcrack1.jpg',
  },
  {
    card: 'Skullcrack',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/Skullcrack2.jpg',
  },
  {
    card: 'Skullcrack',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/Skullcrack3.jpg',
  },
  {
    card: 'Stomping Ground',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/StompingGround1.jpg',
  },
  {
    card: 'Wooded Foothills',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/WoodedFoothills1.jpg',
  },
  {
    card: 'Wooded Foothills',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/WoodedFoothills2.jpg',
  },
  {
    card: 'Wooded Foothills',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/WoodedFoothills3.jpg',
  },
  {
    card: 'Wooded Foothills',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/WoodedFoothills4.jpg',
  },
];

if (Naya.find().count() === 0) {
  _.each(nayaBurnCards, function seedNaya(stuff) {
    Naya.insert(stuff);
  });
}

Meteor.publish('naya', function () {
  return Naya.find();
});

Meteor.publish('pHand', function (userId) {
  return Hand.find({ player: userId });
});

Meteor.methods({
  'newGame'(userId) {
    Naya.aggregate([{ $match: {} }, { $out: 'results' }]);
    results.update({}, { $set: { player: userId } }, { multi: true });
    results.find().forEach(function (x) { Hand.insert(x, { ordered: false }); });
  },
  'draw'(userId) {
    Hand.aggregate(
        [{ $match: { player: userId } },
          { $match: { location: 'deck' } },
          { $sample: { size: 1 } },
          { $out: 'draws' },
        ]);
    Hand.update({ _id: draws.findOne()._id }, { $set: { location: 'hand' } });
  },
  'quitGame'(userId) {
    Hand.remove({ player: userId });
  },
});
