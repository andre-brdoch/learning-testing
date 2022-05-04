const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleFileExtensions: ['js', 'vue', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  watchPlugins: ['jest-watch-select-projects', 'jest-watch-typeahead/filename'],
};
