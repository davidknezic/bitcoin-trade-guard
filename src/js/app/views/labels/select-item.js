define([
    'marionette',
    'app/templates/labels/select-item'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: "li",

    ui: {
      label: 'a',
      color: '.color',
      text: '.text'
    },

    events: {
      'click a': 'select'
    },

    initialize: function (options) {
    },

    onRender: function () {
      this.ui.text.text(this.model.get('text'));
      this.ui.color.css('background-color', this.model.get('color'));

      this.toggle(false);
    },

    select: function (event) {
      event.preventDefault();

      this.trigger('click', this.model);
    },

    toggle: function (isActive) {
      if (isActive) {
        this.ui.label.css('background-color', this.model.get('color'));
        this.ui.label.css('color', this.model.calculateFrontColor());
      } else {
        this.ui.label.css('background-color', '');
        this.ui.label.css('color', '');
      }
    }
  });
});
