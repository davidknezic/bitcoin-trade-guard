define([
    'channel',
    'underscore',
    'backbone',
    'marionette',
    'app/views/layouts/app',
    'app/views/navigation',
    'app/views/footer',
    'app/collections/trades',
    'app/collections/currencies',
    'app/collections/labels',
    'app/collections/notifications',
    'app/controllers/static',
    'app/controllers/trades',
    'app/controllers/settings',
    'app/routers/static',
    'app/routers/trades',
    'app/routers/settings'
  ], function (
    channel,
    _,
    Backbone,
    Marionette,
    AppLayout,
    NavView,
    FooterView,
    Trades,
    Currencies,
    Labels,
    Notifications,
    StaticController,
    TradesController,
    SettingsController,
    StaticRouter,
    TradesRouter,
    SettingsRouter
  ) {
  var AppModule = Marionette.Module.extend({
    initialize: function(options, moduleName, app) {
      var layout = new AppLayout({ el: 'body' }),
          trades = new Trades(),
          currencies = new Currencies(),
          labels = new Labels(),
          notifications = new Notifications();

      // Register title handler
      channel.commands.setHandler('app:title:set', function (title) {
        document.title = title;
      });

      // Register data getters
      channel.reqres.setHandler('app:data:trades', function () { return trades; });
      channel.reqres.setHandler('app:data:currencies', function () { return currencies; });
      channel.reqres.setHandler('app:data:labels', function () { return labels; });
      channel.reqres.setHandler('app:data:notifications', function () { return notifications; });

      // Build layout
      layout.render();

      layout.navigation.show(new NavView({
        notifications: notifications
      }));

      layout.footer.show(new FooterView());

      // Register content setter
      channel.commands.setHandler('app:content:show', function (view) {
        layout.content.show(view);
      });

      new StaticController();
      new TradesController();
      new SettingsController();

      new StaticRouter();
      new TradesRouter();
      new SettingsRouter();

      Backbone.history.start({
        pushState: true
      });
    },

    onStart: function(options) {
    },

    onStop: function(options) {
    },
  });

  return AppModule;
});
