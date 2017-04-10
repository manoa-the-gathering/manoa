import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Naya } from '../../api/naya/naya.js';
import { Hand } from '../../api/pHand/pHand.js';
import { Field } from '../../api/field/field.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Messages } from '../../api/msgs/msgs.js';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

let id;
let opponent;
let identifier;

function scrollToBottom() {
  $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight + $('#chatbox').height());
}

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
  document.getElementById('name').innerHTML = id.profile.name;
  document.getElementById('opponent').innerHTML = opponent.profile.name;
  // Meteor.autorun(function () {
  //   Meteor.subscribe('duelmsg', Session.get('chat'), {
  //     onReady() {
  //       return scrollToBottom();
  //     },
  //   });
  // });
  // console.log(JSON.parse(sessionStorage.getItem('opponent')));
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
  Meteor.call('quitGame', id._id);
});

Template.Battle_Page.onCreated(function () {
  id = JSON.parse(sessionStorage.getItem('user'));
  opponent = JSON.parse(sessionStorage.getItem('opponent'));
  identifier = [id._id, opponent._id].sort().join();
  Meteor.autorun(function () {
    Meteor.subscribe('pHand', id._id, opponent._id);
    Meteor.subscribe('field', id._id, opponent._id);
    Meteor.subscribe('duelmsg', identifier, {
      onReady() {
        return scrollToBottom();
      },
    });
  });
});

Template.Battle_Page.helpers({
  // 'images'() {
  //   return Naya.find();
  // },
  'cardInHand'() {
    return Hand.find({ location: 'hand' });
  },
  'grave'() {
    return Hand.find({ $and: [{ location: 'grave' }, { player: id._id }] });
  },
  'ograve'() {
    return Hand.find({ $and: [{ location: 'grave' }, { player: opponent._id }] });
  },
  'pLand'() {
    return Field.find({ $and: [{ type: 'land' }, { player: id._id }] });
  },
  'opLand'() {
    return Field.find({ $and: [{ type: 'land' }, { player: opponent._id }] });
  },
  'pMon'() {
    return Field.find({ $and: [{ type: 'creature' }, { player: id._id }] });
  },
  'opMon'() {
    return Field.find({ $and: [{ type: 'creature' }, { player: opponent._id }] });
  },
  'recentMessages'() {
    return Dmsgs.find({}, { sort: { createdAt: 1 } });
  },

});

Template.Battle_Page.events({
  'click .deck'() {
    Meteor.call('draw', id._id);
    // console.log("draw call");
    // $('.ui.basic.modal')
    //     .modal('setting', 'closable', false)
    //     .modal('show');
  },
  'click .leave'() {
    if (window.confirm('Are you sure you want to leave this game?')) {
      FlowRouter.go('Home_Page');
    }
  },
  'click .redraw'() {
    Meteor.call('mull', id._id);
  },
  'click .grave'() {
    $('.ui.fullscreen.grave.modal')
        .modal('setting')
        .modal('show');
  },
  'click .ograve'() {
    $('.ui.fullscreen.ograve.modal')
        .modal('setting')
        .modal('show');
  },
  'click .lands'(event) {
    card = event.target.getAttribute('src');
    card = Hand.findOne({ path: card });
    $(event.target).popup({
      hoverable: false,
      on: 'click',
      position: 'top center',
      variation: 'basic inverted',
      html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui button" onclick="Meteor.call('tap', card._id)">Tap</button>
                  <button class="ui button" onclick="Meteor.call('untap', card._id)">Untap</button>
                </div>
            </div>`,
    }).popup('toggle');
  },
  'click .mons'(event) {
    card = event.target.getAttribute('src');
    card = Hand.findOne({ path: card });
    $(event.target).popup({
      hoverable: false,
      on: 'click',
      position: 'top center',
      variation: 'basic inverted',
      html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui button" onclick="Meteor.call('tap', card._id)">Tap</button>
                  <button class="ui button" onclick="Meteor.call('untap', card._id)">Untap</button>
                </div>
            </div>`,
    }).popup('toggle');
  },
  'click .card'(event) {
    card = event.target.getAttribute('src');
    card = Hand.findOne({ path: card });
    $(event.target).popup({
      // title: 'Popup Title',
      // title: `${card.card}`,
      hoverable: false,
      on: 'click',
      position: 'top center',
      variation: 'basic inverted',
      html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui button" onclick="Meteor.call('play', card._id)">Play</button>
                  <button class="ui button" onclick="Meteor.call('discard', card._id)">Discard</button>
                </div>
            </div>`,
    }).popup('toggle');
  },
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('sendDmsg', text, identifier);
    scrollToBottom();
    event.target.text.value = '';
  },
});
