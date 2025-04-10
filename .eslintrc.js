/** @format */

module.exports = {
	root: true,
	extends: ['@react-native', 'prettier', 'eslint:recommended'],
	env: {
		browser: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		indent: ['error', 'tab', {SwitchCase: 1}],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-empty-function': 'error',
		'max-len': ['error', {code: 80}],
		'padding-line-between-statements': [
			'error',
			{blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
		],
		'arrow-spacing': ['error', {before: true, after: true}],
		'react-native/no-inline-styles': 'error',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'react/jsx-no-undef': ['warn', {allowGlobals: true}],
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	ignorePatterns: ['node_modules'],
};
