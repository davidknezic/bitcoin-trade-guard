define([
    'backbone',
    'app/models/service'
  ], function (Backbone, Service) {
  return Backbone.Collection.extend({
    model: Service
  });
});
