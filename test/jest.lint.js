module.exports = {
  ...require('./jest.common'),
  testMatch: ['<rootDir>/**/*.(js|ts|vue)'],
  displayName: 'lint',
  runner: 'jest-runner-eslint',
};
