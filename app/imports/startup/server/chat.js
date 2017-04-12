import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/msgs/msgs.js';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

Meteor.publish('messages', function (identifier) {
  return Messages.find({ chat: identifier }, { sort: { createdAt: -1 }, limit: 50 });
});

Meteor.publish('duelmsg', function (identifier, name1, name2) {
  if (Dmsgs.find({ chat: identifier }).count() === 0) {
    let rnd = Math.floor(Math.random() * 2);
    if (rnd) rnd = name2;
    if (!rnd) rnd = name1;
    Dmsgs.insert(
      {
        server: `Welcome! ${rnd} will go first.`,
        createdAt: new Date(),
        chat: identifier,
      });
  }
  return Dmsgs.find({ chat: identifier }, { sort: { createdAt: -1 } });
});

Meteor.methods({
  'sendMessage'(content, identifier) {
    /* add authentication here */
    Messages.insert({
      messageText: content,
      createdAt: new Date(),
      username: Meteor.user(),
      chat: identifier,
    });
  },
  'sendDmsg'(id, content, identifier) {
    Dmsgs.insert({
      messageText: content,
      createdAt: new Date(),
      username: id,
      chat: identifier,
    });
  },
  'deleteAll'() {
    Messages.remove({});
  },
  'life'(id, num, identifier) {
    Dmsgs.insert({
      _id: id._id,
      player: id.profile.name,
      createdAt: new Date(),
      chat: identifier,
      life: num,
      hand: 0,
    });
  },
  'add'(id) {
    const z = Dmsgs.findOne({ _id: id }).life;
    Dmsgs.update({ _id: id }, { $set: { life: z + 1 } });
  },
  'min'(id) {
    const z = Dmsgs.findOne({ _id: id }).life;
    Dmsgs.update({ _id: id }, { $set: { life: z - 1 } });
  },
  'mullnotify'(name, identifier) {
    Dmsgs.insert({
      server: `${name} chose to mulligan.`,
      createdAt: new Date(),
      chat: identifier,
    });
  },
  'end'(name, identifier) {
    Dmsgs.insert({
      server: `${name} has ended their turn.`,
      createdAt: new Date(),
      chat: identifier,
    });
  },
  'fetchnot'(name, identifier) {
    Dmsgs.insert({
      server: `${name} is fetching.`,
      createdAt: new Date(),
      chat: identifier,
    });
  },
});
