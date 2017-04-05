import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// import { _ } from 'meteor/underscore';

/* eslint-disable no-console */


/* Validate username, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
  if (user) {
    const username = user.services.cas.id;
    if (username && _.contains(Meteor.settings.allowed_users, username)) {
      return true;
    }
  }
  throw new Meteor.Error(403, 'User not in the allowed list');
});
*/

// Cas login homepage html and js

// if (!Meteor.settings.cas) {
//   console.log('CAS settings not found! Hint: "meteor --settings ../config/settings.development.json"');
// }

// Temp regular accounts
if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'Creighton',
    password: 'stuff',
    profile: { name: 'Creighton' },
  });
  Accounts.createUser({
    username: 'John',
    password: 'stuff2',
    profile: { name: 'John' },
  });
}
