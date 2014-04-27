define([
    'marionette',
    'app/templates/footer'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template
  });
});
