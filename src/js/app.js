define([
    'channel',
    'underscore',
    'backbone',
    'marionette',
    'app/views/layout',
    'app/views/navigation',
    'app/views/footer',
    'app/collections/trades',
    'app/controllers/static',
    'app/controllers/trades',
    'app/routers/static',
    'app/routers/trades'
  ], function (channel, _, Backbone, Marionette, LayoutView, NavView, FooterView,
               Trades, StaticController, TradesController, StaticRouter, TradesRouter) {
  var App = new Marionette.Application({});

  App.addInitializer(function (options) {
    channel.commands.setHandler('app:title:set', function (title) {
      document.title = title;
    });
  });

  App.addInitializer(function (options) {
    var layout = new LayoutView({
      el: 'body'
    });

    layout.render();

    layout.navigation.show(new NavView());
    layout.footer.show(new FooterView());

    _.each(layout.regions, function (selector, name) {
      var commandName = 'app:' + name + ':show';
      channel.commands.setHandler(commandName, function (view) {
        layout[name].show(view);
      });
    });
  });

  App.addInitializer(function (options) {
    var trades = new Trades();

    channel.reqres.setHandler('app:data:trades', function () {
      return trades;
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
