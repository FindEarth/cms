module.exports = {
  root         : true,
  parser       : 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js' : 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'no-multi-spaces'                  : 0,
    'no-underscore-dangle'             : [0],
    'consistent-return'                : 0,
    'no-unused-expressions'            : [2, { allowShortCircuit: true }],
    'no-param-reassign'                : 0,
    'func-names'                       : 0,
    'space-before-function-paren'      : [2, 'never'],
    'comma-dangle'                     : [2, 'never'],
    'no-shadow'                        : 0,
    'guard-for-in'                     : 0,
    'no-restricted-syntax'             : [2, 'WithStatement'],
    'newline-per-chained-call'         : [2, { ignoreChainWithDepth: 5 }],
    'space-in-parens'                  : 0,
    'key-spacing'                      : 0,
    'no-unused-vars'                   : [2, { vars: 'all', args: 'none' }],
    'max-len'                          : 1,
    'padded-blocks'                    : 0,
    'no-console'                       : 0,
    'no-continue'                      : 0,
    'no-extra-boolean-cast'            : 0,
    'import/no-extraneous-dependencies': 0,
    'import/newline-after-import'      : 0,
    'no-mixed-operators'               : 0,
    'import/no-unresolved'             : 0,
    'import/extensions'                : 0,
    'no-prototype-builtins'            : 0,
    'new-cap'                          : 0
  },
  globals: {
    location      : true,
    navigator     : true,
    window        : true,
    document      : true,
    FileReader    : true,
    sessionStorage: true,
    localStorage  : true
  }
}
