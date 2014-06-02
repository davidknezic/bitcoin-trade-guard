define([
    'channel',
    'marionette',
    'bitstamp/controllers/sync',
    'bitstamp/views/new',
    'bitstamp/views/edit'
  ], function (
    channel,
    Marionette,
    SyncController,
    NewView,
    EditView
  ) {
  return Marionette.Module.extend({
    initialize: function (options, moduleName, app) {
    },

    onStart: function (options) {
      this.services = channel.reqres.request('app:data:services');

      this.service = this.services.add({
        name: 'Bitstamp',
        slug: 'bitstamp'
      });

      channel.reqres.setHandler('bitstamp:view:new', function () {
        return new NewView();
      });

      channel.reqres.setHandler('bitstamp:view:edit', function (sync) {
        return new EditView();
      });

      channel.reqres.setHandler('bitstamp:sync', function (options) {
        return new SyncController(options);
      });
    },

    onStop: function (options) {
      this.services.remove(this.service);

      channel.reqres.removeHandler('bitstamp:view:new');
      channel.reqres.removeHandler('bitstamp:view:edit');
    },
  });
});
