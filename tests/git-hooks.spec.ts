import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Git Hooks', () => {
	test('pre-commit hook exists and is executable', async () => {
		const preCommitPath = path.join(process.cwd(), '.husky', 'pre-commit');

		// Check file exists
		expect(fs.existsSync(preCommitPath)).toBeTruthy();

		// Check file is executable (on Unix-like systems)
		if (process.platform !== 'win32') {
			const stats = fs.statSync(preCommitPath);
			const isExecutable = !!(stats.mode & fs.constants.S_IXUSR);
			expect(isExecutable).toBeTruthy();
		}

		// Check content includes lint-staged
		const content = fs.readFileSync(preCommitPath, 'utf-8');
		expect(content).toContain('lint-staged');
	});

	test('pre-push hook exists and is executable', async () => {
		const prePushPath = path.join(process.cwd(), '.husky', 'pre-push');

		// Check file exists
		expect(fs.existsSync(prePushPath)).toBeTruthy();

		// Check file is executable (on Unix-like systems)
		if (process.platform !== 'win32') {
			const stats = fs.statSync(prePushPath);
			const isExecutable = !!(stats.mode & fs.constants.S_IXUSR);
			expect(isExecutable).toBeTruthy();
		}

		// Check content includes type-check and build
		const content = fs.readFileSync(prePushPath, 'utf-8');
		expect(content).toContain('check');
		expect(content).toContain('build');
	});

	test('lint-staged configuration exists in package.json', async () => {
		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

		// Check lint-staged config exists
		expect(packageJson['lint-staged']).toBeDefined();

		// Check it has TypeScript/Svelte config
		const lintStaged = packageJson['lint-staged'];
		expect(lintStaged['*.{ts,svelte}']).toBeDefined();
		expect(lintStaged['*.{ts,svelte}']).toContain('eslint --fix');
		expect(lintStaged['*.{ts,svelte}']).toContain('prettier --write');

		// Check it has general file config
		expect(lintStaged['*.{js,json,md,css}']).toBeDefined();
		expect(lintStaged['*.{js,json,md,css}']).toContain('prettier --write');
	});

	test('prepare script exists in package.json', async () => {
		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

		// Check prepare script exists and calls husky
		expect(packageJson.scripts.prepare).toBe('husky');
	});

	test('husky is installed as devDependency', async () => {
		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

		expect(packageJson.devDependencies.husky).toBeDefined();
		expect(packageJson.devDependencies['lint-staged']).toBeDefined();
	});
});
