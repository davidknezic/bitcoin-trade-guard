require.config({
  baseUrl: '/js',
  noGlobal: true,

  paths: {
    'underscore': '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
    'jquery': '../bower_components/jquery/dist/jquery',
    'backbone': '../bower_components/backbone/backbone',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
    'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localStorage',
    'backbone.validation': '../bower_components/backbone-validation/dist/backbone-validation-amd',
    'marionette': '../bower_components/marionette/lib/core/amd/backbone.marionette',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'jade': '../bower_components/jade/runtime',
    'moment': '../bower_components/moment/min/moment-with-langs',
    'd3': '../bower_components/d3/d3',
    'crypto': '../bower_components/cryptojslib/rollups/hmac-sha256',
    'monetary': '../bower_components/monetary/dist/monetary.full',
    'parse': '../bower_components/parse-js-sdk/lib/parse',

    'validators': 'lib/validators'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'underscore.string': {
      deps: ['underscore']
    },
    'backbone': {
      exports: 'Backbone',
      deps: ['underscore', 'jquery']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'crypto': {
      exports: 'CryptoJS'
    },
    parse: {
      deps: ['jquery', 'underscore'],
      exports: 'Parse'
    }
  }
});

require(['parse', 'app'], function (Parse, app) {
  Parse.initialize(
    'TTkLNPMw8KOMzJUcjumW2aOb340MFbWZhfphVr0w',
    'l1AEye0vXbDUFQeoVnqT97hVGE08tzeaPqbvhzI5');

  app.start();
});
