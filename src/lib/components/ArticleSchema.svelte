<script lang="ts">
	/**
	 * Article schema for documentation pages
	 */
	let {
		headline,
		description,
		url,
		datePublished,
		dateModified
	}: {
		headline: string;
		description: string;
		url: string;
		datePublished?: string;
		dateModified?: string;
	} = $props();

	// Use current date if not provided
	let published = $derived(datePublished || new Date().toISOString());
	let modified = $derived(dateModified || new Date().toISOString());
</script>

{@html `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "${headline}",
  "description": "${description}",
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
  "datePublished": "${published}",
  "dateModified": "${modified}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://controlforge.dev${url}"
  }
}
</script>
`}
