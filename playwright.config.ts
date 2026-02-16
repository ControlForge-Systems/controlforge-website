import { defineConfig, devices } from '@playwright/test';

// Filter projects based on SKIP_WEBKIT env var for systems with missing webkit deps (e.g. Fedora)
const allProjects = [
	{
		name: 'chromium',
		use: { ...devices['Desktop Chrome'] }
	},
	{
		name: 'firefox',
		use: { ...devices['Desktop Firefox'] }
	},
	{
		name: 'webkit',
		use: { ...devices['Desktop Safari'] }
	},
	{
		name: 'mobile-chrome',
		use: { ...devices['Pixel 5'] }
	},
	{
		name: 'mobile-safari',
		use: { ...devices['iPhone 12'] }
	},
	{
		name: 'tablet',
		use: { ...devices['iPad Pro'] }
	}
];

const projects = process.env.SKIP_WEBKIT
	? allProjects.filter(
			(p) => p.name !== 'webkit' && p.name !== 'mobile-safari' && p.name !== 'tablet'
		)
	: allProjects;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	projects,
	webServer: {
		command: 'pnpm preview',
		port: 4173,
		reuseExistingServer: !process.env.CI
	}
});
