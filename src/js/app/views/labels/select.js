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
      items: '.labels-list',
      toggle: '.visibility-toggle'
    },

    events: {
      'click .visibility-toggle': 'toggleVisibility'
    },

    itemEvents: {
      'click': 'clickLabel'
    },

    initialize: function (options) {
      this.selected = options.selected;
      this.selected.on('add remove reset', this.reselect, this)
    },

    onRender: function () {
      this.newLabelView = new NewLabelView({
        el: this.ui.create,
        labels: this.collection
      });

      this.ui.create.addClass('hidden');
      this.ui.toggle.text('show');

      this.newLabelView.render();
    },

    onClose: function () {
      this.newLabelView.close();
    },

    toggleVisibility: function (event) {
      event.preventDefault();

      if (this.ui.create.hasClass('hidden')) {
        this.ui.create.removeClass('hidden');
        this.ui.toggle.text('hide');
      } else {
        this.ui.create.addClass('hidden');
        this.ui.toggle.text('show');
      }
    },

    clickLabel: function (eventName, view, model) {
      if (this.selected.contains(model)) {
        this.selected.remove(model);
        view.toggle(false);
      } else {
        this.selected.add(model);
        view.toggle(true);
      }
    },

    reselect: function () {
      this.children.each(function (view) {
        view.toggle(this.selected.contains(view.model));
      }, this);
    }
  });
});
