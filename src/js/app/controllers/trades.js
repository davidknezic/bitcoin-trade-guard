define([
    'channel',
    'backbone',
    'marionette',
    'app/views/layouts/header-main-side',
    'app/views/layouts/header-main',
    'app/views/trades/new',
    'app/views/trades/list',
    'app/views/trades/show',
    //'app/views/volume',
    'app/views/panels/importing',
    'app/models/trade'
  ], function (
    channel,
    Backbone,
    Marionette,
    HeaderMainSideLayout,
    HeaderMainLayout,
    NewTradeView,
    TradesView,
    ShowView,
    //VolumeChartView,
    ImportingPanelView,
    TradeModel
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.trades = channel.reqres.request('app:data:trades');

      channel.commands.setHandler('app:show:add-trade', this.newTrade, this);
      channel.commands.setHandler('app:create:trade', this.createTrade, this);
      channel.commands.setHandler('app:show:trades', this.showTrades, this);
      channel.commands.setHandler('app:show:trade', this.showTrade, this);
      channel.commands.setHandler('app:edit:trade', this.editTrade, this);

      channel.commands.setHandler('app:discard:trade', function () {
        channel.commands.execute('app:show:dashboard');
      }, this);
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
      channel.commands.execute('app:current-nav:set', 'trades');
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
      var volumeChartView,
          tradesView,
          layout;

      /*volumeChartView = new VolumeChartView({
        trades: channel.reqres.request('app:data:trades')
      });*/

      tradesView = new TradesView({
        collection: channel.reqres.request('app:data:trades'),
        labels: channel.reqres.request('app:data:labels')
      });

      tradesView.on('add:trade', function () {
        this.newTrade();
      }, this);

      tradesView.on('show:trade', function (trade) {
        this.showTrade(trade);
      }, this);

      layout = new HeaderMainLayout();

      channel.commands.execute('app:title:set', 'Trades');
      channel.commands.execute('app:current-nav:set', 'trades');
      channel.commands.execute('app:content:show', layout);

      //layout.header.show(volumeChartView);
      layout.main.show(tradesView);

      Backbone.history.navigate('/trades');
    },

    showTrade: function (trade) {
      var view = new ShowView({
        model: trade
      });

      channel.commands.execute('app:title:set', 'Show trade');
      channel.commands.execute('app:current-nav:set', 'trades');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/trades/' + trade.cid);
    },

    editTrade: function (trade) {
      var view = new NewTradeView({
        model: trade,
        currencies: channel.reqres.request('app:data:currencies')
      });

      channel.commands.execute('app:title:set', 'Edit trade');
      channel.commands.execute('app:current-nav:set', 'trades');
      channel.commands.execute('app:content:show', view);

      Backbone.history.navigate('/trades/' + trade.cid + '/edit');
    }
  });
});
