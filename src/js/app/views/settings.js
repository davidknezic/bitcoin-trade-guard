define([
    'channel',
    'marionette',
    'app/templates/settings'
  ], function (channel, Marionette, template) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      content: '.content'
    },

    ui: {
      account: 'a.account',
      sync: 'a.sync',
      backup: 'a.backup'
    },

    events: {
      'click @ui.account': 'clickAccount',
      'click @ui.sync': 'clickSync',
      'click @ui.backup': 'clickBackup'
    },

    initialize: function (options) {
    },

    setCurrentNav: function (name) {
      var map = [
        { $e: this.ui.account, name: 'account' },
        { $e: this.ui.sync,    name: 'sync' },
        { $e: this.ui.backup,  name: 'backup' }
      ];

      _.each(map, function (item) {
        item.$e.parent().toggleClass('active', name === item.name);
      });
    },

    clickAccount: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:settings');
    },

    clickSync: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:settings:syncs');
    },

    clickBackup: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:settings:backup');
    }
  });
});
