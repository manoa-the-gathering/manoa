/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../ui/pages/chat-page'

Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 15});
});

Meteor.methods({
    sendMessage: function (messageText) {
        /* add authentication here */

        Messages.insert({
            messageText: messageText,
            createdAt: new Date(),
            username: "anonymous"
        });
    }
});
