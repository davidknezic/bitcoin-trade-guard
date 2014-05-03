define([
    'app/models/base',
    'app/validations/trade',
    'moment',
    'underscore'
  ], function (BaseModel, validation, moment, _) {
  return BaseModel.extend({
    validation: validation,
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

    executionOn: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];

        if (_.isNull(setValue))
          return this.set('executionOn', null);

        if (!_.isNull(setValue) && !moment.isMoment(setValue))
          throw new Error('No moment object provided!');

        return this.set('executionOn', newValue);
      } else {
        // getter
        getValue = this.get('executionOn');

        return moment(getValue);
      }
    }
  });
});
