define([
    'marionette',
    'app/templates/syncs/edit'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      trigger: 'a.trigger',
      cancel: 'a.cancel',
      delete: 'a.delete',
      content: '.content'
    },

    events: {
      'click @ui.trigger': 'triggerSync',
      'click @ui.delete': 'deleteSync'
    },

    triggers: {
      'click @ui.cancel': 'cancel'
    },

    initialize: function (options) {
      this.service = options.service;
      this.inner = options.inner;
      this.inner.on('save', this.saveSync, this);
    },

    onShow: function () {
      this.inner.setElement(this.ui.content);
      this.inner.render();
    },

    onClose: function () {
      this.inner.close();
    },

    saveSync: function (sync) {
      this.trigger('save', sync);
    },

    triggerSync: function () {
      this.trigger('trigger', this.model);
    },

    deleteSync: function () {
      this.trigger('delete', this.model);
    }
  });
});
