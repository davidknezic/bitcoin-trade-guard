/**
 * Grunt 'jadeamd' task: Transforms jade templates to amd files.
 */

function fromJadeToAmd(jade_path, amd_path, jade_runtime_name) {
  var fs = require('fs');
  var path = require('path');
  var mkdirp = require('mkdirp');
  var jade = require('jade');

  var template = fs.readFileSync(jade_path, { encoding: 'utf8' });
  var amd_dir_path = path.dirname(amd_path);

  mkdirp.sync(amd_dir_path);

  var fn = jade.compileClient(template, {
    pretty: true,
    compileDebug: false, // don't compile debug instrumentation
    filename : jade_path // used in exceptions and for includes
  });

  var content = "define(['" + jade_runtime_name + "'], function (jade) {\n"
              + "return " + fn.toString() + ";\n"
              + "});\n";

  fs.writeFileSync(amd_path, content);
};

module.exports = function (grunt) {
  grunt.registerMultiTask('jadeamd', 'Transforms jade templates to amd files.', function () {
    var options = this.options({
      from: './src',
      to: './build',
      jadeRuntimeName: 'jade'
    });

    var path = require('path');
    var glob = require('glob');

    var from = path.resolve(options.from);
    var to = path.resolve(options.to);

    var jade_paths = glob.sync('**/*.jade', { cwd: from, nonull: false });

    jade_paths.forEach(function (jade_path) {
      var jade_abs_path = path.resolve(from, jade_path);
      var amd_path = path.resolve(to, jade_path);
      amd_path = amd_path.replace(/\.jade$/, '.js');

      var err = fromJadeToAmd(jade_abs_path, amd_path, options.jadeRuntimeName);

      if (err) grunt.fatal(err);
    });
  });
};
