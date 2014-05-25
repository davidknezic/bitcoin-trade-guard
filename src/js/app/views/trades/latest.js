define([
    'underscore',
    'marionette',
    'channel',
    'app/templates/trades/latest',
    'app/views/trades/latest-item'
  ], function (
    _,
    Marionette,
    channel,
    template,
    LatestTradesItemView
  ) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: LatestTradesItemView,
    itemViewContainer: ".latest-trades",

    events: {
      'click button.add-trade': 'addTrade',
      'click button.show-all-trades': 'showAllTrades'
    },

    itemEvents: {
      'open': 'showTrade'
    },

    initialize: function (options) {
      this.trades = options.trades;
      this.collection = new Backbone.Collection();

      this.trades.on("all", this.onTradesUpdate, this);
      this.onTradesUpdate();
    },

    onClose: function () {
      this.trades.off(null, null, this);
    },

    onTradesUpdate: function () {
      var latest = _.chain(this.trades.models)
        .sortBy(function (trade) { return trade.attributes.executionOn; })
        .reverse()
        .first(5)
        .value();

      this.collection.reset(latest);
    },

    showTrade: function (eventName, view, model) {
      channel.commands.execute('app:show:trade', model.cid);
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
