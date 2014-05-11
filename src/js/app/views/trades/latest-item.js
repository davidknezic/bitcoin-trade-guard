define([
    'jquery',
    'marionette',
    'moment',
    'app/templates/trades/latest-item'
  ], function ($, Marionette, moment, template) {
  return Marionette.ItemView.extend({
    template: template,

    events: {
    },

    initialize: function (options) {
    },

    onShow: function () {
      var verb;

      if (this.model.get('isBtcBuy')) {
        this.$('.buy').show();
        this.$('.sell').hide();

        verb = "bought";
      } else if (this.model.get('isBtcSell')) {
        this.$('.buy').hide();
        this.$('.sell').show();

        verb = "sold";
      }

      var executionOn = this.model.executionOn();
      this.$('.execution-on').text(executionOn.fromNow());

      var amount = this.model.amount();
      var fee = this.model.fee();

      var amountInBtc = this.model.amountInBtc();

      this.$('.amount').text(amountInBtc.format());

      var labels = this.$('.labels');

      var serviceName = this.model.get('serviceName');
      if (serviceName) {
        $('<span class="label label-primary" />')
          .text(serviceName)
          .appendTo(labels);
      }

      _.each(this.model.get('tags'), function (tag) {
        $('<span class="label label-default" />')
          .text(tag)
          .appendTo(labels);
      });

      this.$('.text').text(verb + " for " + amount.format());
    }
  });
});
