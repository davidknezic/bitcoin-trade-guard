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

      channel.vent.on('track:view', function (view) {
        this.tracking.trackView(view);
      }, this);

      channel.vent.on('track:action', function (action) {
        this.tracking.trackAction(action);
      }, this);
    },

    onStop: function (options) {
      this.trackingController.close();
    },
  });
});
