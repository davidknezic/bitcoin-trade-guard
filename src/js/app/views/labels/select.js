define([
    'marionette',
    'app/templates/labels/select',
    'app/views/labels/select-item',
    'app/views/labels/new'
  ], function (Marionette, template, LabelSelectItemView, NewLabelView) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: LabelSelectItemView,
    itemViewContainer: ".labels-list",

    ui: {
      create: '.create',
      items: '.labels-list'
    },

    initialize: function () {
    },

    onRender: function () {
      this.newLabelView = new NewLabelView({
        el: this.ui.create,
        labels: this.collection
      });

      this.newLabelView.render();
    },

    onClose: function () {
      this.newLabelView.close();
    }
  });
});
