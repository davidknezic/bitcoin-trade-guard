define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      'trades': 'list',
      'trades/new': 'newTrade',
      'trades/:id': 'show',
      'trades/:id/edit': 'edit'
    },

    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');
    },

    list: function () {
      channel.commands.execute('app:show:trades');
    },

    show: function (id) {
      var trade = this.trades.get(id);

      channel.commands.execute('app:show:trade', trade);
    },

    newTrade: function () {
      channel.commands.execute('app:show:add-trade');
    },

    edit: function (id) {
      var trade = this.trades.get(id);

      channel.commands.execute('app:edit:trade', trade);
    }
  });
});
