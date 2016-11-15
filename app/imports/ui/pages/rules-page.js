Template.Rules_Page.onRendered(function() {
  $('body').addClass('rulesbg');
});

Template.Rules_Page.onDestroyed(function() {
  $('body').removeClass('rulesbg');
});
