module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true
  },
  parser: 'babel-eslint',
  rules: Object.assign(
    {},
    require('./best-practices'),
    require('./stylistic-issues')
  )
};
