import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Messages } from '../../api/msgs/msgs.js';
import { Deck } from '../../api/battle/deck.js';
import { FS } from 'meteor/cfs:base-package';
import { ReactiveVar } from 'meteor/reactive-var'
import { Images } from '../../api/cards/cards.js';

let green = 20;
let blue = 20;

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
  'click .greenminus': function() {
    green -= 1;
    Session.set("green", green);
    console.log(green);
  },
  'click .blueplus': function() {
    blue += 1;
    Session.set("blue", blue);
    console.log(blue);
  },
  'click .blueminus': function() {
    blue -= 1;
    Session.set("blue", blue);
    console.log(blue);
  },
  'images': function() {
    return Images.find();
  }
});

function scrollToBottom() {
  $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight + $('#chatbox').height());
}

Template.Battle_Page.onCreated (function(){

  Meteor.autorun(function () {
    Meteor.subscribe('messages', Session.get('chat'), {
      onReady() {
        return scrollToBottom();
      },
    });
    Meteor.subscribe('images');
  });


});

Template.Battle_Page.helpers({
  recentMessages() {
    return Messages.find({ username: { $ne: 'System' } }, { sort: { createdAt: 1 } });
  },
  recentSysMessages() {
    return Messages.find({ username: { $eq: 'System' } }, { sort: { createdAt: 1 } });
  },
  listUsers() {
    return Meteor.users.find();
  },
  greenTotal() {
    return Session.get("green");
  },
  blueTotal() {
    return Session.get("blue");
  },
  images() {
    return Session.get(Images.find());
  }
});


Template.Battle_Page.onRendered(function () {
  Session.set("green", 20);
  Session.set("blue", 20);

  $('body').addClass('battlebg');

  const num = Math.random();
  if (num > 0.5) {
    Meteor.call('sysMessage', "Green, you're on the play!", Session.get('chat'));
  } else {
    Meteor.call('sysMessage', "Blue, you're on the play!", Session.get('chat'));
  }
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
  Meteor.call('deleteSysMessages');
});

/**var incrementLimit = function(templateInstance) {
  var newLimit = templateInstance.limit.get() +
      parseInt(5);
  templateInstance.limit.set(newLimit);
}**/

