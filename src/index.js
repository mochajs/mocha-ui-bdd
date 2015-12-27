'use strict';

function bdd(mocha, opts) {
  const ui = mocha.createUI();
  ui.decorate({
    describe: ui.createSuite
  });
}

bdd.attributes = {
  name: 'bdd'
};

module.exports = bdd;
