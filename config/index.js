'use strict';

const rules = Object.assign(
  {},
  require('./possible-errors'),
  require('./best-practices'),
  require('./strict-mode'),
  require('./variables'),
  require('./nodejs-and-commonjs'),
  require('./stylistic-issues')
);

module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true
  },
  parser: 'babel-eslint',
  rules: rules
};
