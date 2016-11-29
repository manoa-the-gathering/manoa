import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests } from '../../api/requests/requests.js';

export const Messages = new Mongo.Collection('msgs');
let id;
let selected = 'Select a User';

function scrollToBottom() {
  $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
};


if (Meteor.isClient) {
  Meteor.subscribe('messages', {
    onReady() {
      scrollToBottom();
    },
  });
  Meteor.subscribe('userStatus');
  Meteor.subscribe('requests');

  Template.Match_Page.onRendered(function () {
    $('body').addClass('matchbg');
    id = Meteor.userId(); // only gets current user of who clicked it
    id = Meteor.users.findOne({ _id: id });
    document.getElementById('result').innerHTML = `You are ${id.profile.name}`;
    document.getElementById('select').innerHTML = 'Select a User';
  });

  Template.Match_Page.onDestroyed(function () {
    $('body').removeClass('matchbg');
  });

  Template.Match_Page.helpers({
    recentMessages() {
      return Messages.find({}, { sort: { createdAt: 1 } });
    },
    listUsers() {
      return Meteor.users.find();
    },
    listRequests() {
      return Requests.find({ 'targetUser._id': Meteor.userId() });
    },
  });

  Template.Match_Page.events({
    'submit .new-message'(event) {
      event.preventDefault();
      let text = event.target.text.value;

      Meteor.call('sendMessage', text);
      scrollToBottom();

      event.target.text.value = '';
    },
    'click .ui.user.list li'(event) {
      selected = event.target.innerHTML;
      selected = Meteor.users.findOne({ 'profile.name': selected });
      document.getElementById('select').innerHTML = `Selected User is ${selected.profile.name}`;
    },
    'click .ui.button.mRequest'() {
      if (selected === 'Select a User' || selected === 'Please select a user') {
        document.getElementById('select').innerHTML = 'Please select a user';
      }
      else {
        Meteor.call('request', id, selected);
      }
    },
    'click .ui.button.accept'() {
      if (selected === 'Select a User' || selected === 'Please select a user') {
        document.getElementById('select').innerHTML = 'Please select a user';
      }
      else {
        if (Requests.findOne({
              $and: [{ 'targetUser._id': id._id },
                { requestString: `${selected.profile.name} wants to battle! Send them a request to accept.` }]
            })) {
          Meteor.call('notify', id, selected);
          FlowRouter.go('Battle_Page', { _identifier: id._id + selected._id });
        }
        else
          if (Requests.findOne({
                $and: [{ 'targetUser._id': id._id },
                  {
                    requestString: `${selected.profile.name} has accepted your request. Select them 
        from the list and click accept to begin the match.`
                  }]
              })) {
            Meteor.call('cleanup', id, selected);
            FlowRouter.go('Battle_Page', { _identifier: id._id + selected._id });
          }
          else {
            Meteor.call('acceptError', id);
          }
      }
    },
  });
}
