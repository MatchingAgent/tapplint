const getStdin = require('get-stdin');
const minimist = require('minimist');
const linter = require('.');

const argv = minimist(process.argv.slice(2), {
  v: 'version'
});

if (argv.v) {
  process.stdout.write(require('./package').version);
  return;
}

if (argv._.length) {
  linter.lintFiles(argv._, argv).then(report => {
    if (argv.fix) {
      linter.outputFixes(report);
    }

    output(report);
  });
} else {
  getStdin().then(text => {
    if (argv.fix) {
      const report = linter.lintText(text, argv);
      const result = report.results.shift();
      console.log(result.output);
    } else {
      output(linter.lintText(text, argv));
    }
  });
}

function output(report) {
  const reporter = argv.reporter ? linter.getFormatter(argv.reporter) : require('eslint-formatter-pretty');
  process.stdout.write(reporter(report.results));
  process.exit(report.errorCount === 0 ? 0 : 1);
}
