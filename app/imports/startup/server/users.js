import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Requests} from '../../api/requests/requests.js';

if (Meteor.isServer) {
  Meteor.publish('userStatus', function () {
    return Meteor.users.find({ 'status.online': true },
        { fields: { 'profile.name': 1, _id: 1 } });
  });
  Meteor.publish('requests', function () {
    return Requests.find();
  });
}

Meteor.methods({
  'request'(rqUser, targetUser) {
    const requestString = `${rqUser.profile.name} wants to battle! Send them a request to accept.`;
    const newRequest = { targetUser, requestString };
    Requests.insert(newRequest);
  },
  'acceptError'(user) {
    Requests.insert({ targetUser: user, requestString: 'No Match Request found' });
  },
  'notify'(user1, user2) {
    Requests.insert({ targetUser: user2, requestString: `${user1.profile.name} 
    has accepted your request. Select them from the list and click accept to begin the match.` });
  },
});
