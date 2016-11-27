import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

/**Messages = new Mongo.Collection("msgs");

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

Meteor.methods( {

    sendMessage:function(message) {
        //if (! Meteor.userId()) {
        //   throw new Meteor.Error("not-authorized");
        // }

        Messages.insert({
            text: message,
            createdAt: new Date(),
            username: "anonymous"
        });
    }

})



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
} **/

//Meteor.call('sendMessage', 'hello from the browser console')

//export const Messages = new Mongo.Collection("msgs");

/**Meteor.methods({
    sendMessage: function (messageText) {
        add authentication here 

        Messages.insert({
            messageText: messageText,
            createdAt: new Date(),
            username: "anonymous"
        });
    }
}); **/
/* scrolling code */
//
// if (Meteor.isClient) {
//     // This code only runs on the client
//
//     Meteor.subscribe("messages");
//
//     Template.Chat_Page.helpers({
//         recentMessages: function () {
//             return Messages.find({}, {sort: {createdAt: 1}});
//         },
//         /* unread message helper */
//     });
//
//     /*chat window scrolling*/
//
//     Template.Chat_Page.events({
//         "submit .new-message": function (event) {
//             var text = event.target.text.value;
//
//             Meteor.call("sendMessage", text);
//
//             event.target.text.value = "";
//             event.preventDefault();
//         },
//
//         /* scroll event */
//
//     });
//
//     /*account config*/
//
// }
