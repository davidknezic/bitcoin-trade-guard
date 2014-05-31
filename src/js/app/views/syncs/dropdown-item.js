define([
    'marionette',
    'app/templates/syncs/dropdown-item'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: "li",

    ui: {
      link: 'a'
    },

    events: {
      'click @ui.link': 'click'
    },

    onShow: function () {
      this.ui.link.text(this.model.get('name'));
    },

    click: function (event) {
      event.preventDefault();

      this.trigger('click', this.model);
    }
  });
});
