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
});
