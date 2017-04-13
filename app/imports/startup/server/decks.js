import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// import { Affinity } from '../../api/affinity/affinity.js';
// import {Naya} from '../../api/naya/naya.js';
// import {_} from 'meteor/underscore';
import { Hand } from '../../api/pHand/pHand.js';
import { Field } from '../../api/field/field.js';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

export const results = new Mongo.Collection('results');
export const draws = new Mongo.Collection('draws');
// let count = 0;

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
const allCards = [
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
    card: 'Bloodstained Mire',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire1.jpg',
  },
  {
    card: 'Bloodstained Mire',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire2.jpg',
  },
  {
    card: 'Bloodstained Mire',
    type: 'land',
    location: 'deck',
    path: '/images/NayaBurn/BloodstainedMire3.jpg',
  },
  {
    card: 'Boros Charm',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm1.jpg',
  },
  {
    card: 'Boros Charm',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm2.jpg',
  },
  {
    card: 'Boros Charm',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm3.jpg',
  },
  {
    card: 'Boros Charm',
    type: 'spell',
    location: 'deck',
    path: '/images/NayaBurn/BorosCharm4.jpg',
  },
  {
    card: 'Eidolon of the Great Revel',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel1.jpg',
  },
  {
    card: 'Eidolon of the Great Revel',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel2.jpg',
  },
  {
    card: 'Eidolon of the Great Revel',
    type: 'creature',
    location: 'deck',
    path: '/images/NayaBurn/EidolonoftheGreatRevel3.jpg',
  },
  {
    card: 'Eidolon of the Great Revel',
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

// if (Naya.find().count() === 0) {
//   _.each(nayaBurnCards, function seedNaya(stuff) {
//     Naya.insert(stuff);
//   });
// }

// Meteor.publish('naya', function () {
//   return Naya.find();
// });

Meteor.publish('pHand', function (id1, id2) {
  // return Hand.find({ $or: [{ player: id1 }, { $and: [{ player: id2 }, { location: 'grave' }] }] });
  return Hand.find({ $or: [{ player: id1 }, { player: id2 }] });
});

Meteor.publish('field', function (id1, id2) {
  return Field.find({ $or: [{ player: id1 }, { player: id2 }] });
});

Meteor.methods({
  'newGame'(userId) {
    // Load default deck if none
    Meteor.users.update({ _id: userId, deck: { $exists: false } },
      {
        $set: {
          deck: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
          '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28',
          '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42',
          '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56',
          '57', '58', '59'],
        },
      });
    let player = Meteor.users.findOne({ _id: userId });
    player = JSON.parse(JSON.stringify(player.deck));
    for (let i = 0; i < player.length; i++) {
      let index = player[i];
      results.insert(allCards[index]);
    }
    results.update({}, { $set: { player: userId, tap: false } }, { multi: true });
    // results.update({}, { $set: { player: userId, _id: ++count } }, { multi: true });
    results.find().forEach(function (x) {
      Hand.insert(x, { ordered: false });
    });
    results.remove({ player: userId });
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
  'play'(pick) {
    // console.log('play');
    if (pick.type === 'spell') {
      Hand.update({ _id: pick._id }, { $set: { location: 'grave' } });
      Meteor.call('spell', pick.card, pick.player);
    }
    else Hand.update({ _id: pick._id }, { $set: { location: 'field' } });
    Field.insert(pick);
  },
  'discard'(cardId) {
    Hand.update({ _id: cardId }, { $set: { location: 'grave' } });
  },
  'tap'(cardId) {
    Field.update({ _id: cardId }, { $set: { tap: true } });
  },
  'untap'(cardId) {
    Field.update({ _id: cardId }, { $set: { tap: false } });
  },
  'exile'(cardId) {
    const pick = Hand.findOne({ _id: cardId });
    Hand.update({ _id: cardId }, { $set: { location: 'exile' } });
    Meteor.call('exiled', pick.card, pick.player);
  },
  'quitGame'(userId) {
    Hand.remove({ player: userId });
    Field.remove({ player: userId });
    Dmsgs.remove({ chat: userId });
  },
  'dismiss'(cardId) {
    Field.remove({ _id: cardId });
  },
  'untapper'(id) {
    Field.update({ player: id }, { $set: { tap: false } }, { multi: true });
  },
  'mull'(userId) {
    Hand.update({ $and: [{ player: userId }, { location: 'hand' }] }, { $set: { location: 'deck' } }, { multi: true });
  },
  'update'(id) {
    const num = Hand.find({ $and: [{ player: id }, { location: 'hand' }] }).count();
    // console.log(num);
    Dmsgs.update({ _id: id }, { $set: { hand: num } });
  },
  'sac'(cardId, pl) {
    Field.remove({ _id: cardId });
    Hand.update({ _id: cardId }, { $set: { location: 'grave' } });
    Meteor.call('sacc', pl);
  },
  'fetch'(cardId) {
    const pick = Hand.findOne({ _id: cardId });
    Hand.update({ _id: cardId }, { $set: { location: 'field' } });
    Field.insert(pick);
    Meteor.call('chosen', pick.card, pick.player);
  },
});
