import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Messages } from '../../api/msgs/msgs.js';

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
    greenLp += 1;
    console.log(greenLp);
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
});


Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
});

