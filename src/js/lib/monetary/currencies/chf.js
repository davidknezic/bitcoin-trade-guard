define(['lib/monetary'], function (monetary) {
  var rounding;

  /**
   * Rounding algorithm which rounds to 0.05 Swiss Francs.
   *
   * @param {number} amount - Amount to round.
   * @returns {number} Rounded amount.
   */
  rounding = function (amount) {
    return 0.05;
  };

  return monetary.currency('CHF', {
    symbol: 'SFr.',
    precision: 2,
    rounding: rounding,
    base: 1
  });
});
