'use strict';

const globby = require('globby');
const eslint = require('eslint');
const config = require('./config');
const option = require('./option');

exports.lintText = (text, argv) => {
  const engine = new eslint.CLIEngine(config);
  const options = option.normalize(argv);

  return engine.executeOnText(text, options.fileName);
};

exports.lintFiles = (args, argv) => {
  const engine = new eslint.CLIEngine(config);
  const paths = args.length ? args : '**/*.js';
  const options = option.normalize(argv);

  return globby(paths, {
    ignore: options.ignore
  }).then(paths => engine.executeOnFiles(paths, options));
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
