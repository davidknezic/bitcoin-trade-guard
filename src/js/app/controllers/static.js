define([
    'channel',
    'marionette',
    'app/views/dashboard',
    'app/views/settings'
  ], function (channel, Marionette, DashboardView, SettingsView) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');

      channel.commands.setHandler('app:show:dashboard', this.dashboard.bind(this));
      channel.commands.setHandler('app:show:settings', this.settings.bind(this));
    },

    onClose: function () {
    },

    dashboard: function () {
      var view = new DashboardView({
        trades: this.trades
      });

      channel.commands.execute('app:title:set', 'Dashboard');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/');
    },

    settings: function () {
      var view = new SettingsView({
      });

      channel.commands.execute('app:title:set', 'Dashboard');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/settings');
    }
  });
});
