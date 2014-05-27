define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      '': 'dashboard',
      'settings': 'settings'
    },

    dashboard: function () {
      channel.commands.execute('app:show:dashboard');
    },

    settings: function () {
      channel.commands.execute('app:show:settings');
    }
  });
});
