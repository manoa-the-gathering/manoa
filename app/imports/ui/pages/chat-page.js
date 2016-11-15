import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const Messages = new Mongo.Collection("messages");

if (Meteor.isServer) {
    //this code only runs on the server
    Meteor.publish("messages", function() {
        return Messages.find({}, {sort: {createdAt: -1}, limit:5});

    });
}

if (Meteor.isClient) {
    //This code only runs on the client
    Meteor.subscribe("messages");
}

let sendMessage = function(message) {
    //if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }

    Messages.insert({
        text: message,
        createdAt: new Date(),
        username: "anonymous"
    });
}


if (Meteor.isClient) {
    Template.Chat_Page.helpers({
        recentMessages: function() {
            return Messages.find({}, {sort: {createdAt: 1}});
        }
    });

    Template.Chat_Page.events({
        "submit .new-message": function(event) {
            const text = event.target.text.value;

            sendMessage(text);

            event.target.text.value = "";
            return false;
        }
    });
}

//Meteor.call('sendMessage', 'hello from the browser console')