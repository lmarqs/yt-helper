const path = require("path");

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    "react-app",
  ],
  parserOptions: {
    project: path.resolve(__dirname, "tsconfig.json"),
  },
}
