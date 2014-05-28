define([
    'channel',
    'marionette',
    'app/templates/navigation',
    'app/views/notifications/popover',
    'bootstrap'
  ], function (
    channel,
    Marionette,
    template,
    NotificationPopoverView
  ) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      'home': 'a.home',
      'dashboard': 'a.dashboard',
      'trades': 'a.trades',
      'analysis': 'a.analysis',
      'settings': 'a.settings',
      'notifications': 'a.notifications'
    },

    events: {
      'click @ui.home': 'showDashboard',
      'click @ui.dashboard': 'showDashboard',
      'click @ui.trades': 'showTrades',
      'click @ui.analysis': 'showAnalysis',
      'click @ui.settings': 'showSettings',
      'click @ui.notifications': 'toggleNotifications'
    },

    initialize: function (options) {
      this.notifications = options.notifications;
      this.notifications.on('all', this.onUpdateNotifications, this);

      channel.commands.setHandler('app:current-nav:set', this.setCurrentNav.bind(this));
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

    setCurrentNav: function (name) {
      var map = [
        { $e: this.ui.dashboard, name: 'dashboard' },
        { $e: this.ui.trades,    name: 'trades' },
        { $e: this.ui.settings,  name: 'settings' }
      ];

      _.each(map, function (item) {
        item.$e.parent().toggleClass('active', name === item.name);
      });
    },

    showDashboard: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:dashboard');
    },

    showTrades: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:trades');
    },

    showAnalysis: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:analysis');
    },

    showSettings: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:settings');
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
