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

    jade: {
      templates: {
        options: {
          client: true,
          amd: true,
          namespace: false,
          data: {
            env: 'production'
          }
        },
        files: [{
          expand: true,
          cwd: './src/js/app/templates',
          src: '**/*.jade',
          dest: './build/js/app/templates',
          ext: '.js'
        }]
      },
      static: {
        options: {
          data: {
            env: 'production'
          }
        },
        files: {
          './build/index.html': './src/index.jade'
        }
      }
    },

    requirejs: {
      compile: {
        options: grunt.file.readJSON('build.json')
      }
    },

    less: {
      compile: {
        options: {
        },
        files: {
          './build/css/app.css': './src/css/app.less'
        }
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: './src/img',
          src: '**',
          dest: './build/img'
        },
        {
          expand: true,
          cwd: './src/bower_components/font-awesome/fonts',
          src: '**',
          dest: './build/fonts'
        },
        {
          expand: true,
          cwd: './src/bower_components/bootstrap/fonts',
          src: '**',
          dest: './build/fonts'
        }]
      }
    },

    clean: {
      build: ['./build'],
      templates: ['./build/js/app']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadTasks("./tasks");

  grunt.registerTask('dev', [
    'serve:development'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'jade:templates',
    'requirejs:compile',
    'jade:static',
    'less:compile',
    'copy:build',
    'clean:templates'
  ]);
};
