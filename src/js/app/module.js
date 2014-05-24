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
    'app/controllers/static',
    'app/controllers/trades',
    'app/routers/static',
    'app/routers/trades'
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
    StaticController,
    TradesController,
    StaticRouter,
    TradesRouter
  ) {
  var AppModule = Marionette.Module.extend({
    initialize: function(options, moduleName, app) {
      this.addInitializer(function (options) {
        channel.commands.setHandler('app:title:set', function (title) {
          document.title = title;
        });
      });

      this.addInitializer(function (options) {
        var layout = new AppLayout({ el: 'body' });
        layout.render();

        layout.navigation.show(new NavView());
        layout.footer.show(new FooterView());

        channel.commands.setHandler('app:content:show', function (view) {
          layout.content.show(view);
        });
      });

      this.addInitializer(function (options) {
        var trades = new Trades(),
            currencies = new Currencies(),
            labels = new Labels();

        channel.reqres.setHandler('app:data:trades', function () {
          return trades;
        });

        channel.reqres.setHandler('app:data:currencies', function () {
          return currencies;
        });

        channel.reqres.setHandler('app:data:labels', function () {
          return labels;
        });
      });

      this.addInitializer(function (options) {
        new StaticController();
        new TradesController();
      });

      this.addInitializer(function (options) {
        new StaticRouter();
        new TradesRouter();

        Backbone.history.start({
          pushState: true
        });
      });
    },

    onStart: function(options) {
    },

    onStop: function(options) {
    },
  });

  return AppModule;
});
