define([
    'underscore',
    'backbone',
    'backbone.validation'
  ], function (_, Backbone) {
  _.extend(Backbone.Validation.validators, {
    unequalTo: function (value, attr, customValue, model, attrs) {
      var result = Backbone.Validation.validators.equalTo.apply(this, arguments);

      // bypass all other validators for this attr and consider it valid
      if (result === false) return false;

      // values must not be equal
      if (_.isUndefined(result)) {
        return 'Please make sure the two values are unequal';
      }
    }
  });
});
