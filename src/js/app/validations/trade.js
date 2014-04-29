define(['underscore'], function (_) {
  return {
    'executionOn': {
      required: true,
      moment: {
        strict: true,
        valid: true,
        utc: true
      }
    },
    'isBtcSell': {
      required: true,
      oneOf: [true, false],
      unequalTo: 'isBtcBuy'
    },
    'isBtcBuy': {
      required: true,
      oneOf: [true, false]
    },
    'currencyIsoCode': {
      required: true,
      pattern: /^[A-Z]{3}$/,
      oneOf: ['USD']
    },
    'btcPrice': {
      required: true
      // TODO: check amount validity and format
    },
    'btcAmount': {
      // TODO: check amount validity and format
    },
    'xxxAmount': {
      // TODO: check amount validity and format
    },
    'btcFee': {
      // TODO: check amount validity and format
    },
    'xxxFee': {
      // TODO: check amount validity and format
    },
    'isIgnored': {
      required: true,
      oneOf: [true, false]
    },
    'isDeleted': {
      required: true,
      oneOf: [true, false]
    },
    'serviceName': {
      fn: function (value, attr, attrs) {
        if (!_.isNull(value) && !_.isString(value)) {
          return 'Please enter a string value or set it to null';
        }
      }
    },
    'serviceIdentifier': {
      fn: function (value, attr, attrs) {
        if (_.isString(value)) {

          if (!_.isString(attrs['serviceName'])) {
            return 'Service identifier must not be set unless service name is specified';
          }
        } else if (!_.isNull(value)) {
          return 'Please enter a string value or set null';
        }
      }
    },
    'tags': {
      fn: function (value, attr, attrs) {
        if (!_.isArray(value) || !_.every(value, _.isString)) {
          return 'Please enter an array consisting of string values';
        }
      }
    }
  };
});
