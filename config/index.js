'use strict';

const rules = Object.assign(
  {},
  require('./possible-errors'),
  require('./best-practices'),
  require('./strict-mode'),
  require('./variables'),
  require('./nodejs-and-commonjs'),
  require('./stylistic-issues'),
  require('./react')
);

module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true
  },
  parser: 'babel-eslint',
  plugins: [
    'import',
    'react'
  ],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: rules
};
