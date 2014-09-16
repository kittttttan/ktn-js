gulp = require 'gulp'
gutil = require 'gulp-util'
uglify = require 'gulp-uglify'
coffee = require 'gulp-coffee'
rename = require 'gulp-rename'
browserify = require 'gulp-browserify'
karma = require 'gulp-karma'

gulp.task 'min', ->
  gulp.src ['js/**/*.js', '!js/**/*.min.js']
    .pipe rename
      ext: '.min.js'
    .pipe uglify
      outSourceMap: true
      preserveComments: 'some'
    .pipe gulp.dest 'build'

gulp.task 'coffee', ->
  gulp.src ['coffee/**/*.coffee', 'test/**/*.coffee']
    .pipe coffee
      bare: false
    .pipe gulp.dest 'coffee'

gulp.task 'examples', ->
  gulp.src ['examples/**/*.coffee'], { read: false }
    .pipe browserify
      debug : !gutil.env.production
      insertGlobals : true
      transform: ['coffeeify']
      extensions: ['.coffee']
    .pipe rename (path, file) ->
      path.basename += '.bundle'
      path.extname = '.js'
      return
    .pipe gulp.dest 'examples'

gulp.task 'test', ['coffee'], ->
  gulp.src ['js/**/*.js', 'coffee/**/*.js', 'test/**/*.js']
    .pipe karma
      configFile: 'karma.conf.js'
      action: 'run'

gulp.task 'watch', ->
  gulp.watch 'coffee/**/*.coffee', ['coffee']

gulp.task 'default', ['coffee', 'test']
gulp.task 'travis', ['default']
