import { Template } from 'meteor/templating';


Template.Terms_Page.onRendered(function () {
  $('body').addClass('rulesbg');
  $('.ui.accordion')
   .accordion()
  ;
});

Template.Terms_Page.onDestroyed(function () {
  $('body').removeClass('rulesbg');
});
