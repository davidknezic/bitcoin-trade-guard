define([
    'marionette',
    'app/templates/syncs/new'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      cancel: 'a.cancel',
      content: '.content'
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
    }
  });
});
