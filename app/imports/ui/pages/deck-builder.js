import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Hand } from '../../api/pHand/pHand.js';

let id;

function scrollToBottom() {
  $('#chatbox').animate({ scrollTop: $('#chatbox')[0].scrollHeight - $('#chatbox')[0].clientHeight }, 200);
}

Template.Deck_Builder.onRendered(function () {
  $('body').addClass('battlebg');
});

Template.Deck_Builder.onDestroyed(function () {
  $('body').removeClass('battlebg');
});

Template.Deck_Builder.onCreated(function () {
  id = Meteor.user();
  Meteor.call('newGame', id._id);
  Meteor.subscribe('pHand', id._id, id._id);
});

Template.Deck_Builder.helpers({
  'cardInDeck'() {
    return Hand.find();
  },
});

Template.Deck_Builder.events({
  'click .ui.button.cache'() {
    scrollToBottom();
  },
});
