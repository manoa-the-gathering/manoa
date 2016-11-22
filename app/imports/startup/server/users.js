//import {UsersOn} from '../../api/users/users.js';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

if (Meteor.isServer) {
  Meteor.publish('userStatus', function () {
    return Meteor.users.find({ "status.online": true });
  });
}
