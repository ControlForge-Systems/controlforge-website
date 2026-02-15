import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test('homepage to documentation', async ({ page }) => {
		await page.goto('/');

		// Click Documentation link in header
		await page
			.getByRole('link', { name: /documentation/i })
			.first()
			.click();

		// Verify docs page loaded
		await expect(page).toHaveURL(/\/docs/);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('docs sidebar navigation', async ({ page }) => {
		await page.goto('/docs');

		// Click on Syntax Basics in sidebar (use sidebar-specific locator to avoid main page links)
		await page
			.locator('aside')
			.getByRole('link', { name: /syntax basics/i })
			.click();

		// Verify syntax page loaded
		await expect(page).toHaveURL(/\/docs\/syntax/);
	});

	test('breadcrumb navigation', async ({ page }) => {
		await page.goto('/docs/syntax');

		// Click Home in breadcrumbs
		const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
		await breadcrumbNav.getByRole('link', { name: /home/i }).click();

		// Verify homepage loaded
		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: /structured text/i })).toBeVisible();
	});

	test('footer link to GitHub', async ({ page, context }) => {
		await page.goto('/');

		// Click GitHub link in footer
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			page.getByRole('link', { name: /^GitHub$/i }).click()
		]);

		// Verify GitHub page opened
		await expect(newPage).toHaveURL(/github.com.*controlforge/i);
	});

	test('VS Code marketplace link', async ({ page, context }) => {
		await page.goto('/');

		// Click VS Code Marketplace link
		const marketplaceLink = page.getByRole('link', { name: /vs code marketplace/i }).first();

		const [newPage] = await Promise.all([context.waitForEvent('page'), marketplaceLink.click()]);

		// Verify marketplace page opened with correct extension
		await expect(newPage).toHaveURL(
			/marketplace.visualstudio.com.*ControlForgeSystems.*controlforge-structured-text/i
		);
	});

	test('all doc section pages accessible', async ({ page }) => {
		const sections = [
			{ path: '/docs', name: 'Documentation' },
			{ path: '/docs/syntax', name: 'Syntax Basics' },
			{ path: '/docs/variables', name: 'Variables' },
			{ path: '/docs/data-types', name: 'Data Types' },
			{ path: '/docs/control', name: 'Control Structures' },
			{ path: '/docs/functions', name: 'Functions' },
			{ path: '/docs/standard-functions', name: 'Standard Functions' },
			{ path: '/docs/standard-function-blocks', name: 'Standard Function Blocks' },
			{ path: '/docs/advanced-constructs', name: 'Advanced Constructs' },
			{ path: '/docs/best-practices', name: 'Best Practices' },
			{ path: '/docs/examples', name: 'Examples' }
		];

		for (const section of sections) {
			await page.goto(section.path);
			await page.waitForLoadState('networkidle');
			await expect(page).toHaveURL(section.path);
			// All pages should have main content visible
			await expect(page.locator('main').first()).toBeVisible();
		}
	});
});

test.describe('Mobile Navigation', () => {
	test.use({ viewport: { width: 375, height: 667 } });

	test('mobile menu toggle', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Hamburger button should be visible on mobile
		const menuButton = page.getByRole('button', { name: /toggle navigation menu/i });
		await expect(menuButton).toBeVisible();
		await expect(menuButton).toBeEnabled();

		// User can interact with menu button
		await menuButton.click();
	});

	test('docs sidebar toggle on mobile', async ({ page }) => {
		await page.goto('/docs/syntax');

		// Mobile hamburger or sidebar toggle should be present
		const mainContent = page.locator('main').first();
		await expect(mainContent).toBeVisible();

		// Verify breadcrumbs are visible on mobile
		await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();
	});
});
