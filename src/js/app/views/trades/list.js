define([
    'channel',
    'marionette',
    'app/templates/trades/list',
    'app/views/trades/list-item',
    'app/views/labels/select',
    'app/collections/labels'
  ], function (
    channel,
    Marionette,
    template,
    TradesListItemView,
    LabelSelectView,
    LabelsCollection
  ) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: TradesListItemView,
    itemViewContainer: ".trades",

    ui: {
      labels: '.labels'
    },

    events: {
      'click button.add-trade': 'addTrade'
    },

    itemEvents: {
      'open': 'showTrade'
    },

    initialize: function (options) {
      this.labels = options.labels;
      this.selectedLabels = new LabelsCollection();
      this.selectedLabels.reset();
    },

    onShow: function () {
      this.labelSelectView = new LabelSelectView({
        el: this.ui.labels,
        collection: this.labels,
        selected: this.selectedLabels
      });

      this.labelSelectView.render();
    },

    addTrade: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:add-trade');
    },

    showTrade: function (eventName, view, model) {
      channel.commands.execute('app:show:trade', model.cid);
    }
  });
});
