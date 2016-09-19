'use strict';

const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
//      'test/import-babel-polyfill.js',
      'dist/*.js',
//      'ts/*.ts',
//      'test/*.ts',
    ],
    exclude: [
    ],
    reporters: ['progress', 'coverage', 'html'],
    preprocessors: {
//      'test/import-babel-polyfill.js': ['webpack', 'sourcemap'],
      'dist/*.js': ['coverage'],
//      'ts/*.ts': ['webpack', 'sourcemap'],
//      'test/*.ts': ['webpack', 'sourcemap'],
    },
/*
    webpack: {
      devtool: 'inline-source-map',
      debug: true,
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
*/
    /*
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
            exclude: [
              /node_modules/
            ],
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          },
          {
            test: /\.js$/,
            include: [
              path.resolve('ts/'),
              path.resolve('test/')
            ],
            loader: 'isparta',
          }
        ],
      },
      resolve: {
        extensions: ['.ts', '.js', '']
      },
      node: {
        fs: 'empty'
      }
    },
    webpackMiddleware: {
      noInfo: true,
    },
*/
/*
    typescriptPreprocessor: {
      options: {
        module: 'commonjs',// 'amd'
        target: 'ES5',
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
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true,
  });
};
