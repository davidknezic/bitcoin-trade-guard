define([
    'backbone',
    'monetary',
    'moment'
  ], function (Backbone, monetary, moment) {
  return Backbone.Model.extend({
    defaults: {
      volume: null,
      balance: null,
      profit: null,
      start: null,
      end: null
    },

    initialize: function (options) {
      this.trades = options.trades;
      this.trades.on("all", this.onTradesChanged, this);

      this.onTradesChanged();
    },

    onTradesChanged: function () {
      var period = this.calculateTradingPeriod(this.trades),
          volume = this.calculateTradingVolume(this.trades);

      this.set('start', period.start);
      this.set('end', period.end);
      this.set('volume', volume);
    },

    calculateTradingPeriod: function (trades) {
      var start = null,
          end = null;

      trades.each(function (trade) {
        var date = trade.executionOn();

        start = (start === null ? date : start.max(date));
        end = (end === null ? date : end.min(date));
      });

      return {
        start: start,
        end: end
      };
    },

    calculateTradingVolume: function (trades) {
      var volume = monetary("BTC 0");

      trades.each(function (trade) {
        volume.add(trade.amountInBtc().amount());
      });

      return volume;
    }
  });
});
