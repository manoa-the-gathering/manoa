import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.BattleMenu.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .leave': function casLogout(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to leave this game?')) {
      FlowRouter.go('Home_Page');
    }
    return false;
  },
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    if (window.confirm('Would you like to log out?')) {
      Meteor.logout();
    }
    return false;
  },
});
