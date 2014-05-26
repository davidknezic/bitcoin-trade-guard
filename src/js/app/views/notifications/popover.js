define([
    'marionette',
    'app/templates/notifications/popover'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,
    attributes: {
      class: 'notification-popover',
      all: 'a.show-all'
    },

    events: {
      'click button.close': 'close',
      'click a.read-all': 'readAll',
      'click a.show-all': 'showAll',
      'click a.list-group-item': 'select'
    },

    initialize: function (options) {
      this.trigger = options.trigger;

      this.trigger.popover({
        html: true,
        placement: 'bottom',
        content: this.render().el
      });
    },

    close: function (event) {
      event.preventDefault();

      this.trigger.popover('hide');
    },

    select: function (event) {
      event.preventDefault();
    },

    readAll: function (event) {
      event.preventDefault();
    },

    showAll: function (event) {
      event.preventDefault();

      this.trigger.popover('hide');
    }
  });
});
