import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Home_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/rules', {
  name: 'Rules_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Rules_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/about', {
  name: 'About_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'About_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/match', {
  name: 'Match_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Match_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/battle/:_identifier', {
  name: 'Battle_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Battle_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/terms', {
  name: 'Terms_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Terms_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/gameplay', {
  name: 'Gameplay_Page',
  action() {
    BlazeLayout.render('App_Body2', { main: 'Gameplay_Page' });
    BlazeLayout.setRoot('body');
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
