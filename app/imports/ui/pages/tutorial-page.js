import { Template } from 'meteor/templating';

Template.Tutorial_Page.onRendered(function () {
  $('.ui.two.row.main.container').transition('slide down in', '0.4s');
});
