'use strict';

const defaultOptions = {
  ignore: []
};

exports.normalize = (argv) => {
  const options = Object.assign(defaultOptions, argv);

  if (!Array.isArray(options.ignore)) {
    options.ignore = [options.ignore];
  }

  options.ignore = options.ignore.concat([
    '**/node_modules/**',
    '**/bower_components/**',
    'coverage/**',
    '{tmp,temp}/**',
    '**/*.min.js',
    '**/bundle.js',
    '{test,tests,spec,__tests__}/fixture{s,}/**',
    'vendor/**',
    'dist/**'
  ]);

  return options;
};
