define([
    'channel',
    'marionette',
    'app/templates/dashboard'
  ], function (channel, Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    events: {
      'click button.add-trade': 'addTrade',
      'click button.show-all-trades': 'showAllTrades'
    },

    initialize: function (options) {
    },

    addTrade: function () {
      channel.commands.execute('app:show:add-trade');
      return false;
    },

    showAllTrades: function () {
      channel.commands.execute('app:show:trades');
      return false;
    }
  });
});
