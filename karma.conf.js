'use strict';

const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/ts/*.js',
      'test/ts/*.js',
    ],
    exclude: [
    ],
    reporters: ['progress', 'coverage', 'html'],
    preprocessors: {
      'src/ts/*.js': ['webpack', 'sourcemap'],
      'test/ts/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
          presets: ['es2015'],
        },
      },
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
          {
            test: /\.js$/,
            include: path.resolve('src/ts/'),
            loader: 'isparta',
          }
        ],
      },
    },
    webpackMiddleware: {
      noInfo: true,
    },
    /*
    typescriptPreprocessor: {
      options: {
        // module: 'commonjs',
        target: 'es6',
        noImplicitAny: false,
        sourceMap: false
      },
      typings: [
      ]
    },
    */
    coverageReporter: {
      type: 'lcov',
      dir : 'test/coverage/',
    },
    htmlReporter: {
      outputDir: 'test/karma_html',
      templatePath: 'test/karma_html/template.html',
    },
    port: 9876,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
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
    captureTimeout: 60000,
    singleRun: true,
  });
};
