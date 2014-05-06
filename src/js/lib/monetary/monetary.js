define(['underscore'], function (_) {
  var Monetary;

  Monetary = function (config) {
    _.extend(this, config);
  };

  // there's much work to do
  _.extend(Monetary.prototype, {

    currency: function () {},
    amount: function () {},

    multiply: function () {},
    divide: function () {},
    add: function () {},
    sub: function () {},

    isNegative: function () {},
    isZero: function () {},
    isValid: function () {},

    locale: function () {},
    format: function () {}
  });

  return Monetary;
});
