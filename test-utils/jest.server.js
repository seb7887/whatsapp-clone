module.exports = {
  ...require('./jest.common'),
  displayName: 'server',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/src']
};
