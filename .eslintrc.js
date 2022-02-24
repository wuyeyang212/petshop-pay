module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    env: {
        browser: true,
        es6: true
    },
    globals: {
        process: 'readonly'
    },
    extends: [
        'plugin:vue/vue3-essential'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src'],
                ],
                extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
            },
        },
    },
    // add your custom rules here
    rules: {
        'no-console': 'off',
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'no-new': ['off'],
        // camelcase: ['warn', {
        //     properties: 'never'
        // }],
        camelcase: 'off',
        'brace-style': ['error', 'stroustrup'],
        'keyword-spacing': ['error', {
            before: true,
            after: true
        }],
        'arrow-spacing': ['error', {
            before: true,
            after: true
        }],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'semi-spacing': ['error', {
            before: false,
            after: true
        }],
        'spaced-comment': ['warn', 'always', {
            line: {
                markers: ['/'],
                exceptions: ['-', '+']
            },
            block: {
                markers: ['!', '*!'],
                exceptions: ['*'],
                balanced: true
            }
        }],
        'no-unused-vars': ['error', {
            args: 'none',
            varsIgnorePattern: '[_e]'
        }],
        'newline-per-chained-call': ['error', {
            ignoreChainWithDepth: 4
        }],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/attributes-order': 'off',
        'vue/no-unused-components': 'off',
        'vue/no-side-effects-in-computed-properties': 'off',
        'vue/singleline-html-element-content-newline': 'off'
    }
};
