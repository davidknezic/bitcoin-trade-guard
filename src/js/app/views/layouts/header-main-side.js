define([
    'marionette',
    'app/templates/layouts/header-main-side'
  ], function (Marionette, template) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      header: '.header',
      main: '.main',
      side: '.side'
    }
  });
});
