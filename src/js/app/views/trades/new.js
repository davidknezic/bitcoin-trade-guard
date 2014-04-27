define([
    'channel',
    'marionette',
    'jquery',
    'moment',
    'app/templates/trades/new',
    'bootstrap'
  ], function (channel, Marionette, $, moment, template) {
  return Marionette.ItemView.extend({
    template: template,

    events: {
      'submit': 'create',
      'click button.cancel': 'cancel',
      'change input[name=currency]': 'onCurrencyChecked'
    },

    initialize: function (options) {
      this.model = options.model;
    },

    onShow: function () {
    },

    onCurrencyChecked: function () {
      var currency = $('input[name=currency]:checked').val();

      this.$('.btc-price-currency').text(currency);
    },

    create: function () {
      var raw = {
        executionOn: this.$('.execution-on').val(),
        btcPrice: this.$('.btc-price').val(),
        isBtcBuy: this.$('.is-btc-buy').is(':checked'),
        isBtcSell: this.$('.is-btc-sell').is(':checked'),
        amount: this.$('.amount').val(),
        fee: this.$('.fee').val(),
        ignore: this.$('.ignore').is(':checked'),
        service: this.$('.service').val(),
        tags: this.$('.tags').val(),
      };

      this.model.set({
        executionOn: moment(raw.execution_on),
        isBtcSell: raw.isBtcSell,
        isBtcBuy: raw.isBtcBuy,
        currencyIsoCode: 'XXX',
        btcPrice: raw.btcPrice,
        btcAmount: raw.amount,
        xxxAmount: raw.amount,
        btcFee: raw.fee,
        xxxFee: raw.fee,
        isIgnored: raw.ignore,
        isDeleted: false,
        tradingServiceName: raw.service,
        tradingServiceIdentifier: null,
        tags: raw.tags
      });

      if (this.model.isValid()) {
        channel.commands.execute('app:create:trade', this.model);
      } else {
      }

      return false;
    },

    cancel: function () {
      channel.commands.execute('app:discard:trade');
      return false;
    }
  });
});
