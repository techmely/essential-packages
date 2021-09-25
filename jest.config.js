module.exports = {
  globals: {
    __DEV__: true,
    __TEST__: true,
    __BROWSER__: false,
    __GLOBAL__: false,
    __ESM_BUNDLER__: true,
    __ESM_BROWSER__: false,
    __NODE_JS__: true,
    __SSR__: true,
  },
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['<rootDir>/packages/**/test/**/*.test.(ts|tsx)'],
};
