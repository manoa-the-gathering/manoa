import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

let id = 'Select a User';
let selected = 'None';


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
    id = Meteor.userId(); // only gets current user of who clicked it
    id = Meteor.users.findOne({ _id: id });
    document.getElementById('result').innerHTML = 'User is ' + id.profile.name;

    selected = event.target.innerHTML;
    selected = Meteor.users.findOne({ 'profile.name': selected} );
    document.getElementById('select').innerHTML = 'S user is ' + selected.profile.name;
  },
  'click .ui.button.mRequest'() {
    if (id === 'Select a User' || id === 'Please select a user') {
      document.getElementById('result').innerHTML = 'Please select a user';
    }
    else {
     // Meteor.call("request",)

    }
  },
});

