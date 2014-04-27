define([
    'marionette',
    'app/templates/layout'
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
