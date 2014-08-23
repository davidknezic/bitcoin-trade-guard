/**
 * Serve Sass files compiled as CSS.
 */
module.exports = exports = function (options) {
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
