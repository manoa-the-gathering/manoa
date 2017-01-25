import { Template } from 'meteor/templating';


Template.Gameplay_Page.onRendered(function () {
  $('body').addClass('rulesbg');
  $('.ui.accordion')
   .accordion()
  ;
});

Template.Gameplay_Page.onDestroyed(function () {
  $('body').removeClass('rulesbg');
});
