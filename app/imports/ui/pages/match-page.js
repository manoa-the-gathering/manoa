import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

let id = 'Select a User';

if (Meteor.isClient) {
  Meteor.subscribe('userStatus');
}

Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
  document.getElementById('result').innerHTML = id;

});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
});

Template.Match_Page.helpers({
  listUsers() {
    return Meteor.users.find();
  },
});

Template.Match_Page.events({
  'click .ui.user.list li'(event) {
    event.preventDefault();
    id = Meteor.userId();
    document.getElementById('result').innerHTML = 'User Id is '+id;
  },
});

