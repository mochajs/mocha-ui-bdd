'use strict';

const bdd = require('../../src');
const Mocha = require('mocha3').Mocha;

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
