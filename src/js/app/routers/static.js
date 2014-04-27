define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      '': 'dashboard'
    },

    dashboard: function () {
      channel.commands.execute('app:show:dashboard');
    }
  });
});
