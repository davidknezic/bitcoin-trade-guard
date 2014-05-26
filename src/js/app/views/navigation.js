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

    initialize: function (options) {
      this.notifications = options.notifications;
      this.notifications.on('all', this.onUpdateNotifications, this);
    },

    onShow: function () {
      this.notificationPopover = new NotificationPopoverView({
        trigger: this.ui.notifications,
        collection: this.notifications
      });

      this.onUpdateNotifications();
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

    onUpdateNotifications: function () {
      var hasUnread = this.notifications.hasUnread();

      this.ui.notifications.toggleClass('unread', hasUnread);
    },

    toggleNotifications: function (event) {
      event.preventDefault();
    }
  });
});
