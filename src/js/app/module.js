define([
    'channel',
    'underscore',
    'backbone',
    'marionette',
    'app/views/layouts/app',
    'app/views/navigation',
    'app/views/footer',
    'app/views/intro',
    'app/collections/trades',
    'app/collections/currencies',
    'app/collections/labels',
    'app/collections/notifications',
    'app/collections/syncs',
    'app/collections/services',
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
    IntroView,
    Trades,
    Currencies,
    Labels,
    Notifications,
    Syncs,
    Services,
    StaticController,
    TradesController,
    SettingsController,
    StaticRouter,
    TradesRouter,
    SettingsRouter
  ) {
  var AppModule = Marionette.Module.extend({
    initialize: function(options, moduleName, app) {
      this.layout = new AppLayout({ el: 'body' });
      this.trades = new Trades();
      this.currencies = new Currencies();
      this.labels = new Labels();
      this.notifications = new Notifications();
      this.syncs = new Syncs();
      this.services = new Services();
    },

    onStart: function(options) {
      // Register title handler
      channel.commands.setHandler('app:title:set', function (title) {
        document.title = title;
      });

      // Register data getters
      channel.reqres.setHandler('app:data:trades', function () { return this.trades; }, this);
      channel.reqres.setHandler('app:data:currencies', function () { return this.currencies; }, this);
      channel.reqres.setHandler('app:data:labels', function () { return this.labels; }, this);
      channel.reqres.setHandler('app:data:notifications', function () { return this.notifications; }, this);
      channel.reqres.setHandler('app:data:syncs', function () { return this.syncs; }, this);
      channel.reqres.setHandler('app:data:services', function () { return this.services; }, this);

      // Build layout
      //this.layout.render();

      this.layout.navigation.show(new NavView({
        notifications: this.notifications
      }));

      this.layout.footer.show(new FooterView());

      // Register content setter
      channel.commands.setHandler('app:content:show', function (view) {
        this.layout.content.show(view);
      }, this);

      this.staticController = new StaticController();
      this.tradesController = new TradesController();
      this.settingsController = new SettingsController();

      this.staticRouter = new StaticRouter();
      this.tradesRouter = new TradesRouter();
      this.settingsRouter = new SettingsRouter();

      //Backbone.history.start({
      //  pushState: true
      //});

      var i = new IntroView({
        el: 'body'
      });
      i.render();
    },

    onStop: function(options) {
      channel.commands.removeHandler('app:title:set');

      channel.reqres.removeHandler('app:data:trades');
      channel.reqres.removeHandler('app:data:currencies');
      channel.reqres.removeHandler('app:data:labels');
      channel.reqres.removeHandler('app:data:notifications');
      channel.reqres.removeHandler('app:data:syncs');
      channel.reqres.removeHandler('app:data:services');

      channel.commands.removeHandler('app:content:show');

      this.staticRouter.close();
      this.tradesRouter.close();
      this.settingsRouter.close();

      this.staticController.close();
      this.tradesController.close();
      this.settingsController.close();
    },
  });

  return AppModule;
});
