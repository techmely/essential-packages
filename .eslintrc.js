module.exports = {
  extends: ['@techmely/eslint-config-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser',
    project: ['tsconfig.json'],
    ecmaFeatures: {
      modules: true,
    },
  },
};
