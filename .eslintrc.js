module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['prettier', 'import'],
  rules: {
    'linebreak-style': [2, 'windows'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'e'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { optionalDependencies: ['test/unit/index.js'] },
    ],
    'object-property-newline': 2,
    'object-curly-newline': [2, { minProperties: 2 }],
  },
};
