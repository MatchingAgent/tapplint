module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true
  },
  parser: 'babel-eslint',
  rules: {
    // Best Practices
    curly: ['error', 'all'],
    'no-multi-spaces': ['error'],
    // Stylistic Issues
    indent: ['error', 2],
    semi: ['error', 'always']
  }
};
