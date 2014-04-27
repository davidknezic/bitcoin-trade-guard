module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    serve: {
      development: {
        options: {
          base: 'src',
          indexJade: {
            data: {
              env: 'development'
            }
          }
        }
      }
    }
  });

  grunt.loadTasks("./tasks");

  grunt.registerTask('dev', ['serve:development']);
};
