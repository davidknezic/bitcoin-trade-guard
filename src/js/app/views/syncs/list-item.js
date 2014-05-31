define([
    'marionette',
    'app/templates/syncs/list-item'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: "a",
    className: "list-group-item",
    attributes: {
      href: "#"
    },

    ui: {
      self: ''
    },

    events: {
      'click @ui.self': 'click',
    },

    click: function (event) {
      event.preventDefault();

      this.trigger('click', this.model);
    }
  });
});
