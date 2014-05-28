define([
    'channel',
    'marionette',
    'app/views/dashboard'
  ], function (
    channel,
    Marionette,
    DashboardView
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');

      channel.commands.setHandler('app:show:dashboard', this.dashboard.bind(this));
    },

    onClose: function () {
    },

    dashboard: function () {
      var view = new DashboardView({
        trades: this.trades
      });

      channel.commands.execute('app:title:set', 'Dashboard');
      channel.commands.execute('app:current-nav:set', 'dashboard');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/');
    }
  });
});
