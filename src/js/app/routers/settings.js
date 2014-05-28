define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      'settings': 'settings'
    },

    settings: function () {
      channel.commands.execute('app:show:settings');
    }
  });
});
