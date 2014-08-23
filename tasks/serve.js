/**
 * Grunt 'serve' task: Serve the app without building it.
 */

module.exports = function (grunt) {
  var http = require('http'),
      connect = require('connect'),
      staticFiles = require('../lib/middleware/staticFiles'),
      jadeAmdModules = require('../lib/middleware/jadeAmdModules'),
      sassFiles = require('../lib/middleware/sassFiles'),
      jadeIndex = require('../lib/middleware/jadeIndex');

  grunt.registerMultiTask('serve', 'Serve the app without building it.', function () {
    var done = this.async();

    var options = this.options({
      base: '.',
      indexJade: {
        data: {}
      }
    });

    var app = connect();

    app.use(staticFiles({
      base: options.base,
      hidden: false,
      maxAge: 0,
      rewrites: [
        {
          pattern: /^\/fonts\/(glyphicons-halflings-regular\.(eot|svg|ttf|woff)).*$/,
          replacement: '/bower_components/bootstrap/fonts/$1'
        },
        {
          pattern: /^\/fonts\/(fontawesome-webfont\.(eot|svg|ttf|woff)).*$/,
          replacement: '/bower_components/font-awesome/fonts/$1'
        }
      ]
    }));

    app.use(jadeAmdModules({
      base: options.base,
      pretty: false,
      jadeRuntimeName: 'jade'
    }));

    app.use(sassFiles({
      base: options.base
    }));

    app.use(jadeIndex({
      base: options.base,
      file: 'index.jade',
      pretty: true,
      data: options.indexJade.data
    }));

    var server = http.createServer(app);

    server
      .listen(3000, '0.0.0.0')
      .on('listening', function() {
        grunt.log.write('Started listening...\n');
      })
      .on('error', function(err) {
        grunt.log.write('Error occured!\n');
        grunt.fatal(err);
      });

    grunt.log.write('Waiting forever...\n');
  });
};
