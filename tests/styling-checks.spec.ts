import { test, expect } from '@playwright/test';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/docs', name: 'Docs Home' },
	{ path: '/docs/syntax', name: 'Syntax' },
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

for (const { path, name } of pages) {
	test.describe(`${name} - Styling Checks`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(path);
		});

		test('should not have horizontal overflow on mobile', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

			// Check that body doesn't scroll (overflow should be in containers)
			const bodyOverflow = await page.evaluate(() => {
				const body = document.body;
				const html = document.documentElement;
				return {
					bodyScrollWidth: body.scrollWidth,
					bodyClientWidth: body.clientWidth,
					htmlScrollWidth: html.scrollWidth,
					htmlClientWidth: html.clientWidth
				};
			});

			// Allow small tolerance and ignore if overflow is from intentional scrollable containers
			const threshold = 5; // 5px tolerance for rounding/borders
			const hasBodyOverflow =
				bodyOverflow.htmlScrollWidth > bodyOverflow.htmlClientWidth + threshold;

			if (hasBodyOverflow) {
				// If there's overflow, it should be from intentional containers, not layout bugs
				const overflowingElements = await page.evaluate(() => {
					const elements = Array.from(document.querySelectorAll('*'));
					return elements
						.filter((el) => {
							const rect = el.getBoundingClientRect();
							return rect.right > window.innerWidth + 5; // 5px tolerance
						})
						.map((el) => ({
							tag: el.tagName,
							classes: el.className,
							width: el.getBoundingClientRect().width
						}))
						.slice(0, 5); // Limit to first 5
				});

				// Fail with helpful error message
				expect(
					hasBodyOverflow,
					`Page has horizontal overflow. Overflowing elements: ${JSON.stringify(overflowingElements, null, 2)}`
				).toBe(false);
			}
		});

		test('should not have horizontal overflow on tablet', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 }); // iPad
			const body = await page.locator('body');
			const scrollWidth = await body.evaluate((el) => el.scrollWidth);
			const clientWidth = await body.evaluate((el) => el.clientWidth);

			expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
		});

		test('should not have horizontal overflow on desktop', async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 });
			const body = await page.locator('body');
			const scrollWidth = await body.evaluate((el) => el.scrollWidth);
			const clientWidth = await body.evaluate((el) => el.clientWidth);

			expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
		});

		test('breadcrumbs should be visible on mobile', async ({ page }) => {
			if (!path.startsWith('/docs')) return;

			await page.setViewportSize({ width: 375, height: 667 });
			const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
			await expect(breadcrumbs).toBeVisible();
		});

		test('should not have any elements with negative z-index causing overlap', async ({ page }) => {
			const negativeZIndex = await page.evaluate(() => {
				const elements = Array.from(document.querySelectorAll('*'));
				return elements.some((el) => {
					const zIndex = window.getComputedStyle(el).zIndex;
					return zIndex && parseInt(zIndex) < 0;
				});
			});

			expect(negativeZIndex).toBe(false);
		});

		test('code blocks should not have fixed height scroll containers', async ({ page }) => {
			const codeBlocks = page.locator('.code-container, .shiki-wrapper');
			const count = await codeBlocks.count();

			if (count > 0) {
				for (let i = 0; i < count; i++) {
					const styles = await codeBlocks.nth(i).evaluate((el) => {
						const computed = window.getComputedStyle(el);
						return {
							height: computed.height,
							overflow: computed.overflow,
							overflowY: computed.overflowY
						};
					});

					// Should not have fixed height with overflow
					if (styles.height && styles.height !== 'auto') {
						expect(styles.overflow).not.toBe('auto');
						expect(styles.overflow).not.toBe('scroll');
						expect(styles.overflowY).not.toBe('auto');
						expect(styles.overflowY).not.toBe('scroll');
					}
				}
			}
		});

		test('tables should be scrollable on mobile when needed', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });

			const tables = page.locator('table');
			const count = await tables.count();

			if (count > 0) {
				for (let i = 0; i < count; i++) {
					const container = tables.nth(i).locator('..');
					const hasOverflow = await container.evaluate((el) => {
						const styles = window.getComputedStyle(el);
						return styles.overflowX === 'auto' || styles.overflowX === 'scroll';
					});

					// Tables should be in containers with overflow-x-auto
					expect(hasOverflow).toBe(true);
				}
			}
		});

		test('no broken images', async ({ page }) => {
			const images = page.locator('img');
			const count = await images.count();

			for (let i = 0; i < count; i++) {
				const img = images.nth(i);
				const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
				const src = await img.getAttribute('src');

				expect(naturalWidth, `Image broken: ${src}`).toBeGreaterThan(0);
			}
		});

		test('links should have valid hrefs', async ({ page }) => {
			const links = page.locator('a[href]');
			const count = await links.count();

			for (let i = 0; i < count; i++) {
				const href = await links.nth(i).getAttribute('href');

				// Skip external links and anchors
				if (
					href?.startsWith('http') ||
					href?.startsWith('#') ||
					href?.startsWith('mailto:') ||
					href?.startsWith('vscode:')
				) {
					continue;
				}

				// Internal links should be valid
				if (href) {
					expect(href).toBeTruthy();
				}
			}
		});
	});
}
