function bdd (mocha, opts) {
  // this is a UI "API" object which gives us convenience functions to build a
  // UI.
  const ui = mocha.createUI({
    recursive: true
  });

  // the context of these functions is the API object itself, though
  // they appear on the `mocha` object.  this allows each ui object to have
  // its own sandbox. the `mocha` object can be access via `this.delegate` or
  // simply from `mocha` in the closure.
  ui.decorate({
    'describe': function describe (title, func) {
      return ui.createSuite({
        title,
        func
      });
    },
    'describe.skip': function describeSkip (title, func) {
      return ui.createSuite({title, func}, {skip: true});
    },
    'describe.only': function describeOnly () {

    },
    'it': function it (title, func) {
      return ui.createTest({
        title,
        func
      });
    },
    'it.only': function itOnly (title, func) {
      return ui.createTest({
        title,
        func
      }, {only: true});
    },
    'it.skip': function itSkip (title) {
      return ui.createTest({title});
    },
    'it.retries': function itRetries (num) {
      return ui.retries(num);
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
