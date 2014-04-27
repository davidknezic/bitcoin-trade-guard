define([
    'channel',
    'marionette',
    'app/views/dashboard'
  ], function (channel, Marionette, DashboardView) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      channel.commands.setHandler('app:show:dashboard', this.dashboard);
    },

    onClose: function () {
    },

    dashboard: function () {
      var view = new DashboardView();

      channel.commands.execute('app:title:set', 'Dashboard');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/');
    }
  });
});
