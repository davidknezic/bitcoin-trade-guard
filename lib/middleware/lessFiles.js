/**
 * Serve Less files compiled as CSS.
 */
module.exports = exports = function (options) {
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
