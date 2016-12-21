#!/usr/bin/env node

const fs = require('fs');
const getStdin = require('get-stdin');
const minimist = require('minimist');
const linter = require('.');

const argv = minimist(process.argv.slice(2), {
  v: 'version',
  h: 'help'
});

if (argv.v || argv.version) {
  process.stdout.write(require('./package').version);
  return;
}

if (argv.h || argv.help) {
  fs.createReadStream(`${__dirname}/usage.txt`)
    .pipe(process.stdout)
    .on('close', () => process.exit(1));
  return;
}

function output(report, reporter) {
  const formatter = reporter ? linter.getFormatter(reporter) : require('eslint-formatter-pretty');
  process.stdout.write(formatter(report.results));
  process.exit(report.errorCount === 0 ? 0 : 1);
}

if (argv.stdin) {
  getStdin().then(text => {
    if (argv.fix) {
      const report = linter.lintText(text, argv);
      const result = report.results.shift();
      console.log(result.output);
    } else {
      output(linter.lintText(text, argv), argv.reporter);
    }
  });
} else {
  linter.lintFiles(argv._, argv).then(report => {
    if (argv.fix) {
      linter.outputFixes(report);
    }

    output(report, argv.reporter);
  });
}
