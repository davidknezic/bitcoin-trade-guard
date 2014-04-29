define([
    'underscore',
    'backbone',
    'validation'
  ], function (_, Backbone, Validation) {
  var BaseModel = Backbone.Model.extend({});

  _.extend(BaseModel.prototype, Validation.mixin);

  return BaseModel;
});
