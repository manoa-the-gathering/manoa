/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/msgs/msgs.js';
import { Session } from 'meteor/session';


Meteor.publish('messages', function (chat) {
  return Messages.find({chat: chat}, {sort: {createdAt: -1}, limit: 50});
});

Meteor.methods({
  'sendMessage'(messageText, chat) {
    /* add authentication here */
    Messages.insert({
      messageText: messageText,
      createdAt: new Date(),
      username: Meteor.user(),
      chat: chat
    });
  },
  'sysMessage'(messageText, chat) {
    /* add authentication here */
    Messages.insert({
      messageText: messageText,
      createdAt: new Date(),
      username: 'System',
      chat: chat
    });
  },
  'deleteAll'() {
    Messages.remove({});
  },
  'deleteSysMessages'() {
    Messages.remove({ username: { $eq: 'System' } } );
  },
  'deleteEarlier'() {
    Messages.remove(Messages.findOne({ username: { $eq: 'System'} }));
  },
});
