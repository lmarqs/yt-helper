module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: [
    "eslint:all",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
  ],
  rules: {
    "array-bracket-newline": ["error", "consistent"],
    "array-element-newline": ["error", "consistent"],
    "capitalized-comments": "off",
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "function-call-argument-newline": ["error", "consistent"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", 120],
    "multiline-comment-style": "off",
    "no-magic-numbers": "off",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
    "no-trailing-spaces": ["error"],
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "sort-keys": "off",
    "unicode-bom": ["error", "never"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/consistent-type-assertions": ["error", {
          assertionStyle: "angle-bracket",
          objectLiteralTypeAssertions: "never",
        }],
        // "@typescript/explicit-function-return-type": ["error", {
        //   allowExpressions: true,
        //   allowTypedFunctionExpressions: true,
        //   allowHigherOrderFunctions: true,
        //   allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        // }],
        "@typescript-eslint/no-unused-vars": ["error", {
          vars: "all",
          args: "none",
          ignoreRestSiblings: false,
        }],
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "init-declarations": "off",
      },
    },
    {
      files: ["*.spec.ts"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
      ],
      rules: {
        "jest/expect-expect": ["error", {
          assertFunctionNames: ["expect", "assert*"],
        }],
      },
    },
  ],
};
