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
        src: ['test/coverage/']
      }
    },

    coveralls: {
        options: {
            debug: true,
            coverage_dir: 'test/coverage'
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
  grunt.loadNpmTasks('grunt-contrib-clean');

  // tasks
  grunt.registerTask('examples', [], function() {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.task.run('clean:examples');
    grunt.task.run('browserify:examples');
  });
  grunt.registerTask('min', [], function() {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.task.run('clean:min');
    grunt.task.run('uglify:dist');
  });
  grunt.registerTask('lint', [], function() {
    grunt.loadNpmTasks('grunt-eslint');
    grunt.task.run('eslint');
  });
  grunt.registerTask('test', [], function() {
    grunt.loadNpmTasks('grunt-karma');
    grunt.task.run('karma:unit');
  });
  grunt.registerTask('travis', [], function() {
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.task.run('test');
    grunt.task.run('coveralls');
  });
  grunt.registerTask('default', ['test','min']);
};
