/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/msgs/msgs.js';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

Meteor.publish('messages', function (identifier) {
  return Messages.find({ chat: identifier }, { sort: { createdAt: -1 }, limit: 50 });
});

Meteor.publish('duelmsg', function (identifier) {
  return Dmsgs.find({ chat: identifier }, { sort: { createdAt: -1 }, limit: 50 });
})

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
  'sendDmsg'(content, identifier) {
    /* add authentication here */
    Dmsgs.insert({
      messageText: content,
      createdAt: new Date(),
      username: Meteor.user(),
      chat: identifier,
    });
  },
  'deleteAll'() {
    Messages.remove({});
  },
});
