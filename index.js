'use strict';

const merge = require('lodash.merge');
const globby = require('globby');
const eslint = require('eslint');
const config = require('eslint-config-tapplint');
const option = require('./option');

exports.lintText = (text, argv) => {
  const mergedConfig = merge(config, argv.config);
  const engine = new eslint.CLIEngine(mergedConfig);
  const options = option.normalize(argv);

  return engine.executeOnText(text, options.fileName);
};

exports.lintFiles = (args, argv) => {
  const mergedConfig = merge(config, argv.config);
  const engine = new eslint.CLIEngine(mergedConfig);
  const paths = args.length ? args : '**/*.js';
  const options = option.normalize(argv);

  return globby(paths, {
    ignore: options.ignore
  }).then(paths => engine.executeOnFiles(paths, options));
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
