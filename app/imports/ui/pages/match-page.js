import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const Messages = new Mongo.Collection("msgs");
let id = 'Select a User';

/**if (Meteor.isClient) {
  Meteor.subscribe('userStatus');
}

Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
  document.getElementById('result').innerHTML = id;

});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
});

Template.Match_Page.helpers({
  listUsers() {
    return Meteor.users.find();
  },
});

Template.Match_Page.events({
  'click .ui.user.list li'(event) {
    event.preventDefault();
    id = Meteor.userId();
    document.getElementById('result').innerHTML = 'User Id is '+id;
  },
});
**/


if (Meteor.isClient) {
  // This code only runs on the client

  Meteor.autorun(function () {
    Meteor.subscribe('messages', Session.get('chat'));
  });

  //Meteor.subscribe("messages");
  Meteor.subscribe('userStatus');

  Template.Match_Page.onRendered(function () {
    $('body').addClass('matchbg');
    document.getElementById('result').innerHTML = id;

  });

  Template.Match_Page.onDestroyed(function () {
    $('body').removeClass('matchbg');
  });


  Template.Match_Page.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    listUsers() {
      return Meteor.users.find();
    },
    /* unread message helper */
  });
  
  Template.Match_Page.events({
    "submit .new-message": function (event) {
      let text = event.target.text.value;
      let chat = Session.get('chat');

      Meteor.call("sendMessage", text, chat);

      event.target.text.value = "";
      event.preventDefault();
    },
    'click .ui.user.list li'(event) {
      event.preventDefault();
      id = Meteor.userId();
      Session.set('chat', id);
      document.getElementById('result').innerHTML = 'User Id is '+id;
    },


  });

  /*account config*/

}

