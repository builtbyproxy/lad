const TestServer = require('fetch-test-server');
const api = require('../../api');

const beforeEach = t => {
  t.context.api = new TestServer(api.app);
};

const afterEach = () => {};

module.exports = {
  beforeEach,
  afterEach
};
