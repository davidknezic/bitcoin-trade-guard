define(function () {
  return {

    /**
     * Format monetary to standard format with ISO 4217 code.
     */
    format: function (m) {
      if (m.isInvalid()) {
        return "Invalid monetary!";
      }

      return m.currency() + " " + m.amount();
    }
  };
});
