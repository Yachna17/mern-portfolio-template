module.exports = {
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
}
