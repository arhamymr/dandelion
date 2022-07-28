/* eslint-disable no-undef */
module.exports = {
  rules: {
    "quotes": ["error", "double"],
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};