module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": false,
      "ignoreWhenEmpty": true,
      "externalIgnores": []
    }],
    "vue/multiline-html-element-content-newline": ["error", {
      "ignoreWhenEmpty": true,
      "allowEmptyLines": false
    }]
  }
}
