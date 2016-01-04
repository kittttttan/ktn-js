// Karma configuration
const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',
    // frameworks to use
    frameworks: ['browserify', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'es6/*.js',
      'test/*.js'
    ],
    // list of files to exclude
    exclude: [
      'es6/*.min.js'
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage', 'html'],
    preprocessors: {
      'es6/*.js': ['browserify'/*, 'coverage'*/],
      'test/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [
        'babelify',
        istanbul({
          instrumenter: isparta,
          ignore: [
            '**/node_modules/**',
            '**/test/**'
          ]
        })
      ]
    },
    coverageReporter: {
      type: 'lcov',
      dir : 'test/coverage/'
    },
    htmlReporter: {
      outputDir: 'test/karma_html',
      templatePath: 'test/karma_html/template.html'
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
