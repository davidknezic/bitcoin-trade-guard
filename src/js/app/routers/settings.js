define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      'settings': 'settings',
      'settings/syncs': 'syncs',
      'settings/syncs/new?service=:service': 'newSync',
      'settings/syncs/:id/edit': 'editSync'
    },

    settings: function () {
      channel.commands.execute('app:show:settings');
    },

    syncs: function () {
      channel.commands.execute('app:show:settings:syncs');
    },

    newSync: function (serviceName) {
      var services = channel.reqres.request('app:data:services'),
          service;

      service = services.find({ name: serviceName });

      channel.commands.execute('app:show:settings:syncs:new', service);
    },

    editSync: function (id) {
      var syncs = channel.reqres.request('app:data:syncs'),
          sync = syncs.get(id);

      channel.commands.execute('app:show:settings:syncs:edit', sync);
    }
  });
});
