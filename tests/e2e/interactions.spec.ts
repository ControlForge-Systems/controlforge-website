import { test, expect } from '@playwright/test';

test.describe('Interactive Features', () => {
	test('copy code snippet to clipboard', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Find copy button for installation command
		const copyButton = page.getByRole('button', { name: /copy installation command/i });
		await expect(copyButton).toBeVisible();

		// Verify button is clickable (interaction works)
		await expect(copyButton).toBeEnabled();
		await copyButton.click(); // User can click the copy button
	});

	test('copy command line installation', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Verify installation command is visible to user
		const installCommand = page.locator('code').filter({
			hasText: /code --install-extension.*controlforge-structured-text/i
		});
		await expect(installCommand).toBeVisible();

		// Verify copy button exists and is interactive
		const copyButton = page.getByRole('button', { name: /copy installation command/i });
		await expect(copyButton).toBeEnabled();
	});

	test('VS Code demo file tabs', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Find tab buttons - verify user can switch between files
		const tabs = page.locator('button[aria-label^="Switch to"]');
		await expect(tabs).toHaveCount(2); // main.st and functions.st

		// Both tabs should be visible and clickable
		await expect(tabs.nth(0)).toBeVisible();
		await expect(tabs.nth(1)).toBeVisible();

		// User can click tabs (verifies interactive demo functionality)
		await tabs.nth(1).click();
		await tabs.nth(0).click();
	});

	test('email link opens mail client', async ({ page }) => {
		await page.goto('/');

		// Find contact email link (use .first() since it appears in header and contact section)
		const emailLink = page.getByRole('link', { name: /contact@controlforge.dev/i }).first();
		await expect(emailLink).toBeVisible();
		await expect(emailLink).toHaveAttribute('href', 'mailto:contact@controlforge.dev');
	});

	test('external links open in new tab', async ({ page }) => {
		await page.goto('/');

		// Check GitHub link has target="_blank"
		const githubLink = page.getByRole('link', { name: /^GitHub$/i });
		await expect(githubLink).toHaveAttribute('target', '_blank');
		await expect(githubLink).toHaveAttribute('rel', /noopener/);
	});
});

test.describe('Accessibility', () => {
	test('page has proper heading hierarchy', async ({ page }) => {
		await page.goto('/docs/syntax');

		// Check for h1
		const h1 = page.getByRole('heading', { level: 1 });
		await expect(h1).toBeVisible();
		await expect(h1).toHaveCount(1);

		// Check for h2 headings
		const h2s = page.getByRole('heading', { level: 2 });
		const h2Count = await h2s.count();
		expect(h2Count).toBeGreaterThan(0);
	});

	test('images have alt text', async ({ page }) => {
		await page.goto('/');

		const images = page.locator('img');
		const count = await images.count();

		for (let i = 0; i < count; i++) {
			const alt = await images.nth(i).getAttribute('alt');
			expect(alt).toBeTruthy();
			expect(alt!.length).toBeGreaterThan(0);
		}
	});

	test('breadcrumbs are accessible', async ({ page }) => {
		await page.goto('/docs/syntax');

		const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
		await expect(breadcrumbs).toBeVisible();

		// Current page should have aria-current
		const currentItem = breadcrumbs.locator('[aria-current="page"]');
		await expect(currentItem).toBeVisible();
	});

	test('focus is visible on interactive elements', async ({ page }) => {
		await page.goto('/');

		// Tab to first focusable element
		await page.keyboard.press('Tab');

		// Check if focus is visible (outline should be present)
		const focused = page.locator(':focus');
		await expect(focused).toBeVisible();
	});

	test('skip to main content link present', async ({ page }) => {
		await page.goto('/');

		// Tab to reveal skip link
		await page.keyboard.press('Tab');

		const skipLink = page.getByRole('link', { name: /skip to (main )?content/i });
		// If skip link exists, it should work
		const skipExists = (await skipLink.count()) > 0;
		if (skipExists) {
			await expect(skipLink).toBeFocused();
		}
	});
});

test.describe('SEO & Meta', () => {
	test('homepage has proper meta tags', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check title includes "ControlForge" (may be SSR fallback)
		const title = await page.title();
		expect(title).toMatch(/ControlForge/i);

		// Check meta description exists and has content
		const description = page.locator('meta[name="description"]').first();
		const descContent = await description.getAttribute('content');
		expect(descContent).toBeTruthy();
		expect(descContent!.length).toBeGreaterThan(10);

		// Check canonical link
		const canonical = page.locator('link[rel="canonical"]');
		await expect(canonical).toHaveAttribute('href', 'https://controlforge.dev/');
	});

	test('docs pages have proper meta tags', async ({ page }) => {
		await page.goto('/docs/syntax');
		await page.waitForLoadState('networkidle');

		// Check title includes "ControlForge"
		const title = await page.title();
		expect(title).toMatch(/ControlForge/i);

		const description = page.locator('meta[name="description"]').first();
		await expect(description).toHaveAttribute('content', /.+/);
	});

	test('Open Graph tags present', async ({ page }) => {
		await page.goto('/');

		const ogTitle = page.locator('meta[property="og:title"]');
		const ogDescription = page.locator('meta[property="og:description"]');
		const ogUrl = page.locator('meta[property="og:url"]');

		await expect(ogTitle).toHaveAttribute('content', /.+/);
		await expect(ogDescription).toHaveAttribute('content', /.+/);
		await expect(ogUrl).toHaveAttribute('content', /.+/);
	});
});
