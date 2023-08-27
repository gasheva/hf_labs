module.exports = {
    "root": true,
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended', // This option imposes formatting rules on your code to improve readability
        '@vue/typescript/recommended',
    ],
    rules: {
        "vue/no-multiple-template-root": "off"
    },
    plugins: ["@typescript-eslint"],
}