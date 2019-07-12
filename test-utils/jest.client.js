module.exports = {
  ...require('./jest.common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/server/'],
  automock: false,
  setupFilesAfterEnv: [require.resolve('./setupTests.ts')]
};
