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
    itemViewContainer: "ul.latest-trades",

    tagName: "ul",
    className: "list-group",

    itemViewOptions: {
      tagName: "li",
      className: "list-group-item"
    },

    itemEvents: {
      "click a.show": "showTrade"
    },

    events: {
      'click button.add-trade': 'addTrade',
      'click button.show-all-trades': 'showAllTrades'
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
        .first(3)
        .value();

      this.collection.reset(latest);
    },

    showTrade: function () {
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
