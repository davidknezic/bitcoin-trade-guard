/**
 * Grunt 'serve' task: Serve the app without building it.
 */

function createServeStaticFiles(options) {
  var path = require('path');
  var parseurl = require('parseurl');
  var send = require('send');

  var base = path.resolve(options.base);

  return function (req, res, next) {
    if ('GET' != req.method && 'HEAD' != req.method) return next();

    var path = parseurl(req).pathname;
    var rewrite;

    for (var i = 0; i < options.rewrites.length; i++) {
      rewrite = options.rewrites[i];

      path = path.replace(rewrite.pattern, rewrite.replacement);
    }

    function error(err) {
      if (404 == err.status) return next();

      res.statusCode = err.status || 500;
      res.end(err.message);
    };

    function directory() {
      next();
    };

    send(req, path)
      .maxage(options.maxAge || 0)
      .root(base)
      .index(false)
      .hidden(options.hidden)
      .on('error', error)
      .on('directory', directory)
      .pipe(res);
  };
};

function createServeJadeAmdModules(options) {
  var path = require('path');
  var parseurl = require('parseurl');
  var fs = require('fs');
  var jade = require('jade');

  var base = path.resolve(options.base);

  return function (req, res, next) {
    var url_path = parseurl(req).pathname;
    var jade_path = url_path.replace(/\.js$/, '.jade');
    var jade_abs_path = base + jade_path;

    fs.readFile(jade_abs_path, 'utf8', function (err, template) {
      if (err) {
        if (['ENOENT', 'EISDIR'].indexOf(err.code) >= 0) return next()
        return next(err);
      }

      res.setHeader('Content-Type', 'application/javascript');

      var fn = jade.compileClient(template, {
        pretty: options.pretty,
        compileDebug: false, // don't compile debug instrumentation
        filename : jade_abs_path // used in exceptions and for includes
      });

      res.end("define(['" + options.jadeRuntimeName + "'], function(jade) {\n"
             +"return " + fn.toString() + ";\n"
             +"});\n");
    });
  };
};

function createServeLessFiles(options) {
  var path = require('path');
  var parseurl = require('parseurl');
  var fs = require('fs');
  var less = require('less');

  var base = path.resolve(options.base);

  return function (req, res, next) {
    var url_path = parseurl(req).pathname;
    var less_path = url_path.replace(/\.css$/, '.less');

    if (options.files.indexOf(less_path) < 0) {
      return next();
    }

    var less_abs_path = base + less_path;
    var less_dir_abs_path = path.dirname(less_abs_path);
    var less_filename = path.basename(less_abs_path);

    fs.readFile(less_abs_path, 'utf8', function (err, content) {
      if (err) {
        if (['ENOENT', 'EISDIR'].indexOf(err.code) >= 0) return next()
        return next(err);
      }

      res.setHeader('Content-Type', 'text/css');

      var parser = new(less.Parser)({
        paths: [less_dir_abs_path],
        filename: less_filename
      });

      parser.parse(content, function (e, tree) {
        if (e) return next(e);

        res.end(tree.toCSS({
          compress: options.compress
        }));
      });
    });
  };
};

function createServeSassFiles(options) {
  var sass = require('node-sass');
  var path = require('path');

  var base = path.resolve(options.base);

  return sass.middleware({
    src: base,
    debug: false,
    response: true,
    force: true,
    includePaths: [
      path.resolve(base + '/bower_components/foundation/scss'),
      path.resolve(base + '/bower_components/font-awesome/scss'),
      path.resolve(base + '/bower_components/bourbon/dist')
    ]
  });
};

function createServeIndexJade(options) {
  var path = require('path');
  var fs = require('fs');
  var jade = require('jade');

  var base = path.resolve(options.base);

  return function (req, res, next) {
    var jade_file = path.resolve(options.base, options.file);

    fs.readFile(jade_file, 'utf8', function (err, template) {
      if (err) return next(err);

      var fn = jade.compile(template, {
        pretty: options.pretty,
        compileDebug: false, // don't compile debug instrumentation
        filename : jade_file // used in exceptions and for includes
      });

      res.setHeader('Content-Type', 'text/html');
      res.end(fn(options.data));
    });
  };
};

module.exports = function (grunt) {
  var http = require('http');
  var connect = require('connect');

  grunt.registerMultiTask('serve', 'Serve the app without building it.', function () {
    var done = this.async();

    var options = this.options({
      base: '.',
      indexJade: {
        data: {}
      }
    });

    var app = connect();

    app.use(createServeStaticFiles({
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

    app.use(createServeJadeAmdModules({
      base: options.base,
      pretty: false,
      jadeRuntimeName: 'jade'
    }));

    app.use(createServeSassFiles({
      base: options.base
    }));

    app.use(createServeIndexJade({
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
