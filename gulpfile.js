'use strict';

const gulp = require('gulp');

gulp.task('min', () => {
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  return gulp
    .src(['!build/*.min.js', 'build/*.js'])
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('build'));
});

const examples = [
  'complex',
  'csv-json',
  'decimal',
  'fib',
  'integer',
  'primality',
  'range'
];

let buildCmds = [];

gulp.task('examples', () => {
  for (let filename of examples) {
    console.log(`example-${filename}`);
  }
});

gulp.task('builds', () => {
  for (let filename of examples) {
    console.log(`build-${filename}`);
  }
});

for (let filename of examples) {
  gulp.task(`example-${filename}`, () => {
    example(filename);
  });

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
  .pipe(source(`${filename}.bundle.js`))
  .pipe(gulp.dest('examples'));
}

function build(filename) {
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  browserify({
    entries: [`es6/${filename}.js`],
    debug: false,
    //insertGlobals: true,
    standalone: filename,
    extensions: ['.js']
  })
  .transform('babelify', {
    extensions: ['.js']
  })
  //.require(`es6/${filename}.js`)
  .bundle()
  .on("error", function (err) {
    console.log("Error : " + err.message);
    this.emit("end");
  })
  .pipe(source(`${filename}.js`))
  .pipe(gulp.dest('build'));
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

gulp.task('build', buildCmds);

gulp.task('babel', function() {
  const babel = require('gulp-babel');
  return gulp.src('es6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'))
});

gulp.task('build-cc', function () {
  const closureCompiler = require('google-closure-compiler').gulp();
  return gulp
    .src(['es6/**/*.js','examples/es6/**/*.js'], {base: './'})
    .pipe(closureCompiler({
        compilation_level: 'SIMPLE',
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        //output_wrapper: '(function(){\n%output%\n}).call(this)',
        js_output_file: 'app.min.js'
      }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['test']);
gulp.task('travis', ['default']);
