define([
    'jquery',
    'marionette',
    'moment',
    'app/templates/trades/latest-item'
  ], function ($, Marionette, moment, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: "a",
    className: "latest-trades-item list-group-item",
    attributes: {
      href: "#"
    },

    ui: {
      self: '',
      buy: '.buy',
      sell: '.sell',
      execution: '.execution-on',
      amount: '.amount',
      labels: '.labels',
      text: '.text'
    },

    events: {
      'click @ui.self': 'open'
    },

    onShow: function () {
      var isBuy = this.model.get('isBtcBuy'),
          isSell = this.model.get('isBtcSell'),
          executionOn = this.model.executionOn(),
          amount = this.model.amount(),
          fee = this.model.fee(),
          amountInBtc = this.model.amountInBtc(),
          serviceName = this.model.get('serviceName'),
          tags = this.model.get('tags'),
          verb = (isBuy ? "bought" : "sold");

      this.ui.buy.toggle(isBuy);
      this.ui.sell.toggle(isSell);
      this.ui.execution.text(executionOn.fromNow());
      this.ui.execution.attr('datetime', executionOn.format());
      this.ui.amount.text(amountInBtc.format());
      this.ui.text.text(verb + " for " + amount.format());

      if (serviceName) {
        this.ui.labels.append(this.createLabel(serviceName, 'primary'));
        this.ui.labels.append(' ');
      }

      _.each(tags, function (tag) {
        this.ui.labels.append(this.createLabel(tag));
        this.ui.labels.append(' ');
      }, this);
    },

    createLabel: function (name, type) {
      return $(document.createElement('span'))
        .addClass('label label-' + (type ? type : 'default'))
        .text(name);
    },

    open: function (event) {
      event.preventDefault();

      this.trigger('open', this.model);
    }
  });
});
