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

if (argv.stdin) {
  getStdin().then(text => {
    if (argv.fix) {
      const report = linter.lintText(text, argv);
      const result = report.results.shift();
      console.log(result.output);
    } else {
      output(linter.lintText(text, argv));
    }
  });
} else {
  linter.lintFiles(argv._, argv).then(report => {
    if (argv.fix) {
      linter.outputFixes(report);
    }

    output(report);
  });
}

function output(report) {
  const reporter = argv.reporter ? linter.getFormatter(argv.reporter) : require('eslint-formatter-pretty');
  process.stdout.write(reporter(report.results));
  process.exit(report.errorCount === 0 ? 0 : 1);
}
