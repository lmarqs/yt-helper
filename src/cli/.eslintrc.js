const path = require("path");

module.exports = {
  env: {
    jest: true,
  },
  parserOptions: {
    project: path.resolve(__dirname, "tsconfig.json"),
  },
  rules: {
    "no-console": "off",
  },
};
