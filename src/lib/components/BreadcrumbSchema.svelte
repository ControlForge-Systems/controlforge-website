<script lang="ts">
	/**
	 * This component adds breadcrumb structured data (JSON-LD) for better SEO
	 */
	interface Breadcrumb {
		name: string;
		url: string;
	}

	let { breadcrumbs = [] }: { breadcrumbs?: Breadcrumb[] } = $props();
</script>

{#if breadcrumbs && breadcrumbs.length > 0}
	{@html `
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        ${breadcrumbs
					.map(
						(crumb, i) => `
          {
            "@type": "ListItem",
            "position": ${i + 1},
            "name": "${crumb.name.replace(/"/g, '\\"')}",
            "item": "https://controlforge.dev${crumb.url}"
          }${i < breadcrumbs.length - 1 ? ',' : ''}
        `
					)
					.join('')}
      ]
    }
  </script>
  `}
{/if}
