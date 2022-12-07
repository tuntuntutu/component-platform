module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb'),
  ],
  rules: {
    "react/jsx-filename-extension": 'off'
  },
  globals: {
    window: true,
  }
};
