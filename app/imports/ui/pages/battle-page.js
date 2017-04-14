import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Hand } from '../../api/pHand/pHand.js';
import { Field } from '../../api/field/field.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

let id;
let opponent;
let autoscroll;
let handcount;
let atk = 0;
let mulli = 0;

function scrollToBottom() {
  $('#chatbox').animate({ scrollTop: $('#chatbox')[0].scrollHeight - $('#chatbox')[0].clientHeight + 37 }, 200);
}

function keybinder(event) {
  switch (event.keyCode) {
    case 73:
      if (!$('#t').is(':focus')) {
        event.preventDefault();
        document.getElementById('t').focus();
      }
      break;
    // ESC
    case 27:
      atk = 0;
      document.getElementById('t').blur();
      $('.lightning').removeClass('red');
      break;
    case 65:
      if (!$('#t').is(':focus')) {
        atk = 1;
        $('.lightning').addClass('red');
      }
      break;
    case 65:
      if (!$('#t').is(':focus')) {
        atk = 1;
        $('.lightning').addClass('red');
      }
      break;
    case 85:
      if (!$('#t').is(':focus')) {
        if (!atk) {
          Meteor.call('untapper', id._id);
        }
      }
      break;
  }
}

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');

  handcount = Hand.find({ location: 'hand' }).observeChanges({
    'added'() {
      Meteor.call('update', id._id);
    },
    'removed'() {
      Meteor.call('update', id._id);
    },
  });
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
          autoscroll.stop();
        },
      });
  $('.ui.checkbox').checkbox('check');
  Meteor.call('life', id, 20);
  $('.ui.checkbox').checkbox('check');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
  Meteor.call('quitGame', id._id);
  document.body.removeEventListener('keydown', keybinder, false);
  handcount.stop();
});

Template.Battle_Page.onCreated(function () {
  atk = 0;
  mulli = 0;
  id = JSON.parse(sessionStorage.getItem('user'));
  opponent = JSON.parse(sessionStorage.getItem('opponent'));
  Meteor.autorun(function () {
    Meteor.subscribe('pHand', id._id, opponent._id);
    Meteor.subscribe('field', id._id, opponent._id);
    Meteor.subscribe('duelmsg', id._id, opponent._id, id.profile.name, opponent.profile.name);
  });
  document.body.addEventListener('keydown', keybinder, false);
});

Template.Battle_Page.helpers({
  // 'images'() {
  //   return Naya.find();
  // },
  'cardInHand'() {
    return Hand.find({ $and: [{ location: 'hand' }, { player: id._id }] });
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
    return Dmsgs.find();
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
    if (!atk) {
      Meteor.call('draw', id._id);
    }
    // console.log("draw call");
    // $('.ui.basic.modal')
    //     .modal('setting', 'closable', false)
    //     .modal('show');
  },
  'click .lightning'() {
    if (!atk) {
      atk = 1;
      $('.lightning').addClass('red');
    }
    else {
      atk = 0;
      $('.lightning').removeClass('red');
    }
  },
  'mouseover img'(event) {
    const card = event.target.getAttribute('src');
    document.getElementById('zoom').innerHTML = `<img style="width: 100%" src="${card}"/>`;
  },
  'click .leave'() {
    if (window.confirm('Are you sure you want to leave this game?')) {
      FlowRouter.go('Home_Page');
    }
  },
  'click .redraw'() {
    if (!mulli) {
      Meteor.call('mullnotify', id.profile.name, id._id);
      Meteor.call('mull', id._id);
    }
    if (mulli) {
      $(event.target)
          .popup({
            title: 'You can only mulligan on your first move',
          }).popup('toggle');
    }
  },
  'click .end'() {
    mulli = 1;
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
    let card = event.target.getAttribute('src');
    // card = Hand.findOne({ path: card });
    card = Hand.findOne({ $and: [{ path: card }, { player: id._id }] });
    $(event.target).popup({
      hoverable: false,
      on: 'click',
      position: 'right center',
      variation: 'basic inverted',
      html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui tp button">Tap</button>
                  <button class="ui sac button">Sacrifice</button>
                  <!--<button class="ui button" onclick="Meteor.call('untap', card._id)">Untap</button>-->
                </div>
            </div>`,
    }).popup('toggle');
    $('.ui.tp.button').click(function () {
      Meteor.call('tap', card._id);
    });
    $('.ui.sac.button').click(function () {
      Meteor.call('sac', card._id, id);
    });
  },
  'click .mons'(event) {
    let card = event.target.getAttribute('src');
    // card = Hand.findOne({ path: card });
    card = Hand.findOne({ $and: [{ path: card }, { player: id._id }] });
    if (!atk) {
      $(event.target).popup({
        hoverable: false,
        on: 'click',
        position: 'right center',
        variation: 'basic inverted',
        html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui tp button">Tap</button>
                  <button class="ui utp button">Untap</button>
                </div>
            </div>`,
      }).popup('toggle');
      $('.ui.tp.button').click(function () {
        Meteor.call('tap', card._id);
      });
      $('.ui.utp.button').click(function () {
        Meteor.call('untap', card._id);
      });
    }
    else {
      $(event.target).popup({
        hoverable: false,
        on: 'click',
        position: 'right center',
        variation: 'basic inverted',
        html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui atk button">Attack</button>
                  <button class="ui blk button">Block</button>
                  <button class="ui die button">Die</button>
                </div>
            </div>`,
      }).popup('toggle');
      $('.ui.atk.button').click(function () {
          Meteor.call('tap', card._id);
          Meteor.call('atknot', card.card, id._id);
      });
      $('.ui.blk.button').click(function () {
        Meteor.call('tap', card._id);
        Meteor.call('blknot', card.card, id._id);
      });
      $('.ui.die.button').click(function () {
        Meteor.call('sac', card._id);
        Meteor.call('dienot', card.card, id._id);
      });
    }
  },
  'click .card'(event) {
    let card = event.target.getAttribute('src');
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
                  <!--<button class="ui button" onclick="Meteor.call('play', card)">Play</button>-->
                  <button class="ui ply button">Play</button>
                  <button class="ui dis button">Discard</button>
                </div>
            </div>`,
    }).popup('toggle');
    $('.ui.ply.button').click(function () {
      Meteor.call('play', card);
    });
    $('.ui.dis.button').click(function () {
      Meteor.call('discard', card._id);
    });
  },
  'click .spells'(event) {
    let card = event.target.getAttribute('src');
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
                  <button class="ui dismiss button">Dismiss</button>
                </div>
            </div>`,
      }).popup('toggle');
      $('.ui.dismiss.button').click(function () {
        Meteor.call('dismiss', card._id);
      });
    }
  },
  'click .plus.square'() {
    Meteor.call('add', id._id);
  },
  'click .minus'() {
    Meteor.call('min', id._id);
  },
  'click .untp'() {
    if (!atk) {
      Meteor.call('untapper', id._id);
    }
  },
  'click .fetch'() {
    Meteor.call('fetchnot', id.profile.name, id._id);
    $('.ui.fullscreen.fetchin.modal').modal('show');
  },
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('sendDmsg', id, text);
    scrollToBottom();
    event.target.text.value = '';
  },
});
