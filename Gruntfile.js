module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build:{
        src: ['build/']
      },
      coverage:{
        src: ['build/', 'coverage/']
      }
    },

    eslint: {
      target: ['src/**/*.js'],
      options: {
        config: 'eslint.json'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        global_defs: {
          'DEBUG': false
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.js',
          dest: 'build/'
        }]
      }
    }
  });

  //grunt.loadTasks('tasks');

  // grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-karma');

  // tasks
  grunt.registerTask('build', ['clean:build','uglify']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['test','build']);
};
