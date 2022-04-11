module.exports = {
  env: {
    node: true,
    browser: false,
    es2021: true,
    mocha: true,
  },
  // @TODO: Debug plugin '@meteorjs/eslint-config-meteor',
  extends: ['eslint:recommended', 'plugin:import/recommended', 'react-app'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  globals: {
    Meteor: true,
    document: true,
    navigator: true,
  },
  settings: {
    'import/resolver': 'meteor',
  },
  rules: {
    /* ******************************* FORMATTING ******************************* */

    indent: 0,
    'linebreak-style': ['error', 'unix'],
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'max-len': ['warn', { code: 120 }],
    'object-curly-spacing': 0,

    /* ******************************* JAVASCRIPT ******************************* */
    camelcase: 'warn',
    'arrow-parens': ['warn', 'always'],
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'warn',
    'no-unused-vars': 'warn',
    'class-methods-use-this': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'no-shadow': 'warn',
    'no-empty': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',

    /* ****************************** DEPENDENCIES ****************************** */

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    // Don't lint markdown and MDX files for the mentionned rules
    {
      files: ['*.mdx'],
      rules: {
        semi: 0,
      },
    },
    // Tolerate non-camelcase variable naming for these files
    // Tolerate i18n hook as default named import
    {
      files: ['./localization/i18n.js'],
      rules: {
        camelcase: 0,
        'import/no-named-as-default-member': 0,
      },
    },
  ],
};
