'use strict';

const bdd = require('../../src');

describe(`bdd`, () => {
  let mocha;

  beforeEach(() => {
    mocha = require('mocha3').Mocha({
      ui: bdd
    });
  });

  it(`should expose "describe" on the Mocha object`, () => {
    return mocha.run()
      .then(() => {
        expect(mocha.describe).to.be.a('function');
      });
  });
});
