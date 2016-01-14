'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('test:run', () => {
  const karma = require('gulp-karma');
  return gulp
    .src(['test/ts/*.js'])
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
    entries: [`examples/ts/${filename}.js`],
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
    entries: [`src/ts/${filename}.js`],
    debug: true,
    //insertGlobals: true,
    standalone: filename,
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
  .pipe(gulp.dest('dist/browser'));
}

gulp.task('example', examCmds);
gulp.task('build', buildCmds);

gulp.task('ts:src', function() {
  const ts = require('gulp-typescript');
  return gulp.src('src/ts/**/*.ts')
    .pipe(ts({
      noExternalResolve: true,
      module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('src/ts'))
});

gulp.task('ts:example', function() {
  const ts = require('gulp-typescript');
  return gulp.src(['examples/ts/**/*.ts'])
    .pipe(ts({
      noExternalResolve: false,
      module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('examples/ts'))
});

gulp.task('ts:test', function() {
  const ts = require('gulp-typescript');
  return gulp.src(['test/ts/**/*.ts'])
    .pipe(ts({
      noExternalResolve: false,
      module: 'commonjs',
      target: 'es6',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('test/ts'))
});

gulp.task('babel', function() {
  const babel = require('gulp-babel');
  return gulp.src('src/ts/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('ts', ['ts:src', 'ts:example', 'ts:test']);

gulp.task('test', (callback) => {
  return runSequence(['ts:src', 'ts:test'], 'test:run', callback);
});

gulp.task('default', ['test', 'build', 'min']);
