define([
    'underscore',
    'lib/monetary/formatting'
  ], function (_, formatting) {
  var Monetary;

  /**
   * Creates a new monetary object.
   *
   * @constructor
   * @param {object} config - Monetary configuration.
   */
  Monetary = function (config) {
    _.extend(this, config);
  };

  _.extend(Monetary.prototype, {

    /**
     * Returns the currency code.
     *
     * @returns {string}
     */
    currency: function () {
      return this._currency;
    },

    /**
     * Returns the amount.
     *
     * @returns {number}
     */
    amount: function () {
      return this._amount;
    },

    /**
     * Multiplies the amount by factor.
     *
     * @param {number} factor - Amount to multiply.
     * @returns {monetary}
     */
    multiply: function (factor) {
      // TODO: Create a new monetary?
      this._amount *= factor;

      return this;
    },

    /**
     * Divides the amount by divisor.
     *
     * @param {number} divisor - Amount to divide.
     * @returns {monetary}
     */
    divide: function (divisor) {
      // TODO: Create a new monetary?
      this._amount /= divisor;

      return this;
    },

    /**
     * Adds the addend to the amount.
     *
     * @param {number} addend - Amount to add.
     * @returns {monetary}
     */
    add: function (addend) {
      // TODO: Create a new monetary?
      // TODO: Type checking
      // TODO: Allow another monetary as argument

      this._amount += addend;

      return this;
    },

    /**
     * Subtracts the minuend from the amount.
     *
     * @param {number} minuend - Amount to subtract.
     * @returns {monetary}
     */
    sub: function (minuend) {
      // TODO: Create a new monetary?
      // TODO: Type checking
      // TODO: Allow another monetary as argument

      this._amount -= minuend;

      return this;
    },

    /**
     * Treat the monetary as an exchange rate to the provided currency and
     * inverse it.
     *
     * @param {string} secondCurrency - Currency the rate relates to.
     */
    inverseRate: function (secondCurrency) {
      // TODO: Implement

      // 1. find the second currency
      // 2. get base amount of second currency
      // 3. divide base amount by this amount
      // 4. create new monetary with second currency and divided amount
      // 5. return new monetary

      // Temporary! This doesn't make sense.
      return this;
    },

    /**
     * Convert the current amount to the currency in provided monetary using
     * the provided amount as the exchange rate.
     *
     * @param {monetary} rate - Exchange rate.
     * @returns {monetary}
     */
    convert: function (rate) {
      // Temporary! This doesn't make sense.
      return new Monetary({
        _amount: 1000.40,
        _currency: rate.currency()
      });
    },

    /**
     * Predicates whether the amount is negative.
     *
     * @returns {boolean}
     */
    isNegative: function () {
      return this._amount < 0;
    },

    /**
     * Predicates whether the amount equals zero.
     *
     * @returns {boolean}
     */
    isZero: function () {
      return this._amount == 0;
    },

    /**
     * Predicates whether the monetary is valid.
     *
     * @returns {boolean}
     */
    isValid: function () {
      return this._isValid;
    },

    /**
     * Predicates whether the monetary is invalid.
     *
     * @returns {boolean}
     */
    isInvalid: function () {
      return !this._isValid;
    },

    /**
     * Format monetary object to string representation.
     *
     * @returns {string}
     */
    format: function () {
      return formatting.format(this);
    },

    // TODO: Implement
    locale: function () {
      throw new Error('Not implemented yet!');
    }
  });

  return Monetary;
});
