module.exports = {
  ignorePatterns: ['.eslint.js'],
  extends: ['@techmely/eslint-config-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser',
    // Depends on your project use whatever tsconfig.json file
    project: ['tsconfig.eslint.json'],
    ecmaFeatures: {
      modules: true,
    },
  },
};
