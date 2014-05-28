define([
    'channel',
    'marionette',
    'app/templates/trades/show',
    'app/views/labels/select',
    'app/collections/labels'
  ], function (
    channel,
    Marionette,
    template,
    LabelSelectView,
    LabelsCollection
  ) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      sold: '.sold',
      bought: '.bought',
      verb: '.verb',
      amountBtc: '.amount-btc',
      amountFiat: '.amount-fiat',
      date: '.date',
      time: '.time',
      btcPrice: '.btc-price',
      feeBtc: '.fee-btc',
      feeFiat: '.fee-fiat',
      totalBtc: '.total-btc',
      totalFiat: '.total-fiat',
      labels: '.labels',
      edit: '.edit',
      ignore: '.ignore',
      delete: '.delete'
    },

    events: {
      'click @ui.edit': 'edit',
      'click @ui.ignore': 'ignore',
      'click @ui.delete': 'delete'
    },

    initialize: function (options) {
      this.labels = channel.reqres.request('app:data:labels');
    },

    onShow: function () {
      var labelsView = new LabelSelectView({
        el: this.ui.labels,
        collection: this.labels,
        selected: new LabelsCollection() // temporary
      });

      labelsView.render();

      this.ui.sold.toggle(this.model.get('isBtcSell'));
      this.ui.bought.toggle(this.model.get('isBtcBuy'));
      this.ui.verb.text(this.model.get('isBtcSell') ? 'Sold' : 'Bought');

      this.ui.amountBtc.text(this.model.amountInBtc().format());
      this.ui.amountFiat.text(this.model.amountInFiat().format());

      this.ui.date.text(this.model.executionOn().format('l'));
      this.ui.time.text(this.model.executionOn().format('h:mm a'));

      this.ui.btcPrice.text(this.model.price().format());

      this.ui.feeBtc.text();
      this.ui.feeFiat.text();

      this.ui.totalBtc.text();
      this.ui.totalFiat.text();
    },

    edit: function (event) {
      event.preventDefault();

      channel.commands.execute('app:edit:trade', this.model.cid);
    },

    ignore: function (event) {
      event.preventDefault();
    },

    delete: function (event) {
      event.preventDefault();
    }
  });
});
