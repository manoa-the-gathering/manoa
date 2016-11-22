import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  Meteor.subscribe('userStatus');
}

Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
});

Template.Match_Page.helpers({
  listUsers() {
    return Meteor.users.find();
  },
});
