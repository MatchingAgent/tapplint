'use strict';

const globby = require('globby');
const eslint = require('eslint');
const config = require('./config');

function normalize(options) {
  return Object.assign({
    ignore: [
      '**/node_modules/**',
      '**/bower_components/**',
      'coverage/**',
      '{tmp,temp}/**',
      '**/*.min.js',
      '**/bundle.js',
      '{test,tests,spec,__tests__}/fixture{s,}/**',
      'vendor/**',
      'dist/**'
    ]
  }, options);
}

exports.lintText = (text, argv) => {
  const engine = new eslint.CLIEngine(config);
  const options = normalize(argv);

  return engine.executeOnText(text, options.fileName);
};

exports.lintFiles = (args, argv) => {
  const engine = new eslint.CLIEngine(config);
  const paths = args.length ? args : '**/*';
  const options = normalize(argv);

  return globby(paths, {
    ignore: options.ignore
  }).then(paths => engine.executeOnFiles(paths, options));
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
