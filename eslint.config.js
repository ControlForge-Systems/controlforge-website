import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,ts,mjs,cjs}'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'no-unused-vars': 'off',
			'no-useless-escape': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017
			}
		},
		plugins: {
			svelte: sveltePlugin
		},
		rules: {
			...sveltePlugin.configs.recommended.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-useless-escape': 'off'
		}
	},
	{
		ignores: [
			'node_modules/',
			'build/',
			'.svelte-kit/',
			'dist/',
			'**/*.cjs',
			'src/lib/build-info.ts',
			'src/lib/components/*Schema.svelte'
		]
	}
];
