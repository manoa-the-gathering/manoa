import { Template } from 'meteor/templating';


Template.Decks_Page.onRendered(function () {
  $('body').addClass('rulesbg');
  $('.ui.accordion')
   .accordion()
  ;
});

Template.Decks_Page.onDestroyed(function () {
  $('body').removeClass('rulesbg');
});
