import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests } from '../../api/requests/requests.js';
import { Messages } from '../../api/msgs/msgs.js';
import { ReactiveVar } from 'meteor/reactive-var';

let id;
let selected = 'Select a User';
let chatSession = 'general';
let scroll;

function scrollToBottom() {
  // $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight + $('#chatbox').height());
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
      document.getElementById('t').blur();
      break;
  }
}

Template.Match_Page.onCreated(function () {
  chatSession = 'General';
  Template.instance.cht = new ReactiveVar(chatSession);
  Session.set('chat', chatSession);
  selected = 'Select a user';
  Meteor.subscribe('userStatus');
  Meteor.subscribe('requests');
  Meteor.autorun(function () {
    Meteor.subscribe('messages', Session.get('chat'));
  });
  sessionStorage.removeItem('user');
  id = Meteor.user();
  sessionStorage.setItem('user', JSON.stringify(id));
});

Template.Match_Page.onRendered(function () {
  $('.ui.checkbox')
      .checkbox({
        'onChecked'() {
          scroll = Messages.find().observeChanges({
            'added'() {
              scrollToBottom();
            },
          });
        },
        'onUnchecked'() {
          scroll.stop();
        },
      });
  $('body').addClass('matchbg');
  $('.ui.two.row.main.container').transition('slide down in', '0.4s');
  document.getElementById('select').innerHTML = 'Select a User';
  document.body.addEventListener('keydown', keybinder, false);
  $('.ui.checkbox').checkbox('check');
});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
  $('body').removeClass('matchbg2');
  scroll.stop();
});

Template.Match_Page.helpers({
  recentMessages() {
    return Messages.find();
  },
  listUsers() {
    return Meteor.users.find();
  },
  listRequests() {
    return Requests.find({ 'targetUser.profile.name': id.profile.name });
  },
  cht() {
    return Template.instance.cht.get();
  },
});

Template.Match_Page.events({
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    const chat = Session.get('chat');
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
    if (selected === id.profile.name) return;
    selected = Meteor.users.findOne({ 'profile.name': selected });
    sessionStorage.removeItem('opponent');
    sessionStorage.setItem('opponent', JSON.stringify(selected));
    chatSession = [selected.profile.name, id.profile.name].sort().join("+");
    Session.set('chat', chatSession);
    Template.instance.cht.set(chatSession);
    document.getElementById('select').innerHTML = `Selected User is ${selected.profile.name}`;
  },
  'click .ui.button.mRequest'(event) {
    event.preventDefault();
    if (selected === 'Select a User' || selected === 'Please select a user') {
      document.getElementById('select').innerHTML = 'Please select a user';
    }
    else {
      Meteor.call('request', id, selected);
    }
  },
  'click .ui.button.accept'(event) {
    event.preventDefault();
    if (selected === 'Select a User' || selected === 'Please select a user') {
      document.getElementById('select').innerHTML = 'Please select a user';
    }
    else {
      if (Requests.findOne({
            $and: [{ 'targetUser._id': id._id },
              { requestString: `Duel request from ${selected.profile.name}` }]
          }) !== undefined) {
        Meteor.call('notify', id, selected);
        Meteor.call('cleanup', id._id);
        Meteor.call('newGame', id._id);
        FlowRouter.go('Battle_Page', { _identifier: [selected._id, id._id].sort().join('+') });
      }
      else if (Requests.findOne({
              $and: [{ 'targetUser._id': id._id },
                {
                  requestString: `${selected.profile.name} accepted`
                }]
            }) !== undefined) {
        Meteor.call('cleanup', id._id);
        Meteor.call('newGame', id._id);
        FlowRouter.go('Battle_Page', { _identifier: [selected._id, id._id].sort().join('+') });
        }
        else {
          Meteor.call('acceptError', id);
        }
    }
  },
  'click .ui.button.gChat'() {
    chatSession = 'General';
    Session.set('chat', chatSession);
    Template.instance.cht.set(chatSession);
    document.getElementById('select').innerHTML = 'Please select a user';
  },
});
