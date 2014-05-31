define([
    'marionette',
    'app/models/sync',
    'bitstamp/templates/new'
  ], function (Marionette, Sync, template) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      title: '.title',
      key: '.key',
      secret: '.secret',
      submit: 'button[type="submit"]'
    },

    events: {
      'submit form': 'submit'
    },

    initialize: function (options) {
    },

    submit: function (event) {
      event.preventDefault();

      this.setLoading(true);
    },

    setLoading: function (isLoading) {
      this.ui.key.prop('disabled', isLoading);
      this.ui.secret.prop('disabled', isLoading);
      this.ui.submit.button(isLoading ? 'loading' : 'reset');
    },

    saveSync: function () {
      this.trigger('save', new Sync({
        service: 'bitstamp',
        title: this.ui.title.val(),
        data: {
          key: this.ui.key.val(),
          secret: this.ui.secret.val()
        }
      }));
    }
  });
});
