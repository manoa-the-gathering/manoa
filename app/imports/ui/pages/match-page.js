Template.Match_Page.onRendered(function () {
  $('body').addClass('matchbg');
});

Template.Match_Page.onDestroyed(function () {
  $('body').removeClass('matchbg');
});