'use strict';

function bdd(mocha, opts) {
  const ui = mocha.createUI();
  mocha.expose('describe', ui.createSuite);
}

bdd.attributes = {
  name: 'bdd'
};

module.exports = bdd;
