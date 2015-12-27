'use strict';

const bdd = require('../../src');
const Mocha = require('mocha3/src/mocha');

describe(`bdd`, () => {
  let mocha;

  beforeEach(() => {
    mocha = Mocha({
      ui: bdd
    });
  });

  it(`should expose "describe" on the Mocha object`, () => {
    expect(mocha.describe)
      .to
      .be
      .a('function');
  });
});
