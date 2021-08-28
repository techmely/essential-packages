module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-typescript/base'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // TS
    'no-useless-constructor': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
    '@typescript-eslint/type-annotation-spacing': ['error', {}],
    '@typescript-eslint/no-var-requires': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, { args: 'none', ignoreRestSiblings: true }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    // off
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
}
