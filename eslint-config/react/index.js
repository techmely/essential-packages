module.exports = {
  extends: [
    '@techmely/eslint-ts',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
  ],
  settings: {
    react: {
      version: '17.0.2',
    },
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: [
              'is',
              'should',
              'has',
              'can',
              'did',
              'will',
              // bcs model backend contain this key --> ignore this
              'registeredSmartOtp',
            ],
          },
          // Normally just accept only camelCase functions, but with a function return a TSX --> maybe PascalCase (23.8)
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything 'type like', including interfaces, type aliases, and enums
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};
