define([
    'channel',
    'marionette',
    'app/templates/navigation',
    'app/views/notifications/popover',
    'bootstrap'
  ], function (channel, Marionette, template, NotificationPopoverView) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      'home': 'a.home',
      'notifications': 'a.notifications'
    },

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
      this.notificationPopover = new NotificationPopoverView({
        trigger: this.ui.notifications
      });
    },

    onClose: function () {
      this.notificationPopover.close();
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

    toggleNotifications: function (event) {
      event.preventDefault();
    }
  });
});
