define([
    'channel',
    'marionette',
    'jquery',
    'underscore',
    'moment',
    'app/templates/trades/new',
    'bootstrap',
    'underscore.string'
  ], function (
    channel,
    Marionette,
    $,
    _,
    moment,
    template
  ) {
  return Marionette.ItemView.extend({
    template: template,

    events: {
      'submit form.new-trade': 'save',
      'click button.cancel': 'cancel',
      'change select.currency': 'selectCurrency',
      'click button.currency-toggle': 'toggleCurrency'
    },

    initialize: function (options) {
      this.currencies = options.currencies;
    },

    onShow: function () {
      var $currency = this.$('select.currency');

      this.populateCurrencySelect($currency);
    },

    populateCurrencySelect: function ($select) {
      var option = $('<option>').val(null).text('Select currency...');
      $select.append(option);

      this.currencies.each(function (currency) {
        var option = $('<option>')
          .val(currency.get('code'))
          .text(currency.get('code') + ' → ' + currency.get('name'));

        $select.append(option);
      }, this);
    },

    save: function (event) {
      event.preventDefault();

      var date = this.$('.execution-date').val(),
          time = this.$('.execution-time').val(),
          currency = this.$('.currency').val(),
          price = this.$('.btc-price').val(),
          isBtcBuy = this.$('.is-btc-buy').is(':checked'),
          isBtcSell = this.$('.is-btc-sell').is(':checked'),
          amount = this.$('.amount').val(),
          isAmountInBtc = this.$('.is-amount-in-btc').is(':checked'),
          isAmountInOther = this.$('.is-amount-in-other').is(':checked'),
          fee = this.$('.fee').val(),
          isFeeInBtc = this.$('.is-fee-in-btc').is(':checked'),
          isFeeInOther = this.$('.is-fee-in-other').is(':checked');

      this.model.set('isBtcSell', isBtcSell);
      this.model.set('isBtcBuy', isBtcBuy);
      this.model.executionOn(moment(_.str.join(' ', date, time)));
      this.model.btcPrice(/* monetary object: currency, price */);
      this.model.amount(/* monetary object: currency, price */);
      this.model.fee(/* monetary object: currency, price */);

      if (this.model.isValid()) {
        channel.commands.execute('app:create:trade', this.model);
      } else {
        // not implemented yet
      }
    },

    cancel: function (event) {
      event.preventDefault();

      channel.commands.execute('app:discard:trade');
    },

    selectCurrency: function () {
      var $select = this.$('select.currency'),
          $price = this.$('.btc-price-currency'),
          $amount = this.$('.is-amount-in-other').parent(),
          $fee = this.$('.is-fee-in-other').parent(),
          currency = $select.val();

      if (!_.isEmpty(currency)) {
        _.each([$price, $amount, $fee], function ($element) {
          $element.find('.unset').hide();
          $element.find('.set').show().text(currency);
        });
      } else {
        _.each([$price, $amount, $fee], function ($element) {
          $element.find('.unset').show();
          $element.find('.set').hide().text('');
        });
      }
    }
  });
});
