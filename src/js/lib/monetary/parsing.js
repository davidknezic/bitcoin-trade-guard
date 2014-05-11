define(function () {
  var // parsing format with ISO 4217 code
      parseIso4217 = /^([A-Z]{3})\s([\s\.\,\'0-9]+)$/;

  return {

    /**
     * Parse input from config object.
     */
    parse: function (config) {
      var value = config._i,
          match = parseIso4217.exec(value),
          iso4217Code,
          amount;

      if (match) {
        // valid format with ISO 4217 code
        iso4217Code = match[1];
        amount = match[2];

        // TODO: Do better parsing, which respects localization rules
        amount = parseFloat(amount);

        config._currency = iso4217Code;
        config._amount = amount;
        config._isValid = true;
      } else {
        // unknown format
        config._isValid = false;
      }
    }
  };
});
