import bdd from '../../src';
import Mocha from 'mocha-core';

describe('bdd', () => {
  let mocha;

  beforeEach(() => {
    mocha = Mocha({
      ui: bdd
    });
  });

  it('should expose "describe" on the Mocha object', () => {
    expect(mocha.describe)
      .to
      .be
      .a('function');
  });

  describe('describe()', () => {
    it('should return a suite', () => {
      expect(mocha.describe()).to.be.an('object');
    });

    describe('when called w/o a function', () => {
      it('the returned suite should be "pending"', () => {
        expect(mocha.describe().pending).to.be.true;
      });
    });

    describe('when called with a function', () => {
      it('the returned suite should not be "pending"', () => {
        expect(mocha.describe('foo', () => {}).pending).to.be.false;
      });
    });

    describe('when nesting calls', () => {
      it('should execute all suites', () => {

      });
    });
  });
});
