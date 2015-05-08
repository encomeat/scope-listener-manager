'use strict';

module.exports = function(grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yo: {
      src: 'src',
      dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= yo.dist %>/*', '!<%= yo.dist %>/.git*']
        }]
      },
      server: '.tmp'
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    ngmin: {
      dist: {
        src: ['<%= yo.dist %>/<%= pkg.name %>.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['<%= yo.src %>/*.js'],
        dest: '<%= yo.dist %>/tpl.scope-listener-manager.js'
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.min.js': ['<%= yo.dist %>/<%= pkg.name %>.js']
        }
      }
    },
    // githooks: {
    //   all: {
    //     // Will run the jshint and test:unit tasks at every commit
    //     'pre-commit': 'build',
    //   }
    // }
  });

  grunt.registerTask('test', ['jshint', 'karma:unit']);
  grunt.registerTask('build', ['clean:dist', 'concat:dist', 'ngmin:dist', 'uglify:dist']);
  grunt.registerTask('release', ['test', 'bump-only', 'build', 'bump-commit']);
  grunt.registerTask('default', ['build']);
};
