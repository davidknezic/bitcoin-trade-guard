define([
    'marionette',
    'jquery',
    'intro/templates/main'
  ], function (Marionette, $, template) {
  return Marionette.ItemView.extend({
    template: template,

    tagName: 'main',
    className: 'intro-main',

    scrollToMe: function () {
      $('html,body').animate({
        scrollTop: this.$el.offset().top
      }, 1000);
    }
  });
});
