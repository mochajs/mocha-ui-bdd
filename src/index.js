function bdd (mocha, opts) {
  const ui = mocha.createUI();
  ui.decorate({
    describe (title, func) {
      return ui.createSuite({
        title,
        func
      });
    },
    it (title, func) {
      return ui.createTest({
        title,
        func
      });
    }
  });
}

bdd.attributes = {
  name: 'bdd'
};

export default bdd;
