define([
    'marionette',
    'intro/templates/app'
  ], function (Marionette, template) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      header: '.header',
      main: '.main',
      subscribe: '.subscribe',
      footer: '.footer'
    }
  });
});
