define([
    'marionette',
    'intro/templates/subscribe'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: 'section',
    className: 'intro-subscribe',

    ui: {
      lead: 'p.lead',
      registered: '.registered',
      unsuccessful: 'p.unsuccessful',
      registration: 'form.registration',
      email: 'input.email',
      submit: 'button.submit',
      back: 'a.back'
    },

    events: {
      'submit @ui.registration': 'register',
      'click @ui.back': 'reset'
    },

    setLoading: function (isLoading) {
      this.ui.registration.toggleClass('loading', isLoading);
    },

    setState: function (state) {
      this.ui.registered.toggle(state == 'registered');
      this.ui.unsuccessful.toggle(state == 'unsuccessful');
      this.ui.registration.toggle(state == 'registration');
    },

    onShow: function () {
      this.setState('registration');
    },

    showSuccess: function () {
      this.setState('registered');
    },

    showFailure: function () {
      this.setState('unsuccessful');
    },

    reset: function (event) {
      event.preventDefault();

      this.setState('registration');
    },

    register: function (event) {
      event.preventDefault();

      this.model.set('email', this.ui.email.val());

      this.trigger('register', {
        model: this.model,
        view: this
      });
    }
  });
});
