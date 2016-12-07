'use strict';

const globby = require('globby');
const eslint = require('eslint');
const config = require('./config');

exports.lintText = (text, options) => {
  const engine = new eslint.CLIEngine(config);
  const fileName = options.fileName;
  return engine.executeOnText(text, fileName);
};

exports.lintFiles = (args, options) => {
  const engine = new eslint.CLIEngine(config);
  const paths = args.length ? args : '**/*';

  return globby(paths).then(paths => engine.executeOnFiles(paths, options));
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
