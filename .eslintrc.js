module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'import/no-named-as-default': 0,
    'react/destructuring-assignment': 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [0],
    'react/prop-types': 0,
    'import/extensions': 'off',
    'class-methods-use-this': 0,
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/control-has-associated-label': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
