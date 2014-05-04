define([
    'marionette',
    'app/templates/panels/importing'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template
  });
});
