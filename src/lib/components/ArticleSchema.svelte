<script lang="ts">
	import { onMount } from 'svelte';

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

	// Inject schema into head on mount
	// Props are constant per page, so capture immediately in onMount
	onMount(() => {
		const schema = {
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

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schema);
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	});
</script>
