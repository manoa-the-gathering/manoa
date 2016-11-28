import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'

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


function scrollToBottom () {

  $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);

};


if (Meteor.isClient) {
  // This code only runs on the client

  Meteor.subscribe("messages", {
    onReady: function () {
      scrollToBottom();
    }
  });

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
  });
  
  Template.Match_Page.events({
    'submit .new-message': function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);
      scrollToBottom();

      event.target.text.value = "";
      event.preventDefault();
    },
    'click .ui.user.list li'(event) {
      event.preventDefault();
      id = Meteor.userId();
      document.getElementById('result').innerHTML = 'User Id is '+id;
    },

  });

  /*account config*/

}

