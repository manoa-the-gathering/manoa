/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/msgs/msgs.js';

Meteor.publish('messages', function () {
  return Messages.find({}, { sort: { createdAt: -1 }, limit: 50 });
});

  Meteor.methods({
    'sendMessage'(messageText) {
      /* add authentication here */
      Messages.insert({
        messageText: messageText,
        createdAt: new Date(),
        username: Meteor.user(),
      });
    },
    'deleteAll'() {
      Messages.remove({});
    },
  });
