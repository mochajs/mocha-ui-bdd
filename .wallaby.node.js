'use strict';

module.exports = function wallabyConfig (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'test/fixture.js'
    ],
    tests: [
      'test/**/*.spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    testFramework: 'mocha',
    bootstrap: function bootstrap (wallaby) {
      require(require('path')
        .join(wallaby.projectCacheDir, 'test', 'fixture'));
    },
    debug: true
  };
};
