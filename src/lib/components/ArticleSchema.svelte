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
</script>

<svelte:head>
	{@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": ${JSON.stringify(headline)},
  "description": ${JSON.stringify(description)},
  "author": {
    "@type": "Organization",
    "name": "ControlForge Systems",
    "url": "https://controlforge.dev"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ControlForge Systems",
    "logo": {
      "@type": "ImageObject",
      "url": "https://controlforge.dev/controlforge_logo_1024x1024.webp"
    }
  },
  "datePublished": ${JSON.stringify(datePublished)},
  "dateModified": ${JSON.stringify(dateModified)},
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://controlforge.dev${url}"
  }
}
</scr` + `ipt>`}
</svelte:head>
