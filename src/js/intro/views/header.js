define([
    'marionette',
    'intro/templates/header'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: 'header',
    className: 'header-intro',

    ui: {
      'learn': 'a.learn-more'
    },

    triggers: {
      'click @ui.learn': 'learn'
    }
  });
});
