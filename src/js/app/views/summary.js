define([
    'marionette',
    'app/templates/summary'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      start: '.start',
      end: '.end',
      volume: '.volume'
    },

    onShow: function () {
      var start = this.model.get('start'),
          end = this.model.get('end'),
          volume = this.model.get('volume');

      this.ui.start.text(start.format('l'));
      this.ui.end.text(end.format('l'));
      this.ui.volume.text(volume.format());
    }
  });
});
