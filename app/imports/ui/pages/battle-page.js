import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Messages } from '../../api/msgs/msgs.js';
import { Deck } from '../../api/battle/deck.js';

let green = 20;
let blue = 20;

const nayaCards = ["arid mesa", "mountain", "lightning bolt", "grim lavamancer", "wild nacatl", "eidolon of the great revel", "boros charm", "atarka's command"];

const NayaBurn = new Deck(nayaCards);
NayaBurn.shuffle();
NayaBurn.deal();
NayaBurn.draw();

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
  },
  blueTotal() {
    return Session.get("blue");
  }
});


Template.Battle_Page.onRendered(function () {
  Session.set("green", 20);
  Session.set("blue", 20);

  $('body').addClass('battlebg');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
});

