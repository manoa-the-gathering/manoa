import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Hand } from '../../api/pHand/pHand.js';
import { Field } from '../../api/field/field.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

let id;
let opponent;
// let identifier;
let autoscroll;
let handcount;

function scrollToBottom() {
  $('#chatbox').animate({ scrollTop: $('#chatbox')[0].scrollHeight - $('#chatbox')[0].clientHeight + 37 }, 200);
}

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
  // document.getElementById('opponent').innerHTML = opponent.profile.name;
  // document.getElementById('name').innerHTML = id.profile.name;
  $('.ui.checkbox')
      .checkbox({
        'onChecked'() {
          autoscroll = Dmsgs.find().observeChanges({
            'added'() {
              scrollToBottom();
            },
          });
        },
        'onUnchecked'() {
          autoscroll.stop() ;
        },
      });
  $('.ui.checkbox').checkbox('check');
  handcount = Hand.find({ location: 'hand' }).observeChanges({
    'added'() {
      Meteor.call('update', id._id);
    },
    'removed'() {
      Meteor.call('update', id._id);
    },
  });
  // $('.ui.fullscreen.fetchin.modal')
  //     .modal({
  //       onDeny    : function(){
  //         window.alert('Wait not yet!');
  //         return false;
  //       },
  //       onApprove : function() {
  //         window.alert('Approved!');
  //       },
  //     });
  Meteor.call('life', id, 20);
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
  Meteor.call('quitGame', id._id);
});

Template.Battle_Page.onCreated(function () {
  id = JSON.parse(sessionStorage.getItem('user'));
  opponent = JSON.parse(sessionStorage.getItem('opponent'));
  // identifier = [id._id, opponent._id].sort().join();
  Meteor.autorun(function () {
    Meteor.subscribe('pHand', id._id, opponent._id);
    Meteor.subscribe('field', id._id, opponent._id);
    // Meteor.subscribe('duelmsg', identifier, id.profile.name, opponent.profile.name);
    Meteor.subscribe('duelmsg', id._id, opponent._id, id.profile.name, opponent.profile.name);
  });
});

Template.Battle_Page.helpers({
  // 'images'() {
  //   return Naya.find();
  // },
  'cardInHand'() {
    return Hand.find({ $and: [{ location: 'hand' }, { player: id._id }] });
    // return Hand.find({ location: 'hand' });
  },
  'grave'() {
    return Hand.find({ $and: [{ location: 'grave' }, { player: id._id }] });
  },
  'ograve'() {
    return Hand.find({ $and: [{ location: 'grave' }, { player: opponent._id }] });
  },
  'fLand'() {
    return Hand.find({ $and: [{ location: 'deck' }, { player: id._id }, { type: 'land' }] });
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
  'spells'() {
    return Field.find({ type: 'spell' });
  },
  'olife'() {
    return Dmsgs.find({ player: opponent.profile.name });
  },
  'life'() {
    return Dmsgs.find({ player: id.profile.name });
  },
  'loop'(amount) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push(i);
    }
    return array;
  },
  'deckcounter'() {
    return Hand.find({ $and: [{ player: id._id }, { location: 'deck' }] }).count();
  },
  'odeckcounter'() {
    return Hand.find({ $and: [{ player: opponent._id }, { location: 'deck' }] }).count();
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
  'mouseover img'(event) {
    card = event.target.getAttribute('src');
    document.getElementById('zoom').innerHTML = `<img style="width: 100%" src="${card}"/>`;
  },
  'click .leave'() {
    if (window.confirm('Are you sure you want to leave this game?')) {
      FlowRouter.go('Home_Page');
    }
  },
  'click .redraw'() {
    Meteor.call('mullnotify', id.profile.name, id._id);
    Meteor.call('mull', id._id);
  },
  'click .end'() {
    Meteor.call('end', id.profile.name, id._id);
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
    // card = Hand.findOne({ path: card });
    card = Hand.findOne({ $and: [{ path: card }, { player: id._id }] });
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
                  <button class="ui button" onclick="Meteor.call('sac', card._id)">Sacrifice</button>
                  <!--<button class="ui button" onclick="Meteor.call('untap', card._id)">Untap</button>-->
                </div>
            </div>`,
    }).popup('toggle');
  },
  'click .mons'(event) {
    card = event.target.getAttribute('src');
    // card = Hand.findOne({ path: card });
    card = Hand.findOne({ $and: [{ path: card }, { player: id._id }] });
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
    card = Hand.findOne({ $and: [{ path: card }, { player: id._id }] });
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
                  <button class="ui button" onclick="Meteor.call('play', card)">Play</button>
                  <button class="ui button" onclick="Meteor.call('discard', card._id)">Discard</button>
                </div>
            </div>`,
    }).popup('toggle');
  },
  'click .spells'(event) {
    card = event.target.getAttribute('src');
    card = Field.findOne({ $and: [{ path: card }, { player: opponent._id }] });
    if (card !== undefined) {
      $(event.target).popup({
        hoverable: false,
        on: 'click',
        position: 'left center',
        variation: 'basic inverted',
        html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui button" onclick="Meteor.call('dismiss', card._id)">Dismiss</button>
                </div>
            </div>`,
      }).popup('toggle');
    }
  },
  'click .plus.square'() {
    Meteor.call('add', id._id);
  },
  'click .minus'() {
    Meteor.call('min', id._id);
  },
  'click .untp'() {
    Meteor.call('untapper', id._id);
  },
  'click .fetch'() {
    Meteor.call('fetchnot', id.profile.name, id._id);
    $('.ui.fullscreen.fetchin.modal').modal('show');
  },
  // 'click .fland img'(event) {
  //   console.log('clicked');
  //   card = event.target.getAttribute('src');
  //   Meteor.call('fetch', id._id, card);
  // },
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('sendDmsg', id, text);
    scrollToBottom();
    event.target.text.value = '';
  },
});
