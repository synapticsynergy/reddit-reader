module.exports = function(grunt) {
  // load up all of the necessary grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');


  // grunt setup
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // create a task called clean, which
    // deletes all files in the listed folders
    clean: {
      dist: 'client/dist/*'
    },

    // what files should be linted
    jshint: {
      gruntfile: 'Gruntfile.js',
      client: 'client/app/**/*.js',
      server: 'server/**/*.js',
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },

    // uglify the files
    uglify: {
      dist: {
        files: {
          'client/dist/built.min.js': 'client/dist/built.js'
        }
      }
    },

    // concat all the js files
    concat: {
      dist: {
        files: {
          // concat all the client files
          'client/dist/built.js': 'client/app/**/*.js'
        }
      }
    },

    // configure the server
    express: {
      dev: {
        options: {
          script: './index.js'
        }
      }
    }

  });

  // Perform a build
  grunt.registerTask('build', [ 'clean', 'concat', 'uglify']);


  // Start build and run server
  grunt.registerTask('default', [ 'build', 'express:dev' ]);
};
