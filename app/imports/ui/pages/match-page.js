import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests } from '../../api/requests/requests.js';
import { Messages } from '../../api/msgs/msgs.js';

let id;
let selected = 'Select a User';
let chatSession = 'general';

Template.Match_Page.events({
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    let chat = Session.get('chat');
    if (text === 'rainbows') {
      $('body').addClass('matchbg2');
      event.target.text.value = '';
      return;
    }
    switch (text) {
      case 'rainbows': $('body').addClass('matchbg2');
        break;
      case 'no rainbows': $('body').removeClass('matchbg2');
        break;
      default: {Meteor.call('sendMessage', text, chat); scrollToBottom();}
    }
    event.target.text.value = '';
  },
  'click .ui.user.list div'(event) {
    selected = event.target.innerHTML;
    selected = Meteor.users.findOne({ 'profile.name': selected });
    sessionStorage.setItem('opponent', JSON.stringify(selected));
    // console.log(selected);
    // console.log(JSON.parse(sessionStorage.getItem('opponent')));
    chatSession = [selected.profile.name, id.profile.name].sort().join("+");
    Session.set('chat', chatSession);
    document.getElementById('select').innerHTML = `Selected User is ${selected.profile.name}`;
  },
  'click .ui.button.mRequest'() {
    event.preventDefault();
    if (selected === 'Select a User' || selected === 'Please select a user') {
      document.getElementById('select').innerHTML = 'Please select a user';
    }
    else {
      Meteor.call('request', id, selected);
    }
  },
  'click .ui.button.accept'() {
    event.preventDefault();
    if (selected === 'Select a User' || selected === 'Please select a user') {
      document.getElementById('select').innerHTML = 'Please select a user';
    }
    else {
      if (Requests.findOne({
            $and: [{ 'targetUser._id': id._id },
              { requestString: `${selected.profile.name} battle` }]
          }) !== undefined) {
        Meteor.call('notify', id, selected);
        Meteor.call('cleanup', id._id);
        FlowRouter.go('Battle_Page', { _identifier: [selected._id, id._id].sort().join('+') });
      }
      else if (Requests.findOne({
              $and: [{ 'targetUser._id': id._id },
                {
                  requestString: `${selected.profile.name} accepted`
                }]
            }) !== undefined) {
        Meteor.call('cleanup', id._id);
        FlowRouter.go('Battle_Page', { _identifier: [selected._id, id._id].sort().join('+') });
        }
        else {
          Meteor.call('acceptError', id);
        }
    }
  },
  'click .ui.button.gChat'() {
    chatSession = 'general';
    Session.set('chat', chatSession);
    document.getElementById('select').innerHTML = 'Please select a user';
  },
});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
  $('body').removeClass('matchbg2');
});

Template.Match_Page.helpers({
  recentMessages() {
    return Messages.find({}, { sort: { createdAt: 1 } });
  },
  listUsers() {
    return Meteor.users.find();
  },
  listRequests() {
    return Requests.find({ 'targetUser.profile.name': id.profile.name });
  },
});

function scrollToBottom() {
  $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight + $('#chatbox').height());
}

Template.Match_Page.onCreated(function () {
  Meteor.autorun(function () {
    Meteor.subscribe('messages', Session.get('chat'), {
      onReady() {
        return scrollToBottom();
      },
    });
  });
  Meteor.subscribe('userStatus');
  Meteor.subscribe('requests');
  id = Meteor.user();
  chatSession = 'general';
  Session.set('chat', chatSession);
  selected = 'Select a user';
});

Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
  $('.ui.two.row.main.container').transition('slide down in', '0.4s');
  // document.getElementById('result').innerHTML = `You are ${id.profile.name}`;
  document.getElementById('select').innerHTML = 'Select a User';
});


