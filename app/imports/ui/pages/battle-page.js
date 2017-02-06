import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Naya } from '../../api/naya/naya.js';

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
});

Template.Battle_Page.onCreated(function () {
  Meteor.subscribe('naya');
});

Template.Battle_Page.helpers({
  'images'() {
    return Naya.find();
  },
});
