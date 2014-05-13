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

    itemViewOptions: {
      tagName: "a",
      className: "trades-item list-group-item",
      attributes: {
        href: "#"
      }
    }
  });
});
