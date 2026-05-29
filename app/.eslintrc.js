// ESLint configuration for the Network Infrastructure Trainer app.
// Uses the expo preset (covers React Native + TypeScript) and layers prettier
// on top so format issues surface as lint warnings.
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['expo', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/', '.expo/', 'dist/', 'coverage/'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
