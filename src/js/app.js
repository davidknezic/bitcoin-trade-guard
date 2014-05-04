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
    StaticController,
    TradesController,
    StaticRouter,
    TradesRouter
  ) {
  var App = new Marionette.Application({});

  App.addInitializer(function (options) {
    channel.commands.setHandler('app:title:set', function (title) {
      document.title = title;
    });
  });

  App.addInitializer(function (options) {
    var layout = new AppLayout({ el: 'body' });
    layout.render();

    layout.navigation.show(new NavView());
    layout.footer.show(new FooterView());

    channel.commands.setHandler('app:content:show', function (view) {
      layout.content.show(view);
    });
  });

  App.addInitializer(function (options) {
    var trades = new Trades();
    var currencies = new Currencies();

    channel.reqres.setHandler('app:data:trades', function () {
      return trades;
    });

    channel.reqres.setHandler('app:data:currencies', function () {
      return currencies;
    });
  });

  App.addInitializer(function (options) {
    new StaticController();
    new TradesController();
  });

  App.addInitializer(function (options) {
    new StaticRouter();
    new TradesRouter();

    Backbone.history.start({
      pushState: true
    });
  });

  return App;
});
