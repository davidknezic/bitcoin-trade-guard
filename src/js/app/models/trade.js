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

    /**
     * Get or set the trades execution datetime.
     *
     * @param {moment} [newValue] - New execution datetime.
     * @returns {moment} Newly set or unchanged execution datetime.
     */
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

    /**
     * Get or set the price of one Bitcoin.
     *
     * @param {monetary} [newValue] - New Bitcoin price.
     * @returns {monetary} Newly set or unchanged Bitcoin price.
     */
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

    /**
     * Get or set the trades effective amount.
     *
     * @param {monetary} [newValue] - New amount.
     * @returns {monetary} Newly set or unchanged amount.
     */
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

    /**
     * Get or set the trades fee.
     *
     * @param {monetary} [newValue] - New fee.
     * @returns {monetary} Newly set or unchanged fee.
     */
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
    },

    /**
     * Get the trades amount in Bitcoin.
     *
     * @returns {monetary} Total amount in Bitcoin.
     */
    amountInBtc: function () {
      var amount = this.amount(),
          pricePerBtc = this.price(),
          pricePerFiat;

      if (amount.isInvalid()) {
        return monetary.invalid();
      }

      if (amount.currency() === 'BTC') {
        // amount already in BTC
        return amount;
      } else {
        // convert amount to BTC
        if (pricePerBtc.isInvalid()) {
          return monetary.invalid();
        }

        pricePerFiat = pricePerBtc.inverseRate();

        return amount.convert(pricePerFiat);
      }
    },

    /**
     * Get the trades amount in fiat currency.
     *
     * @returns {monetary} Total amount in fiat currency.
     */
    amountInFiat: function () {
      var amount = this.amount(),
          pricePerBtc = this.price();

      if (amount.isInvalid() || pricePerBtc.isInvalid()) {
        return monetary.invalid();
      }

      if (amount.currency() === pricePerBtc.currency()) {
        // amount already in fiat
        return amount;
      } else {
        // convert amount to fiat
        return amount.convert(pricePerBtc);
      }
    }
  });
});
