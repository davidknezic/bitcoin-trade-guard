define([
    'marionette',
    'app/templates/labels/new'
  ], function (Marionette, template) {
  return Marionette.ItemView.extend({
    template: template,

    ui: {
      text: '.text',
      add: 'button.add',
      color: '.color',
      preview: '.color-preview',
      code: '.color-code'
    },

    events: {
      'click .color': 'selectColor',
      'keyup .color-code': 'changeCode',
      'submit form': 'save'
    },

    initialize: function (options) {
      this.labels = options.labels;
    },

    onRender: function () {
      this.ui.color.each(function (index, el) {
        var $el = $(el);

        $el.css('background-color', $el.data('color'));
      });
    },

    selectColor: function (event) {
      var $el = $(event.target),
          code = $el.data('color');

      event.preventDefault();

      this.ui.preview.css('background-color', code);
      this.ui.code.val(code);
    },

    changeCode: function () {
      var code = this.ui.code.val();

      this.ui.preview.css('background-color', code);
    },

    save: function (event) {
      event.preventDefault();

      this.labels.add({
        color: this.ui.code.val(),
        text: this.ui.text.val()
      });

      this.ui.code.val('');
      this.ui.text.val('');
      this.ui.preview.css('background-color', '');
    }
  });
});
