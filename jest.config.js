const presetJest = require('./jest.preset');

module.exports = {
  ...presetJest,
  projects: [
    {
      displayName: 'Utils Package',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/utils/test/**/*.test.ts'],
    },
    {
      displayName: 'vite-plugin-runtime-env',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/vite-plugin/runtime-env/src/**/*.spec.ts'],
    },
  ],
};
