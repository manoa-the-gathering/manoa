var hours = new Date();
time = hours.getHours();
if (time > 12) {

  Template.Home_Page.onRendered(function () {
    $('body').addClass('nightbg');
  });
}

Template.Home_Page.onDestroyed(function () {
  $('body').removeClass('nightbg');
});
