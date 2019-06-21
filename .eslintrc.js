module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  "rules": {
    "no-console":0,
    "func-names":0,
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': "^_",
        'varsIgnorePattern': "^_",
      }
    ],

  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  "plugins": [
    "react"
  ],
   "extends": ["semistandard", "standard-jsx", "eslint:recommended", "plugin:react/recommended"]
};




