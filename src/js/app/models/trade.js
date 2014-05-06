define([
    'app/models/base',
    'app/validations/trade',
    'moment',
    'monetary',
    'underscore'
  ], function (
    BaseModel,
    validation,
    moment,
    monetary,
    _
  ) {
  return BaseModel.extend({
    //validation: validation,
    defaults: {
      'executionOn': null,
      'isBtcSell': false,
      'isBtcBuy': false,
      'price': null,
      'amount': null,
      'fee': null,
      'isIgnored': false,
      'isDeleted': false,
      'serviceName': null,
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

    price: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];

        if (_.isNull(setValue))
          return this.set('price', null);

        if (!_.isNull(setValue) && !monetary.isMonetary(setValue))
          throw new Error('No monetary object provided!');

        return this.set('price', setValue.format());
        setValue = arguments[0];
      } else {
        // getter
        getValue = this.get('price');

        return monetary(getValue);
      }
    },

    amount: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];

        if (_.isNull(setValue))
          return this.set('amount', null);

        if (!_.isNull(setValue) && !monetary.isMonetary(setValue))
          throw new Error('No monetary object provided!');

        return this.set('amount', setValue.format());
      } else {
        // getter
        getValue = this.get('amount');

        return monetary(getValue);
      }
    },

    fee: function () {
      var setValue, getValue;

      if (arguments.length > 0) {
        // setter
        setValue = arguments[0];

        if (_.isNull(setValue))
          return this.set('fee', null);

        if (!_.isNull(setValue) && !monetary.isMonetary(setValue))
          throw new Error('No monetary object provided!');

        return this.set('fee', setValue.format());
      } else {
        // getter
        getValue = this.get('fee');

        return monetary(getValue);
      }
    }
  });
});
