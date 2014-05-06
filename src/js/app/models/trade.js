define([
    'app/models/base',
    'app/validations/trade',
    'moment',
    'underscore'
  ], function (
    BaseModel,
    validation,
    moment,
    _
  ) {
  return BaseModel.extend({
    validation: validation,
    defaults: {
      'executionOn': null,
      'isBtcSell': false,
      'isBtcBuy': false,
      'price': null,
      'amount': null,
      'fee': null,
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

        return this.set('executionOn', setValue.format());
      } else {
        // getter
        getValue = this.get('executionOn');

        return moment(getValue);
      }
    },

    // not implemented yet
    price: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];
      } else {
        // getter
        getValue = null;
      }
    },

    // not implemented yet
    amount: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];
      } else {
        // getter
        getValue = null;
      }
    },

    // not implemented yet
    fee: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];
      } else {
        // getter
        getValue = null;
      }
    }
  });
});
