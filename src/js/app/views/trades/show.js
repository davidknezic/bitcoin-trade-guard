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
      labels: '.labels'
    },

    events: {
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
    }
  });
});
