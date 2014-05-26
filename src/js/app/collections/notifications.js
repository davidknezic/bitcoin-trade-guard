define([
    'backbone',
    'app/models/notification'
  ], function (Backbone, Notification) {
  return Backbone.Collection.extend({
    model: Notification,

    hasUnread: function () {
      return this.any(function (notification) {
        return !notification.isRead();
      });
    }
  });
});
