'use strict';

const path = require('path');
const test = require('ava');
const pify = require('pify');
const fsP = pify(require('fs'));
const eslint = require('eslint');
const lint = require('..');

test('Validate config', t => {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: path.resolve(__dirname, '../config/index.js')
  });

  const code = 'let foo = 1;\nconst bar = function () {};\nbar(foo);\n';

  t.is(cli.executeOnText(code).errorCount, 0);
});

test('tapplint.lintText', async t => {
  const fileName = `${__dirname}/fixtures/lint-text.js`;
  const buffer = await fsP.readFile(fileName);
  const report = await lint.lintText(buffer, { fileName });

  t.is(report.results.length, 1);
});

test('tapplint.lintFiles', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/*.js`], {});

  t.is(report.results.length, 8);
});

test('Possible Errors', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/possible-errors.js`], {});

  t.is(report.results[0].messages.length, 0);
});

test('Best Practices', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/best-practices.js`], {});

  t.is(report.results[0].messages.length, 3);
});

test('Strict Mode', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/strict-mode.js`], {});

  t.is(report.results[0].messages.length, 0);
});

test('Variables', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/variables.js`], {});

  t.is(report.results[0].messages.length, 0);
});

test('Node.js and CommonJS', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/nodejs-and-commonjs.js`], {});

  t.is(report.results[0].messages.length, 0);
});

test('Stylistic Issues', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/stylistic-issues.js`], {});

  t.is(report.results[0].messages.length, 4);
});

test('Rules for React plugin', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/react/index.js`], {});

  t.is(report.results[0].messages.length, 3);
});

test('Extend default rules', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/misc/extend.js`], {
    config: {
      rules: {
        'no-underscore-dangle': ['error', {
          allow: ['_id']
        }]
      }
    }
  });

  t.is(report.results[0].messages.length, 1);
});
