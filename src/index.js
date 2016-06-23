function bdd (mocha, opts) {
  // this is a UI "API" object which gives us convenience functions to build a
  // UI.
  const ui = mocha.createUI({
    recursive: true
  });

  /**
   * This is a holdover from Mocha 2.x's behavior, which was global.
   * In this version, the UI will have discretion over what an "async"
   * test looks like.
   * Note that *by default*, tests are considered async by the core engine.
   * If the function has a positive "length"--that is, an arity >= 1,
   * then it's considered "asynchronous".  In practice, if you pass a parameter
   * to your test function, (e.g., `done`), then it will mark the test
   * as using a callback.  This doesn't actually imply that the test is
   * asynchronous; just that it needs to use a node-style callback to complete.
   * @param {Function} [func]
   * @returns {boolean}
   */
  function hasCallback (func) {
    return Boolean(func && func.length);
  }

  // the context of these functions is the API object itself, though
  // they appear on the `mocha` object.  this allows each ui object to have
  // its own sandbox. the `mocha` object can be access via `this.delegate` or
  // simply from `mocha` in the closure.
  ui.decorate({
    'describe': function describe (title, func) {
      return ui.createSuite({
        title,
        func,
        hasCallback: hasCallback(func)
      });
    },
    'describe.skip': function describeSkip (title, func) {
      return ui.createSuite({
        title,
        func,
        hasCallback: hasCallback(func),
        exclude: true
      });
    },
    'describe.only': function describeOnly (title, func) {
      return ui.createSuite({
        title,
        hasCallback: hasCallback(func),
        include: true
      });
    },
    'it': function it (title, func) {
      return ui.createTest({
        title,
        func,
        hasCallback: hasCallback(func)
      });
    },
    'it.skip': function itSkip (title, func) {
      return ui.createTest({
        title,
        func,
        hasCallback: hasCallback(func),
        exclude: true
      });
    },
    'it.only': function itOnly (title, func) {
      return ui.createTest({
        title,
        func,
        hasCallback: hasCallback(func),
        include: true
    'it.skip': function itSkip (title) {
      });
    },
    'it.retries': function itRetries (num) {
      return ui.retries(num);
    },
    'before': function before (func) {
      return ui.beforeTests({
        func,
        hasCallback: hasCallback(func)
      });
    },
    'beforeEach': function beforeEach (func) {
      return ui.beforeEachTest({
        func,
        hasCallback: hasCallback(func)
      });
    }
  })
    .alias('describe', 'context')
    .alias('describe.skip', 'xdescribe')
    .alias('describe.skip', 'xcontext')
    .alias('it.skip', 'xit')
    .alias('it.skip', 'xspecify')
    .alias('it', 'specify');
}

bdd.attributes = {
  name: 'bdd'
};

export default bdd;
