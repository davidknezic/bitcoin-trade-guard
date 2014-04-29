define([
    'app/models/base',
    'app/validations/trade'
  ], function (BaseModel, validation) {
  return BaseModel.extend({
    defaults: {
      'executionOn': null,
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
      'serviceName': '',
      'serviceIdentifier': null,
      'tags': []
    },

    validation: validation
  });
});
