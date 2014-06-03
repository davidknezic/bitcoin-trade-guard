define([
    'underscore',
    'channel',
    'marionette',
    'app/templates/trades/list',
    'app/views/trades/list-item',
    'app/views/labels/select',
    'app/collections/trades',
    'app/collections/labels'
  ], function (
    _,
    channel,
    Marionette,
    template,
    TradesListItemView,
    LabelSelectView,
    TradesCollection,
    LabelsCollection
  ) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: TradesListItemView,
    itemViewContainer: ".trades",

    ui: {
      newTrade: 'button.new-trade',
      labels: '.labels',
      notEmpty: '.not-empty',
      empty: '.empty',
      loading: '.loading'
    },

    events: {
      'click @ui.newTrade': 'addTrade',
    },

    itemEvents: {
      'open': 'showTrade'
    },

    initialize: function (options) {
      this.trades = options.collection;
      this.collection = new TradesCollection();
      this.collection.reset(); // temporary

      this.labels = options.labels;
      this.selectedLabels = new LabelsCollection();
      this.selectedLabels.reset(); // temporary

      this.selectedLabels.on('all', this.refilter, this);
    },

    onShow: function () {
      this.labelSelectView = new LabelSelectView({
        el: this.ui.labels,
        collection: this.labels,
        selected: this.selectedLabels
      });

      this.labelSelectView.render();

      this.collection.on('all', this.onCollectionUpdate, this);

      this.refilter();
    },

    onCollectionUpdate: function (eventName) {
      if (eventName === 'request') {
        return this.setState('loading');
      }

      if (this.collection.isEmpty()) {
        return this.setState('empty');
      } else {
        return this.setState('not-empty');
      }
    },

    refilter: function () {
      var filtered = this.trades.models;

      if (!this.selectedLabels.isEmpty()) {
        var selectedLabels = this.selectedLabels.pluck('text');

        filtered = filtered.filter(function (trade) {
          return _.any(selectedLabels, function (label) {
            return _.contains(trade.get('tags'), label);
          });
        });
      }

      this.collection.reset(filtered);
    },

    addTrade: function (event) {
      this.trigger('add:trade');
    },

    showTrade: function (eventName, view, model) {
      this.trigger('show:trade', model);
      //channel.commands.execute('app:show:trade', model.cid);
    },

    setState: function (state) {
      this.ui.notEmpty.toggle(state === 'not-empty');
      this.ui.empty.toggle(state === 'empty');
      this.ui.loading.toggle(state === 'loading');
    }
  });
});
