define([
    'channel',
    'jquery',
    'marionette',
    'crypto'
  ], function (
    channel,
    $,
    Marionette,
    CryptoJS
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
    },

    onClose: function () {
    },

    getNextNonce: function () {
      return Date.now();
    },

    calculateSignature: function (nonce, clientId, key, secret) {
      var message = '',
          signature;

      message += nonce + clientId + key;
      signature = CryptoJS.HmacSHA256(message, secret);
      signature = signature.toString(CryptoJS.enc.Hex);
      signature = signature.toUpperCase();

      return signature;
    },

    verify: function (clientId, key, secret) {
      var nonce = this.getNextNonce(),
          signature = this.calculateSignature(nonce, clientId, key, secret);

      $.ajax({
        url: 'https://api.bitstamp.local/api/balance/',
        type: 'POST',
        context: this,
        data: {
          key: key,
          signature: signature,
          nonce: nonce
        },
        dataType: 'json',
        context: this,
        success: function (data, status, xhr) {
          if (data.hasOwnProperty('error')) {
            return this.trigger('failure', data.error);
          }

          return this.trigger('success');
        },
        error: function () {
          return this.trigger('failure', 'A technical error occured! Please try again later.');
        }
      });
    }
  });
});
