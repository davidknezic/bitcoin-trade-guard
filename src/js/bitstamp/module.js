define([
    'channel',
    'marionette',
    'app/models/service',
    'bitstamp/views/new',
    'bitstamp/views/edit'
  ], function (channel, Marionette, Service, NewView, EditView) {
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
    },

    onStop: function (options) {
      this.services.remove(this.service);

      channel.reqres.removeHandler('bitstamp:view:new');
      channel.reqres.removeHandler('bitstamp:view:edit');
    },
  });
});
