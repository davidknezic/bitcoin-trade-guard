/**
 * Serve Jade files compiled as AMD modules.
 */
module.exports = exports = function (options) {
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
