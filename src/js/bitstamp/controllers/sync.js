define([
    'channel',
    'marionette'
  ], function (
    channel,
    Marionette
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.options = options;
    },

    onClose: function () {
    },

    sync: function () {
      
    }
  });
});
