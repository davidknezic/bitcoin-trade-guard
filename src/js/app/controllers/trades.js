define([
    'channel',
    'backbone',
    'marionette',
    'app/views/trades/new',
    'app/views/trades/list',
    'app/models/trade'
  ], function (channel, Backbone, Marionette, NewTradeView, TradesView, TradeModel) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');

      channel.commands.setHandler('app:show:add-trade', this.newTrade);
      channel.commands.setHandler('app:create:trade', this.createTrade);
      channel.commands.setHandler('app:show:trades', this.showTrades);

      channel.commands.setHandler('app:discard:trade', function () {
        channel.commands.execute('app:show:overview');
      });
    },

    onClose: function () {
    },

    newTrade: function () {
      var view = new NewTradeView({
        model: new TradeModel()
      });

      channel.commands.execute('app:title:set', 'New Trade');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/trades/new');
    },

    createTrade: function (trade) {
      var trades = channel.reqres.request('app:data:trades');

      trades.push(trade);
      trade.save();

      channel.commands.execute('app:show:overview');
    },

    showTrades: function () {
      var view = new TradesView();

      channel.commands.execute('app:title:set', 'Trades');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/trades');
    }
  });
});
