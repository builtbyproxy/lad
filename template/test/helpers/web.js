const TestServer = require('fetch-test-server');
const web = require('../../web');

const beforeEach = t => {
  t.context.web = new TestServer(web.app.callback());
};

const afterEach = () => {};

module.exports = {
  beforeEach,
  afterEach
};
