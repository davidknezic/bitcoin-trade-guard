define([
    'marionette',
    'intro/templates/footer'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: 'footer',
    className: 'intro-footer'
  });
});
