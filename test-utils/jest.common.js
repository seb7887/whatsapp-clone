const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  watchPlugins: ['jest-watch-select-projects']
};
