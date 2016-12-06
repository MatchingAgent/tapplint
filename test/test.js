const test = require('ava');
const pify = require('pify');
const fsP = pify(require('fs'));
const lint = require('..');

test('lintText', async t => {
  const fileName = `${__dirname}/fixtures/lintText.js`;
  const buffer = await fsP.readFile(fileName);
  const report = await lint.lintText(buffer, fileName);

  t.is(report.results.length, 1);
});

test('lintFiles', async t => {
  const report = await lint.lintFiles([`${__dirname}/fixtures/*.js`], {});

  t.is(report.results.length, 1);
});
