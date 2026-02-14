<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	/**
	 * Article schema for documentation pages
	 */
	let {
		headline,
		description,
		url,
		datePublished = new Date().toISOString(),
		dateModified = new Date().toISOString()
	}: {
		headline: string;
		description: string;
		url: string;
		datePublished?: string;
		dateModified?: string;
	} = $props();

	// Create schema object - values are constant per page
	function createSchema() {
		return {
			'@context': 'https://schema.org',
			'@type': 'TechArticle',
			headline,
			description,
			author: {
				'@type': 'Organization',
				name: 'ControlForge Systems',
				url: 'https://controlforge.dev'
			},
			publisher: {
				'@type': 'Organization',
				name: 'ControlForge Systems',
				logo: {
					'@type': 'ImageObject',
					url: 'https://controlforge.dev/controlforge_logo_1024x1024.webp'
				}
			},
			datePublished,
			dateModified,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://controlforge.dev${url}`
			}
		};
	}

	const schema = createSchema();

	// Inject schema into head on mount (client-side only)
	onMount(() => {
		if (browser) {
			const script = document.createElement('script');
			script.type = 'application/ld+json';
			script.textContent = JSON.stringify(schema);
			document.head.appendChild(script);

			return () => {
				document.head.removeChild(script);
			};
		}
	});
</script>

<!-- Server-side schema injection -->
<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</scr` + `ipt>`}
</svelte:head>
