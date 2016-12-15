import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests } from '../../api/requests/requests.js';
import { Messages } from '../../api/msgs/msgs.js';

let id;
let selected = 'Select a User';

Template.Match_Page.events({
  'submit .new-message'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    let chat = Session.get('chat');

    Meteor.call('sendMessage', text, chat);
    scrollToBottom();

    event.target.text.value = '';
  },
  'click .ui.user.list div'(event) {
    selected = event.target.innerHTML;
    selected = Meteor.users.findOne({ 'profile.name': selected });
    Session.set('chat', [selected.profile.name, id.profile.name].sort().join("+"));
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
      if (Requests.find({
            $and: [{ 'targetUser._id': id._id },
              { requestString: `${selected.profile.name} wants to battle! Accept their request from the list.` }]
          })) {
        Meteor.call('notify', id, selected);
        FlowRouter.go('Battle_Page', { _identifier: id._id + selected._id });
      }
      else if (Requests.find({
              $and: [{ 'targetUser._id': id._id },
                {
                  requestString: `${selected.profile.name} has accepted your request. Select them 
        from the list and click accept to begin the match.`
                }]
            })) {
          FlowRouter.go('Battle_Page', { _identifier: id._id + selected._id });
        }
        else {
          Meteor.call('acceptError', id);
        }
    }
  },
  'click .ui.button.gChat'() {
    Session.set('chat', 'general');
    document.getElementById('select').innerHTML = 'Please select a user';
  },
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
});

Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
  $('.ui.two.row.main.container').transition('slide down in', '0.4s');
  // document.getElementById('result').innerHTML = `You are ${id.profile.name}`;
  document.getElementById('select').innerHTML = 'Select a User';
});


