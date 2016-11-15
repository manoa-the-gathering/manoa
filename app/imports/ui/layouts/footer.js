import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Footer.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    if (window.confirm("Would you like to log out?")) {
      Meteor.logout();
    }
    return false;
  }
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Footer.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});