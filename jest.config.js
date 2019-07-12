module.exports = {
  ...require('./test-utils/jest.common'),
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: [
    '**/src/**/*.tsx',
    '**/server/**/*.ts',
    '!**/server/src/types/**',
    '!**/tests/**',
    '!**/src/**/*.test.tsx',
    '!**/node_modules/**'
  ],
  projects: ['./test-utils/jest.client.js', './test-utils/jest.server.js']
};
