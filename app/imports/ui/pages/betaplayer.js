import { Template } from 'meteor/templating';

Template.Betaplayer.onRendered(function () {
  $('.ui.two.row.main.container').transition('slide down in', '0.4s');

  const hours = new Date();
  const time = hours.getHours();
  if (time > 19 || time < 6) {
    $('body').addClass('nightbg');
  }
});

Template.Betaplayer.onDestroyed(function () {
  $('body').removeClass('nightbg');
});
