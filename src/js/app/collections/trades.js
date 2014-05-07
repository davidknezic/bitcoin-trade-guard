define([
    'backbone',
    'app/models/trade',
    'app/data/trades',
    'backbone.localstorage'
  ], function (Backbone, Trade, trades) {
  return Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('trades'),
    model: Trade,

    initialize: function (options) {
      this.add(trades);
    }
  });
});
