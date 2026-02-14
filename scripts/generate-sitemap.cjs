#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = 'https://controlforge.dev';

const routes = [
	{ url: '', priority: 1.0, changefreq: 'weekly' },
	{ url: 'docs', priority: 0.9, changefreq: 'weekly' },
	{ url: 'docs/syntax', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/variables', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/data-types', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/functions', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/standard-functions', priority: 0.7, changefreq: 'weekly' },
	{ url: 'docs/standard-function-blocks', priority: 0.7, changefreq: 'weekly' },
	{ url: 'docs/control', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/advanced-constructs', priority: 0.7, changefreq: 'weekly' },
	{ url: 'docs/examples', priority: 0.8, changefreq: 'weekly' },
	{ url: 'docs/best-practices', priority: 0.7, changefreq: 'weekly' }
];

/**
 * Get last modified date from git history for a file path
 */
function getLastModified(routePath) {
	try {
		const filePath = routePath ? `src/routes/${routePath}/+page.svelte` : 'src/routes/+page.svelte';

		const timestamp = execSync(`git log -1 --format=%cI "${filePath}"`, {
			encoding: 'utf-8'
		}).trim();

		return timestamp || new Date().toISOString();
	} catch {
		return new Date().toISOString();
	}
}

function generateSitemap() {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${BASE_URL}/${route.url}</loc>
    <lastmod>${getLastModified(route.url)}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	const outputPath = path.join(process.cwd(), 'static', 'sitemap.xml');
	fs.writeFileSync(outputPath, sitemap, 'utf-8');
	console.log(`✓ Generated sitemap.xml with ${routes.length} routes`);
}

generateSitemap();
