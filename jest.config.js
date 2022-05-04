module.exports = {
  ...require('./test/jest.common'),
  projects: [
    './test/jest.client.js',
    './test/jest.lint.js',
    './test/jest.format.js',
  ],
};
