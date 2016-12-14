import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Messages } from '../../api/msgs/msgs.js';

let green = 20;

Template.Battle_Page.events({
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    let chat = Session.get('chat');

    Meteor.call('sendMessage', text, chat);
    scrollToBottom();

    event.target.text.value = '';
  },
  'click .greenplus': function() {
    green += 1;
    Session.set("green", green);
    console.log(green);
  },
});

function scrollToBottom() {
  $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight + $('#chatbox').height());
}

Template.Battle_Page.helpers({
  recentMessages() {
    return Messages.find({}, { sort: { createdAt: 1 } });
  },
  listUsers() {
    return Meteor.users.find();
  },
  greenTotal() {
    return Session.get("green");
  }
});


Template.Battle_Page.onRendered(function () {
  Session.set("green", 20);
  $('body').addClass('battlebg');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
});

