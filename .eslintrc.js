// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-console": 0,
    "no-cond-assign": 0,
    'no-unused-vars': 1,
    "no-extra-semi": "warn",
		"semi": "warn",
    //提醒多行空白
    'no-multiple-empty-lines':1,
    //是否在逗号前后使用一致的空格
    'comma-spacing':0,
    //强制在块之前使用一致的空格
    'space-before-blocks':0,
    //强制在 function的左括号之前使用一致的空格
    'space-before-function-paren':0,
    //强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment':0,
    //是否禁止末尾逗号
    'comma-dangle':1,
    //对象字面量的属性中键和值之间使用一致的间距
    'key-spacing':0,
    //块内填充提醒
    'padded-blocks':1,
    //末尾逗号提醒
    'comma-dangle':1
  }
}
