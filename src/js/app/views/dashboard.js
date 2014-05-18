define([
    'channel',
    'marionette',
    'app/templates/dashboard',
    'app/models/summary',
    'app/views/trades/latest',
    'app/views/summary'
  ], function (channel, Marionette, template, SummaryModel, LatestTradesView, SummaryView) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      summary: '.summary',
      latestTrades: '.latest-trades'
   },

    initialize: function (options) {
      this.trades = options.trades;
    },

    onShow: function () {
      var summaryModel,
          latestTradesView,
          summaryView;

      summaryModel = new SummaryModel({
        trades: this.trades
      });

      latestTradesView = new LatestTradesView({
        trades: this.trades
      });

      summaryView = new SummaryView({
        model: summaryModel
      });

      this.latestTrades.show(latestTradesView);
      this.summary.show(summaryView);
    }
  });
});
