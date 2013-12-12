module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      test: {
        src: ['test/**/*.js'],
        dest: 'test/test.bundle.js'
      },
      examples: {
        files: [{
          expand: true,
          cwd: 'examples/',
          src: 'js/**/*.js',
          dest: 'examples/',
          ext: '.bundle.js'
        }]
      }
    },

    clean: {
      examples: {
        src: ['examples/js/**/*.bundle.js','examples/js/**/*.min.js']
      },
      min: {
        src: ['js/**/*.min.js', 'js/**/*.map']
      },
      coverage: {
        src: ['coverage/']
      }
    },

    coveralls: {
        options: {
            debug: true,
            coverage_dir: 'coverage'
        }
    },

    eslint: {
      target: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        config: 'config/eslint.json'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    uglify: {
      options: {
        report: 'min',
        banner: '/*! <%= pkg.name %> <%= pkg.version %>'+
                ' <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMapRoot: '../',
        //sourceMapRoot: 'https://github.com/kittttttan/ktn-js/raw/master/',
        sourceMapPrefix : 0,
        sourceMap: function(path) {
          return path.replace(/(\.min)?\.js$/, '.map');
        },
        sourceMappingURL: function(path) {
          var fname = path.split('/').pop();
          return fname.replace(/(\.min)?\.js$/, '.map');
        },
        global_defs: {
          'DEBUG': false
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: './',
          src: 'js/**/*.js',
          dest: './',
          ext: '.min.js'
        }]
      },
      examples: {
        files: [{
          expand: true,
          cwd: 'examples/',
          src: '**/*.js',
          dest: 'examples/',
          ext: '.min.js'
        }]
      }
    }
  });

  // grunt plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  // tasks
  grunt.registerTask('examples', ['clean:examples','browserify:examples']);
  grunt.registerTask('min', ['clean:min','uglify:dist']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('travis', ['test', 'coveralls']);
  grunt.registerTask('default', ['test','min']);
};
