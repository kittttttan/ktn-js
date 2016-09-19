'use strict';

const gulp = require('gulp');

function testRun(callback) {
  const karmaServer = require('karma').Server;
  return new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, (exitCode) => {
    //
  }).start();
}

gulp.task('test:run', testRun);

gulp.task('min', () => {
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  return gulp
    .src(['!dist/**/*.min.js', 'dist/**/*.js'])
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('ts:src', () => {
  const ts = require('gulp-typescript');
  return gulp.src('ts/**/*.ts')
    .pipe(ts({
      noExternalResolve: true,
      // module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('ts'))
});

gulp.task('ts:node', () => {
  const ts = require('gulp-typescript');
  return gulp.src('node/**/*.ts')
    .pipe(ts({
      noExternalResolve: false,
      // module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('node'))
});

gulp.task('ts:test', () => {
  const ts = require('gulp-typescript');
  return gulp.src(['test/**/*.ts'])
    .pipe(ts({
      noExternalResolve: false,
      //module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('test'))
});

gulp.task('ts', ['ts:src', 'ts:node', 'ts:test']);

gulp.task('test', (callback) => {
  return testRun(callback);
});

gulp.task('default', ['test', 'min']);
