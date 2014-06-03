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
      loading: '.loading',
      chekboxAll: '.checkbox-all',
      labelSelected: '.label-selected',
      deleteSelected: '.delete-selected'
    },

    events: {
      'click @ui.newTrade': 'addTrade',
      'click @ui.deleteSelected': 'deleteSelected'
    },

    itemEvents: {
      'open': 'showTrade',
      'change:selection': 'changeSelection'
    },

    initialize: function (options) {
      this.trades = options.collection;

      this.selectedTrades = new TradesCollection();
      this.selectedTrades.reset();

      this.collection = new TradesCollection();
      this.collection.reset(); // temporary

      this.labels = options.labels;
      this.selectedLabels = new LabelsCollection();
      this.selectedLabels.reset(); // temporary
    },

    onShow: function () {
      this.labelSelectView = new LabelSelectView({
        el: this.ui.labels,
        collection: this.labels,
        selected: this.selectedLabels
      });

      this.labelSelectView.render();

      this.selectedTrades.on('all', this.onSelectedTradesUpdated, this);
      this.selectedLabels.on('all', this.refilter, this);
      this.trades.on('all', this.refilter, this);
      this.collection.on('all', this.onCollectionUpdate, this);

      this.refilter();

      this.onSelectedTradesUpdated();
    },

    onClose: function () {
      this.selectedTrades.off(null, null, this);
      this.selectedLabels.off(null, null, this);
      this.trades.off(null, null, this);
      this.collection.off(null, null, this);
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

    toggleTradeActions: function (isEnabled) {
      this.ui.labelSelected.prop('disabled', !isEnabled);
      this.ui.deleteSelected.prop('disabled', !isEnabled);
    },

    onSelectedTradesUpdated: function () {
      this.toggleTradeActions(this.selectedTrades.length > 0);
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

      this.selectedTrades.reset();
      this.collection.reset(filtered);
    },

    addTrade: function (event) {
      this.trigger('add:trade');
    },

    showTrade: function (eventName, view) {
      this.trigger('show:trade', view.model);
    },

    changeSelection: function (eventName, view, isSelected) {
      if (isSelected) {
        this.selectedTrades.add(view.model);
      } else {
        this.selectedTrades.remove(view.model);
      }
    },

    deleteSelected: function () {
      this.trigger('delete:trades', this.selectedTrades.models);
    },

    setState: function (state) {
      this.ui.notEmpty.toggle(state === 'not-empty');
      this.ui.empty.toggle(state === 'empty');
      this.ui.loading.toggle(state === 'loading');
    }
  });
});
