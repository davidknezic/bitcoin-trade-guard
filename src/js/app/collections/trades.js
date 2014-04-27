define([
    'backbone',
    'app/models/trade',
    'backbone.localstorage'
  ], function (Backbone, Trade) {
  return Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('trades'),
    model: Trade
  });
});
