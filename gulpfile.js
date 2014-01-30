var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  gulp.src(['js/**/*.js', '!js/**/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('default', function() {
  gulp.run('scripts');
});
