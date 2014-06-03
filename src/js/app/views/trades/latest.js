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

    ui: {
      empty: '.empty',
      notEmpty: '.not-empty',
      addTrade: 'button.add-trade',
      showAllTrades: 'button.show-all-trades'
    },

    events: {
      'click @ui.addTrade': 'addTrade',
      'click @ui.showAllTrades': 'showAllTrades'
    },

    itemEvents: {
      'open': 'showTrade'
    },

    initialize: function (options) {
      this.trades = options.trades;
      this.collection = new Backbone.Collection();
    },

    onShow: function () {
      this.trades.on("all", this.onTradesUpdate, this);
      this.onTradesUpdate();
    },

    onClose: function () {
      this.trades.off(null, null, this);
    },

    onTradesUpdate: function () {
      this.setEmptyState(this.trades.length <= 0);

      var latest = _.chain(this.trades.models)
        .sortBy(function (trade) { return trade.attributes.executionOn; })
        .reverse()
        .first(5)
        .value();

      this.collection.reset(latest);
    },

    setEmptyState: function (isEmpty) {
      this.ui.empty.toggle(isEmpty);
      this.ui.notEmpty.toggle(!isEmpty);
    },

    showTrade: function (eventName, view, model) {
      this.trigger('show:trade', model);
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
