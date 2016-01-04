'use strict';

const gulp = require('gulp');

// deprecated
gulp.task('coffee', () => {
  const coffee = require('gulp-coffee');
  return gulp
    .src(['coffee/**/*.coffee'])
    .pipe(coffee({
      bare: false
    }))
    .pipe(gulp.dest('coffee'));
});

gulp.task('min', () => {
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  return gulp
    .src(['js/**/*.bundle.js', '!js/**/*.min.js'])
    .pipe(rename({
      ext: '.min.js'
    }))
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('build'));
});

const examples = [
  'fib',
  'integer',
  'primality',
  'range'
];

gulp.task('examples', () => {
  for (let filename of examples) {
    console.log(`example-${filename}`);
  }
});

for (let filename of examples) {
  gulp.task(`example-${filename}`, () => {
    example(filename);
  });
}

function example(filename) {
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  browserify({
    entries: [`examples/es6/${filename}.js`],
    debug: true,
    //insertGlobals: true,
    extensions: ['.js']
  })
  .transform('babelify', {
    extensions: ['.js']
  })
  .bundle()
  .pipe(source(`${filename}.bundle.js`))
  .pipe(gulp.dest('examples'));
}

gulp.task('test', () => {
  const karma = require('gulp-karma');
  return gulp
    .src(['es6/*.js', 'test/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('default', ['test', 'min']);
gulp.task('travis', ['default']);
