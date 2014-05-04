/**
 * Serve static files and pass on requests to directories or non existing files.
 */
exports.staticFiles = function (options) {
  var parseurl = require('parseurl'),
      send = require('send');

  return function (req, res, next) {
    if ('GET' != req.method && 'HEAD' != req.method) return next();

    var path = parseurl(req).pathname;

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
      .root(options.root)
      .index(false)
      .hidden(options.hidden)
      .on('error', error)
      .on('directory', directory)
      .pipe(res);
  };
};

/**
 * Serve only one file, always.
 */
exports.deadEnd = function (options) {
  var fs = require('fs'),
      mime = require('mime'),
      cache;

  return function (req, res, next) {
    if (cache) {
      res.writeHead(200, cache.headers);
      res.end(cache.body);
    } else {
      fs.readFile(options.file, function (err, buf) {
        if (err) return next(err);

        cache = {
          headers: {
            'Content-Type': mime.lookup(options.file),
            'Content-Length': buf.length,
            'Cache-Control': 'public, max-age=' + (options.maxAge / 1000)
          },
          body: buf
        };

        res.writeHead(200, cache.headers);
        res.end(cache.body);
      });
    }
  };
};
