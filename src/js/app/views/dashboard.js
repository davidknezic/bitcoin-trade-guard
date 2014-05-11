define([
    'channel',
    'marionette',
    'app/templates/dashboard',
    'app/views/trades/latest'
  ], function (channel, Marionette, template, LatestTradesView) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      latestTrades: '.latest-trades'
   },

    initialize: function (options) {
      this.trades = options.trades;
    },

    onShow: function () {
      var latestTradesView = new LatestTradesView({
        trades: this.trades
      });

      this.latestTrades.show(latestTradesView);
    }
  });
});
