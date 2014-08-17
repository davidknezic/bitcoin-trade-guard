define([
    'channel',
    'marionette',
    'intro/controllers/app'
  ], function (
    channel,
    Marionette,
    AppController
  ) {
  return Marionette.Module.extend({
    initialize: function (options, moduleName, app) {
    },

    onStart: function (options) {
      this.app = new AppController();

      this.app.display();
    },

    onStop: function (options) {
      this.app.destory();
    },
  });
});
