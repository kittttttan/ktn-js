'use strict';

const gulp = require('gulp');

function testRun() {
  const karma = require('gulp-karma');
  return gulp
    .src(['test/ts/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
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
  return gulp.src('src/ts/**/*.ts')
    .pipe(ts({
      noExternalResolve: true,
      //module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('src/ts'))
});

gulp.task('ts:node', () => {
  const ts = require('gulp-typescript');
  return gulp.src('src/node/**/*.ts')
    .pipe(ts({
      noExternalResolve: false,
      module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('src/node'))
});

gulp.task('ts:example', () => {
  const ts = require('gulp-typescript');
  return gulp.src(['examples/ts/**/*.ts'])
    .pipe(ts({
      noExternalResolve: false,
      //module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('examples/ts'))
});

gulp.task('ts:test', () => {
  const ts = require('gulp-typescript');
  return gulp.src(['test/ts/**/*.ts'])
    .pipe(ts({
      noExternalResolve: false,
      //module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('test/ts'))
});

gulp.task('babel', ['ts:src'], () => {
  const babel = require('gulp-babel');
  return gulp.src('src/ts/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('ts', ['ts:src', 'ts:node', 'ts:example', 'ts:test']);

gulp.task('test', ['ts:src', 'ts:test'], (callback) => {
  return testRun();
});

gulp.task('default', ['test', 'build', 'min']);
