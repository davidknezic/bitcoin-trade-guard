define([
    'marionette',
    'app/models/sync',
    'bitstamp/templates/new',
    'bitstamp/controllers/auth'
  ], function (Marionette, Sync, template, AuthController) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      errorBox: '.error-box',
      errorMessage: '.error-message',
      title: '.title',
      clientId: '.client-id',
      key: '.key',
      secret: '.secret',
      submit: 'button[type="submit"]'
    },

    events: {
      'submit form': 'submit'
    },

    onRender: function () {
      this.ui.errorBox.hide();
    },

    submit: function (event) {
      var authController = new AuthController(),
          clientId = this.ui.clientId.val(),
          key = this.ui.key.val(),
          secret = this.ui.secret.val();

      event.preventDefault();

      this.setLoading(true);

      authController.on('success', function () {
        this.setLoading(false);
        this.saveSync();
      }, this);

      authController.on('failure', function (message) {
        this.setLoading(false);
        this.setError(message);
      }, this);

      authController.verify(clientId, key, secret);
    },

    setLoading: function (isLoading) {
      this.ui.title.prop('disabled', isLoading);
      this.ui.clientId.prop('disabled', isLoading);
      this.ui.key.prop('disabled', isLoading);
      this.ui.secret.prop('disabled', isLoading);
      this.ui.submit.button(isLoading ? 'loading' : 'reset');
    },

    setError: function (error) {
      this.ui.errorMessage.text(error);
      this.ui.errorBox.toggle(error !== null);
    },

    saveSync: function () {
      this.trigger('save', new Sync({
        service: 'bitstamp',
        title: this.ui.title.val(),
        data: {
          clientId: this.ui.clientId.val(),
          key: this.ui.key.val(),
          secret: this.ui.secret.val()
        }
      }));
    }
  });
});
