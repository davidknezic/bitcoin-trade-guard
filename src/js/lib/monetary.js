define([
    'lib/monetary/monetary',
    'lib/monetary/currency'
  ], function (Monetary, Currency) {
  var monetary,
      VERSION = "0.0.0",
      currencies = {};

  /**
   * Creates a new monetary top level function.
   */
  monetary = function () {
    var config;

    config = {};
    config._isAMonetaryObject = true;

    return new Monetary(config);
  };

  /**
   * Compares monetary objecs.
   */
  monetary.isMonetary = function (obj) {
    return obj instanceof Monetary ||
        (obj != null && obj.hasOwnProperty('_isAMonetaryObject'));
  };

  /**
   * Creates an invalid monetary object.
   */
  monetary.invalid = function () {
    return monetary('i gonna invalidate ya');
  };

  /**
   * Retrieves, removes or adds a currency.
   */
  monetary.currency = function (key, values) {
    if (values === undefined) {
      // retrieve
      return currencies[key];
    }

    if (values === null) {
      // remove
      return delete currencies[key];
    }

    return currencies[key] = new Currency(values);
  };

  /**
   * Removes, adds or selects a new global locale.
   */
  monetary.locale = function (key, values) {
  };

  monetary.version = VERSION;

  return monetary;
});
