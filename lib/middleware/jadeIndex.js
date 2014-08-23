/**
 * Serve only one Jade index file, always.
 */
module.exports = exports = function (options) {
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
