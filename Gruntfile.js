module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    serve: {
      development: {
        options: {
          base: './src',
          indexJade: {
            data: {
              env: 'development'
            }
          }
        }
      }
    },

    jadeamd: {
      templates: {
        options: {
          from: './src/js/app/templates',
          to: './build/js/app/templates'
        }
      }
    },

    requirejs: {
      compile: {
        options: grunt.file.readJSON('build.json')
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadTasks("./tasks");

  grunt.registerTask('dev', [
    'serve:development'
  ]);

  grunt.registerTask('build', [
    'jadeamd:templates',
    'requirejs:compile'
    // TODO: compile index.jade to html
    // TODO: compile less files
    // TODO: copy static content (img)
    // TODO: delete jadeAmd templates
  ]);
};
