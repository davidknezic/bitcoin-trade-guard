define([
    'backbone'
  ], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      read: null
    },

    initialize: function (options) {
    },

    isRead: function () {
      return this.get('read') !== null;
    }
  });
});
