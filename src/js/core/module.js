define([
    'channel',
    'marionette',
    'core/controllers/tracking'
  ], function (
    channel,
    Marionette,
    TrackingController
  ) {
  return Marionette.Module.extend({
    initialize: function (options, moduleName, app) {
    },

    onStart: function (options) {
      this.tracking = new TrackingController();

      this.tracking.trackPageView();
    },

    onStop: function (options) {
      this.trackingController.close();
    },
  });
});
