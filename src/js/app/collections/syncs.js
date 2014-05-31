define([
    'backbone',
    'app/models/sync'
  ], function (Backbone, Sync) {
  return Backbone.Collection.extend({
    model: Sync
  });
});
