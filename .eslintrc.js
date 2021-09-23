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
  rules: {
    '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
    'class-methods-use-this': 'off',
    'unicorn/no-document-cookie': 'off',
  },
};
