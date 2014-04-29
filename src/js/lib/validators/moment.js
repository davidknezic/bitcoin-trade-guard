define([
    'underscore',
    'backbone',
    'moment',
    'backbone.validation'
  ], function (_, Backbone, moment) {
  _.extend(Backbone.Validation.validators, {
    moment: function (value, attr, customValue, model, attrs) {
      if (customValue.strict) {

        // value must be a moment object in strict mode
        if (!moment.isMoment(value)) {
          return 'Please enter a moment object to satisfy strict mode';
        }
      }

      if (customValue.valid) {

          // value must be valid
          if (!moment.isMoment(value) || !moment.isValid()) {
            return 'Please enter a valid moment object';
          }
      }

      if (customValue.utc) {

        // value must be utc
        if (!moment.isMoment(value) || !value._isUTC) {
          return 'Please enter a utc moment object';
        }
      }
    }
  });
});
