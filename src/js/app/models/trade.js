define([
    'backbone',
    'moment'
  ], function (Backbone, moment) {
  return Backbone.Model.extend({
    defaults: {
      'executionOn': moment(null),
      'isBtcSell': false,
      'isBtcBuy': false,
      'currencyIsoCode': 'usd',
      'btcPrice': 0.0,
      'btcAmount': 0.0,
      'xxxAmount': 0.0,
      'btcFee': 0.0,
      'xxxFee': 0.0,
      'isIgnored': false,
      'isDeleted': false,
      'tradingServiceName': '',
      'tradingServiceIdentifier': null,
      'tags': []
    }
  });
});
