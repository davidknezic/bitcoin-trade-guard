define([
    'backbone',
    'underscore',
    'app/models/currency',
    'app/data/currencies',
    'underscore.string'
  ], function (
    Backbone,
    _,
    Currency,
    currencies
  ) {
  return Backbone.Collection.extend({
    model: Currency,

    initialize: function (options) {
      this.add(currencies);
    },

    filterByQuery: function (query) {
      var uppercaseQuery = query.toUpperCase();

      return this.filter(function (currency) {
        var data = _.join(" ", currency.get('code'), currency.get('name')),
            uppercaseData = data.toUpperCase();

        return (_.str.include(uppercaseQuery, uppercaseData));
      });
    },

    findByCode: function (code) {
      var uppercaseCode = code.toUpperCase();

      return this.find(function (currency) {
        var data = currency.get('code'),
            uppercaseData = data.toUpperCase();

        return (uppercaseCode === uppercaseData);
      });
    }
  });
});
