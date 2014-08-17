define([
    'marionette',
    'parse',
    //'localforage',
    'core/module',
    'intro/module',
    'app/module',
    'bitstamp/module'
  ], function (
    Marionette,
    Parse,
    //localforage,
    CoreModule,
    IntroModule,
    AppModule,
    BitstampModule
  ) {
  var app = new Marionette.Application();

  Parse.initialize(
    'pRwIFCcvOTWPspF4RE3EAsZ5ZWiYZnsWKrI0Ov07',
    'tpoxsrjLcK2oeNwfNGM8kHI0fA7GXF45oFVBEKLH');

  /*localforage.config({
    name: 'tradeguard',
    version: 1.0,
    size: 4980736,
    storeName: 'keyvaluepairs'
  });*/

  app.module("Core", CoreModule);
  app.module("Intro", IntroModule);
  //app.module("App", AppModule);
  //app.module("Bitstamp", BitstampModule);

  return app;
});
