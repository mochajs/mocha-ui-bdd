'use strict';

/* eslint import/no-require:0 */
const fs = require('fs');
const path = require('path');
const mochaCoreBabelRc = JSON.parse(fs.readFileSync(path.join(__dirname,
  'node_modules',
  'mocha-core',
  '.babelrc'), 'utf-8'));
delete mochaCoreBabelRc.env.development.plugins;

module.exports = function wallabyConfig (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'test/fixture.js',
      'package.json',
      'node_modules/mocha-core/src/**/*.js',
      'node_modules/mocha-core/package.json',
      {
        pattern: 'lib/**/*.js',
        instrument: false
      }
    ],
    tests: [
      'test/**/*.spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: `NODE_PATH=${__dirname}/node_modules:${__dirname}/node_modules/mocha-core/node_modules`
      }
    },
    compilers: {
      'src/**/*.js': wallaby.compilers.babel(),
      'test/**/*.js': wallaby.compilers.babel(),
      'node_modules/mocha-core/src/**/*.js': wallaby.compilers.babel(
        mochaCoreBabelRc)
    },
    testFramework: 'mocha',
    bootstrap: wallaby => {
      require(require('path').join(wallaby.projectCacheDir, 'test', 'fixture'));
    },
    debug: true
  };
};
