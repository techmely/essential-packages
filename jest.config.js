module.exports = {
  globals: {
    __DEV__: false,
    __TEST__: true,
  },
  rootDir: './',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
};
