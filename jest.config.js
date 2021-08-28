module.exports = {
  globals: {
    __DEV__: false,
    __TEST__: true,
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
