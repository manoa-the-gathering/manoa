import { Template } from 'meteor/templating';


Template.Rules_Page.onRendered(function () {
  $('body').addClass('rulesbg');
  $('.ui.accordion')
   .accordion()
  ;
});

Template.Rules_Page.onDestroyed(function () {
  $('body').removeClass('rulesbg');
});
