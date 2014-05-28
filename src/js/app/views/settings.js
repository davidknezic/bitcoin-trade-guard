define([
    'marionette',
    'app/templates/settings'
  ], function (Marionette, template) {
  return Marionette.Layout.extend({
    template: template,

    regions: {
      content: '.content'
    },

    ui: {
      account: 'a.account',
      sync: 'a.sync',
      backup: 'a.backup'
    },

    events: {
      'click @ui.account': 'clickAccount',
      'click @ui.sync': 'clickSync',
      'click @ui.backup': 'clickBackup'
    },

    initialize: function (options) {
    },

    clickAccount: function (event) {
      event.preventDefault();
    },

    clickSync: function (event) {
      event.preventDefault();
    },

    clickBackup: function (event) {
      event.preventDefault();
    }
  });
});
