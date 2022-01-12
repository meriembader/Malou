module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0, 
    allowNamedFunctions: false,
    allowUnboundThis: true,
    'generators': 'always' | 'as-needed' | 'never'
  },
};
