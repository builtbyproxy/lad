const test = require('ava');
const mongoose = require('../helpers/mongoose');
const web = require('../helpers/web');

test.before(mongoose.before);
test.beforeEach(web.beforeEach);
test.afterEach(web.afterEach);
test.after.always(mongoose.after);

test('redirects to correct locale', async t => {
  const res = await t.context.web.fetch('/');

  t.is(res.status, 200);
  t.true(res.url.endsWith('/en'));
});

test('returns English homepage', async t => {
  const res = await t.context.web.fetch('/en', {
    headers: { Accept: 'text/html' }
  });

  t.snapshot(await res.text());
});

test('returns Spanish homepage', async t => {
  const res = await t.context.web.fetch('/es', {
    headers: { Accept: 'text/html' }
  });

  t.snapshot(await res.text());
});

test('returns English ToS', async t => {
  const res = await t.context.web.fetch('/en/terms', {
    headers: { Accept: 'text/html' }
  });

  t.snapshot(await res.text());
});

test('returns Spanish ToS', async t => {
  const res = await t.context.web.fetch('/es/terms', {
    headers: { Accept: 'text/html' }
  });

  t.snapshot(await res.text());
});
