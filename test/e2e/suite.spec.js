import bdd from '../../src';
import Mocha from 'mocha-core';

describe('bdd/suite', () => {
  let mocha;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create('bdd/suite');
    mocha = Mocha({
      ui: bdd
    });
  });

  describe('describe()', () => {
    it('should be exposed on the "mocha" object', () => {
      expect(mocha.describe)
        .to
        .be
        .a('function');
    });

    it('should return a suite', () => {
      expect(mocha.describe())
        .to
        .be
        .an('object')
        .and
        .have
        .property('context');
    });

    describe('when called w/o a function', () => {
      it('the returned suite should be "pending"', () => {
        expect(mocha.describe())
          .to
          .have
          .property('pending', true);
      });
    });

    describe('when called with a function', () => {
      it('should not return a "pending" Suite', () => {
        expect(mocha.describe('foo', () => {
        }))
          .to
          .have
          .property('pending', false);
      });

      describe('and when the Suite function is successful', () => {
        let spy;

        beforeEach(() => {
          spy = sandbox.spy();
        });

        describe('and is synchronous', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', () => {
              spy();
            });
          });

          it('should have a "passed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', false);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });

        describe('and uses an async callback', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', done => {
              setTimeout(() => {
                spy();
                done();
              });
            });
          });

          it('should have a "passed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', false);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });

        describe('and returns a Promise', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', () => {
              return new Promise(resolve => {
                spy();
                resolve();
              });
            });
          });

          it('should have a "passed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', false);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });

      describe('and when the Suite function is unsuccessful', () => {
        let spy;

        beforeEach(() => {
          spy = sandbox.spy();
        });

        describe('and is synchronous', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', () => {
              spy();
              throw new Error();
            });
          });

          it('should have a "failed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', true);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });

        describe('and uses an async callback', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', () => {
              setTimeout(() => {
                spy();
                throw new Error();
              });
            });
          });

          it('should have a "failed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', true);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });

        describe('and returns a Promise', () => {
          let suite;

          beforeEach(() => {
            suite = mocha.describe('foo', () => {
              return new Promise((resolve, reject) => {
                spy();
                reject();
              });
            });
          });

          it('should have a "failed" result', done => {
            suite.on('did-run', suite => {
              try {
                expect(suite)
                  .to
                  .have
                  .deep
                  .property('result.failed', true);
                done();
              } catch (e) {
                done(e);
              }
            });
          });

          it('should have executed', done => {
            suite.on('did-run', () => {
              try {
                expect(spy).to.have.been.calledOnce;
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
    });

    describe('when nesting Suites', () => {
      let spy;

      beforeEach(() => {
        spy = sandbox.spy();
      });

      it('should execute all Suites', done => {
        mocha.describe('foo', () => {
          mocha.describe('bar', () => {
            mocha.describe('baz', () => {
              try {
                expect(spy).to.have.been.calledTwice;
                done();
              } catch (e) {
                done();
              }
            });
            spy();
          });
          spy();
        });
      });

      it('should execute all Suites in a depth-first fashion', done => {
        const results = [];

        function takeResult (suite) {
          results.push(suite.title);
          if (results.length === 3) {
            try {
              expect(results)
                .to
                .eql([
                  'baz',
                  'bar',
                  'foo'
                ]);
              done();
            } catch (e) {
              done(e);
            }
          }
        }

        mocha.describe('foo', () => {
          mocha.describe('bar', () => {
            mocha.describe('baz', () => {
            })
              .on('did-run', takeResult);
          })
            .on('did-run', takeResult);
        })
          .on('did-run', takeResult);
      });
    });

    describe('alias', () => {
      beforeEach(() => {
        sandbox.spy(mocha, 'describe');
      });

      it('should have an alias of "context"', () => {
        mocha.context(() => {
        });
        expect(mocha.describe).to.have.been.calledOnce;
      });
    });
  });

  describe('describe.skip()', () => {
    describe('when called with a function', () => {
      it('should not be executed', done => {
        const spy = sandbox.spy();
        mocha.describe.skip(spy)
          .on('skipped', () => {
            try {
              expect(spy).not.to.have.been.called;
              done();
            } catch (e) {
              done(e);
            }
          });
      });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
