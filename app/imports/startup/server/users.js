import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('userStatus', function () {
    return Meteor.users.find({ 'status.online': true },
        { fields: { 'profile.name': 1, _id: 1 } });
  });
}
