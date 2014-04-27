define([
    'channel',
    'marionette',
    'app/templates/navigation'
  ], function (channel, Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    events: {
      'click a.home': 'showDashboard',
      'click a.dashboard': 'showDashboard',
      'click a.trades': 'showTrades',
      'click a.analysis': 'showAnalysis',
      'click a.notifications': 'toggleNotifications'
    },

    modelEvents: {
    },

    initialize: function () {
    },

    onShow: function () {
    },

    serializeData: function () {
      return {};
    },

    showDashboard: function () {
      channel.commands.execute('app:show:dashboard');
      return false;
    },

    showTrades: function () {
      channel.commands.execute('app:show:trades');
      return false;
    },

    showAnalysis: function () {
      channel.commands.execute('app:show:analysis');
      return false;
    },

    toggleNotifications: function () {
      return false;
    }
  });
});
