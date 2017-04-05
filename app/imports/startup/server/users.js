import {Meteor} from 'meteor/meteor';
import {Requests} from '../../api/requests/requests.js';

Meteor.publish('userStatus', function () {
  return Meteor.users.find({ 'status.online': true },
      { fields: { 'profile.name': 1, _id: 1 } });
});
Meteor.publish('requests', function () {
  return Requests.find();
});

Meteor.methods({
  'request'(rqUser, targetUsr) {
    Requests.remove({});
    Requests.insert({ targetUser: targetUsr, requestString: `${rqUser.profile.name} battle` });
    Requests.insert({ targetUser: rqUser, requestString: `Request sent to ${targetUsr.profile.name}` });
  },
  'acceptError'(user) {
    Requests.insert({ targetUser: user, requestString: 'No Match Request found' });
  },
  'notify'(user1, user2) {
    Requests.insert({
      targetUser: user2, requestString: `${user1.profile.name} accepted` });
  },
  'cleanup'() {
    Requests.remove({});
  },
});

