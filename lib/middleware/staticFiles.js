/**
 * Serve static files and pass on requests to directories
 * or non existing files.
 */
module.exports = exports = function (options) {
  var path = require('path'),
      parseurl = require('parseurl'),
      send = require('send');

  var base = path.resolve(options.base);

  return function (req, res, next) {
    if ('GET' != req.method && 'HEAD' != req.method) return next();

    var path = parseurl(req).pathname;
    var rewrite;

    if (options.rewrites !== undefined) {
      for (var i = 0; i < options.rewrites.length; i++) {
        rewrite = options.rewrites[i];

        path = path.replace(rewrite.pattern, rewrite.replacement);
      }
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
