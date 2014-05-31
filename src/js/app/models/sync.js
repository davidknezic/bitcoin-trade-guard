define([
    'backbone'
  ], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      service: null,
      title: null,
      data: null,
      latestExecutionOn: null,
      hasLatestExecutionFailed: null,
      latestExecutionFailureReason: null
    },

    initialize: function (options) {
    }
  });
});
