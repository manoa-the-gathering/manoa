import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Naya } from '../../api/naya/naya.js';
import { Hand } from '../../api/pHand/pHand.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

let id;

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
  document.getElementById('name').innerHTML = id.profile.name;
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
  Meteor.call('quitGame', id._id);
});

Template.Battle_Page.onCreated(function () {
  id = Meteor.user();
  Meteor.autorun(function () {
    Meteor.subscribe('pHand', id._id);
  });
  // Meteor.subscribe('naya');
  Meteor.call('newGame', id._id);
});

Template.Battle_Page.helpers({
  // 'images'() {
  //   return Naya.find();
  // },
  'cardInHand'() {
    return Hand.find({ location: 'hand' });
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
  'click .card'(event) {
    let card = event.target.getAttribute('src');
    card = Hand.findOne({ path: card });
    $(event.target).popup({
      // title: 'Popup Title',
      // title: `${card.card}`,
      hoverable: false,
      on: 'click',
      variation: 'basic inverted',
      html: `<div class="ui one column center aligned grid">
              <div class="column">
                <h4 class="ui header">${card.card}</h4>
                <div class="ui vertical basic inverted buttons">
                  <button class="ui button">Play</button>
                  <button class="ui button">Discard</button>
                </div>
              <!--<div class="ui inverted actionPlay button">Play</div>-->
            </div>`,
    }).popup('toggle');
  },
  'click .actionPlay'(event) {
    event.stopPropagation();
  }
});
