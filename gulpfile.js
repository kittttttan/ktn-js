'use strict';

const gulp = require('gulp');

gulp.task('test', () => {
  const karma = require('gulp-karma');
  return gulp
    .src(['src/es6/*.js', 'test/es6/*.js', 'src/ts/*.ts', 'test/ts/*.ts'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

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

const examples = [
  'complex',
  'csv-json',
  'fib',
  'integer',
  'math-expression',
  'primality',
  'range',
  'rational'
];

let examCmds = [];
let buildCmds = [];

for (let filename of examples) {
  gulp.task(`example-${filename}`, () => {
    example(filename);
  });
  examCmds.push(`example-${filename}`);

  gulp.task(`build-${filename}`, () => {
    build(filename);
  });
  buildCmds.push(`build-${filename}`);
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
  .on("error", function (err) {
    console.log("Error : " + err.message);
    this.emit("end");
  })
  .pipe(source(`${filename}.js`))
  .pipe(gulp.dest('examples/js'));
}

function build(filename) {
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  browserify({
    entries: [`src/es6/${filename}.js`],
    debug: true,
    //insertGlobals: true,
    standalone: filename,
    extensions: ['.js']
  })
  .transform('babelify', {
    extensions: ['.js']
  })
  //.require(`src/es6/${filename}.js`)
  .bundle()
  .on("error", function (err) {
    console.log("Error : " + err.message);
    this.emit("end");
  })
  .pipe(source(`${filename}.js`))
  .pipe(gulp.dest('dist/browser'));
}

gulp.task('example', examCmds);
gulp.task('build', buildCmds);

gulp.task('babel', function() {
  const babel = require('gulp-babel');
  return gulp.src('src/es6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/babel'))
});

gulp.task('default', ['test', 'build', 'min']);
gulp.task('travis', ['test']);
