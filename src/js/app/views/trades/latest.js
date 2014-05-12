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

    itemViewOptions: {
      tagName: "a",
      className: "latest-trades-item list-group-item",
      attributes: {
        href: "#"
      }
    },

    events: {
      'click button.add-trade': 'addTrade',
      'click button.show-all-trades': 'showAllTrades',
      'click a': 'showTrade'
    },

    initialize: function (options) {
      this.trades = options.trades;
      this.collection = new Backbone.Collection();

      this.trades.on("all", this.onTradesUpdate, this);
      this.onTradesUpdate();
    },

    onTradesUpdate: function () {
      var latest = _.chain(this.trades.models)
        .sortBy("executionOn")
        .first(5)
        .value();

      this.collection.reset(latest);
    },

    showTrade: function (event) {
      event.preventDefault();

      

      console.log(arguments);
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
