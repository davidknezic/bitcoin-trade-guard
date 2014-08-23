/**
 * Serve only one file, always.
 */
module.exports = exports = function (options) {
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
