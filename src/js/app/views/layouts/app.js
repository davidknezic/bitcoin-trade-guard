define([
    'marionette',
    'app/templates/layouts/app'
  ], function (Marionette, template) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      navigation: '#navigation',
      content: '#content',
      footer: '#footer'
    }
  });
});
