define([
    'marionette',
    'app/templates/syncs/dropdown',
    'app/views/syncs/dropdown-item'
  ], function (Marionette, template, SyncsDropdownItemView) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: SyncsDropdownItemView,
    itemViewContainer: 'ul',

    itemEvents: {
      'click': 'clickItem'
    },

    clickItem: function (eventName, view, model) {
      this.trigger('click:item', model);
    }
  });
});
