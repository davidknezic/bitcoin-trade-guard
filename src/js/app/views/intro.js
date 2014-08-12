define([
    'marionette',
    'app/templates/intro'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template
  });
});
