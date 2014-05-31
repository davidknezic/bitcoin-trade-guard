define([
    'marionette',
    'app/templates/syncs/list',
    'app/views/syncs/list-item',
    'app/views/syncs/dropdown'
  ], function (Marionette, template, SyncListItemView, SyncsDropdownView) {
  return Marionette.CompositeView.extend({
    template: template,

    itemView: SyncListItemView,
    itemViewContainer: ".synchronizations",

    ui: {
      dropdown: '.dropdown',
      notEmpty: '.not-empty',
      empty: '.empty',
      loading: '.loading'
    },

    itemEvents: {
      'click': 'editSync'
    },

    initialize: function (options) {
      this.services = options.services;
    },

    onShow: function () {
      this.collection.on('all', this.onCollectionUpdate, this);
      this.onCollectionUpdate();

      this.dropdown = new SyncsDropdownView({
        collection: this.services,
        el: this.ui.dropdown
      });
      this.dropdown.on('click:item', this.addSync, this);
      this.dropdown.render();
    },

    onClose: function () {
      this.collection.off(null, null, this);
      this.dropdown.close();
    },

    onCollectionUpdate: function (eventName) {
      if (eventName === 'request') {
        return this.setState('loading');
      }

      if (this.collection.isEmpty()) {
        return this.setState('empty');
      } else {
        return this.setState('not-empty');
      }
    },

    setState: function (state) {
      this.ui.notEmpty.toggle(state === 'not-empty');
      this.ui.empty.toggle(state === 'empty');
      this.ui.loading.toggle(state === 'loading');
    },

    addSync: function (service) {
      this.trigger('add:sync', service);
    },

    editSync: function (eventName, view, model) {
      this.trigger('edit:sync', model);
    },
  });
});
