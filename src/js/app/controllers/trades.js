define([
    'channel',
    'backbone',
    'marionette',
    'app/views/layouts/header-main-side',
    'app/views/trades/new',
    'app/views/trades/list',
    'app/views/panels/importing',
    'app/models/trade'
  ], function (
    channel,
    Backbone,
    Marionette,
    HeaderMainSideLayout,
    NewTradeView,
    TradesView,
    ImportingPanelView,
    TradeModel
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');

      channel.commands.setHandler('app:show:add-trade', this.newTrade);
      channel.commands.setHandler('app:create:trade', this.createTrade);
      channel.commands.setHandler('app:show:trades', this.showTrades);

      channel.commands.setHandler('app:discard:trade', function () {
        channel.commands.execute('app:show:dashboard');
      });
    },

    onClose: function () {
    },

    newTrade: function () {
      var newTradeView,
          importingPanelView,
          layout;

      newTradeView = new NewTradeView({
        model: new TradeModel(),
        currencies: channel.reqres.request('app:data:currencies')
      });

      importingPanelView = new ImportingPanelView();

      layout = new HeaderMainSideLayout();

      channel.commands.execute('app:title:set', 'New Trade');
      channel.commands.execute('app:content:show', layout);

      layout.main.show(newTradeView);
      layout.side.show(importingPanelView);

      Backbone.history.navigate('/trades/new');
    },

    createTrade: function (trade) {
      var trades = channel.reqres.request('app:data:trades');

      trades.push(trade);
      trade.save();

      channel.commands.execute('app:show:dashboard');
    },

    showTrades: function () {
      var view = new TradesView();

      channel.commands.execute('app:title:set', 'Trades');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/trades');
    }
  });
});
