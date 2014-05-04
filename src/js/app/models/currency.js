define([
    'backbone'
  ], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      code: null,
      name: null
    }
  });
});
