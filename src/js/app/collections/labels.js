define([
    'backbone',
    'app/models/label',
    'app/data/labels'
  ], function (Backbone, Label, labels) {
  return Backbone.Collection.extend({
    model: Label,

    initialize: function (options) {
      this.add(labels);
    }
  });
});
