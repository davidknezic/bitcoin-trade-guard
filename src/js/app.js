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
    'TTkLNPMw8KOMzJUcjumW2aOb340MFbWZhfphVr0w',
    'l1AEye0vXbDUFQeoVnqT97hVGE08tzeaPqbvhzI5');

  /*localforage.config({
    name: 'tradeguard',
    version: 1.0,
    size: 4980736,
    storeName: 'keyvaluepairs'
  });*/

  app.module("Core", CoreModule);
  app.module("App", AppModule);
  app.module("Bitstamp", BitstampModule);

  return app;
});
