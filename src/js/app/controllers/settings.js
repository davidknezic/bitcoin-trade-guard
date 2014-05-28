define([
    'channel',
    'marionette',
    'app/views/settings'
  ], function (
    channel,
    Marionette,
    SettingsView
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      channel.commands.setHandler('app:show:settings', this.settings.bind(this));
    },

    onClose: function () {
    },

    settings: function () {
      var view = new SettingsView({
      });

      channel.commands.execute('app:title:set', 'Settings');
      channel.commands.execute('app:current-nav:set', 'settings');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/settings');
    }
  });
});
