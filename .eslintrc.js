module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
		'airbnb',
		'prettier',
		'prettier/react'
	],
	parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
		'react',
		'prettier',
		'react-hooks'
  ],
  rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [
			'warn',
			{ extensions: ['.jsx', '.js'] }
		],
		"import/no-unresolved": [
      2, 
      { "caseSensitive": false }
   	],
		'import/prefer-default-export': 'off',
		'react/static-property-placement': 'off',
		'jsx-a11y/control-has-associated-label': 'off',
		'no-console': ["error", { allow: ["tron"]}],
		'no-param-reassign': 'off'
	}
};
