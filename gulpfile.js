'use strict';

const gulp = require('gulp');

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

gulp.task('default', ['min']);
