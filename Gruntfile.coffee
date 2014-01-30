module.exports = (grunt) ->
  'use strict'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    browserify:
      test:
        src: ['test/**/*.js']
        dest: 'test/test.bundle.js'
      examples:
        files: [
          expand: true,
          cwd: 'examples/'
          src: 'js/**/*.js'
          dest: 'examples/'
          ext: '.bundle.js'
        ]

    coffee:
      compile:
        files: [
          expand: true
          cwd: 'coffee/'
          src: ['**/*.coffee']
          dest: 'coffee/'
          ext: '.js'
        ]

    clean:
      examples:
        src: ['examples/js/**/*.bundle.js','examples/js/**/*.min.js']
      min:
        src: ['js/**/*.min.js', 'js/**/*.map']
      coverage:
        src: ['test/coverage/']

    coveralls:
        options:
            debug: true
            coverage_dir: 'test/coverage'

    eslint:
      target: ['Gruntfile.js', 'js/**/*.js']
      options:
        config: 'config/eslint.json'

    karma:
      unit:
        configFile: 'karma.conf.js'

    uglify:
      options:
        report: 'min',
        banner: '/*! <%= pkg.name %> <%= pkg.version %>'+
                ' <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        sourceMapRoot: '../'
        sourceMapPrefix : 0
        sourceMap: (path) -> path.replace /(\.min)?\.js$/, '.map'
        sourceMappingURL: (path) ->
          fname = path
            .split '/'
            .pop()
          fname.replace /(\.min)?\.js$/, '.map'
        global_defs:
          'DEBUG': false
      dist:
        files: [
          expand: true,
          cwd: './'
          src: 'js/**/*.js'
          dest: './'
          ext: '.min.js'
        ]
      coffee:
        files: [
          expand: true,
          cwd: 'coffee/'
          src: '**/*.js'
          dest: 'coffee/'
          ext: '.min.js'
        ]
      examples:
        files: [
          expand: true
          cwd: 'examples/'
          src: '**/*.js'
          dest: 'examples/'
          ext: '.min.js'
        ]

  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'co', [], ->
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.task.run 'coffee'
    grunt.task.run 'uglify:coffee'

  grunt.registerTask 'examples', [], ->
    grunt.loadNpmTasks 'grunt-browserify'
    grunt.task.run 'clean:examples'
    grunt.task.run 'browserify:examples'

  grunt.registerTask 'min', [], ->
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.task.run 'clean:min'
    grunt.task.run 'uglify:dist'

  grunt.registerTask 'lint', [], ->
    grunt.loadNpmTasks 'grunt-eslint'
    grunt.task.run 'eslint'

  grunt.registerTask 'test', [], ->
    grunt.loadNpmTasks 'grunt-karma'
    grunt.task.run 'karma:unit'

  grunt.registerTask 'travis', [], ->
    grunt.loadNpmTasks 'grunt-karma-coveralls'
    grunt.task.run 'test'
    grunt.task.run 'coveralls'

  grunt.registerTask 'default', ['test','min']
