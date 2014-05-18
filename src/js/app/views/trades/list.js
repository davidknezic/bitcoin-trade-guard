define([
    'channel',
    'marionette',
    'app/templates/trades/list',
    'app/views/trades/list-item'
  ], function (
    channel,
    Marionette,
    template,
    TradesListItemView
  ) {
  return Marionette.CompositeView.extend({
    template: template,
    itemView: TradesListItemView,
    itemViewContainer: ".trades",

    events: {
      'click button.add-trade': 'addTrade'
    },

    itemEvents: {
      'open': 'showTrade'
    },

    addTrade: function (event) {
      event.preventDefault();

      channel.commands.execute('app:show:add-trade');
    },

    showTrade: function (eventName, view, model) {
      event.preventDefault();

      channel.commands.execute('app:show:trade', model.cid);
    }
  });
});
