<script lang="ts">
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

	const schema = $derived({
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
	});
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</scr` + `ipt>`}
</svelte:head>
