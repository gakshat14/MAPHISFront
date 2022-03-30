/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier',
    ],
    env: {
        'vue/setup-compiler-macros': true,
    },
    rules: {
        'prettier/prettier': [
            'warn',
            {
                semi: true,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 120,
                tabWidth: 4,
                spaces: 4,
                arrowParens: 'always',
            },
        ],
    },
};
