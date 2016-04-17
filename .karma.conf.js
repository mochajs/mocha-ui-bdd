'use strict';

module.exports = function (config) {
  config.set({
    frameworks: [
      'source-map-support',
      'browserify',
      'mocha'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      './src/**/*.js',
      './test/**/*.js'
    ],
    preprocessors: {
      './src/**/*.js': ['browserify'],
      './test/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            sourceMapRelative: __dirname
          }
        ]
      ]
    },
    reporters: [
      'mocha-clean'
    ],
    mochaReporter: {
      output: 'autowatch'
    },
    logLevel: 'WARN',
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
