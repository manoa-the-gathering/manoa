/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../ui/pages/match-page'

Meteor.publish("messages", function (selected) {
    return Messages.find({msgs: selected}, {sort: {createdAt: -1}, limit: 26});
});

Meteor.methods({
    sendMessage: function (messageText) {
        /* add authentication here */


        Messages.insert({
            messageText: messageText,
            createdAt: new Date(),
            username: Meteor.user()

        });
    }
});
