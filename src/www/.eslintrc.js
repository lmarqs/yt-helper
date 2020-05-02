const path = require("path");

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    "react-app",
    "plugin:react/all",
  ],
  parserOptions: {
    project: path.resolve(__dirname, "tsconfig.json"),
  },
  rules: {
    "react/function-component-definition": ["error", { "namedComponents": "arrow-function", "unnamedComponents": "arrow-function" }],
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-indent": ["error", 2, { checkAttributes: true, indentLogicalExpressions: true }],
    "react/jsx-max-depth": ["error", { "max": 5 }],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "multiline" }],
    "react/jsx-no-literals": "off",
    "react/no-multi-comp": ["error", { "ignoreStateless": true }],
    "react/prop-types": "off",
    "react/require-optimization": "off",
    "react/state-in-constructor": ["error", "never"],
  },
}
