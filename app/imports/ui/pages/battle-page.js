import { Template } from 'meteor/templating';

Template.Battle_Page.onRendered(function () {
  $('body').addClass('battlebg');
});

Template.Battle_Page.onDestroyed(function () {
  $('body').removeClass('battlebg');
});
