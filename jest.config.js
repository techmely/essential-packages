module.exports = {
  globals: {
    __DEV__: false,
    __TEST__: true,
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  rootDir: '.',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
