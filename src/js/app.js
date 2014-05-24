define([
    'marionette',
    'app/module',
    'bitstamp/module'
  ], function (
    Marionette,
    AppModule,
    BitstampModule
  ) {
  var app = new Marionette.Application();

  app.module("App", AppModule);
  app.module("Bitstamp", BitstampModule);

  return app;
});
