<script lang="ts">
	/**
	 * This component adds FAQ structured data (JSON-LD) for better SEO
	 */
	interface FAQ {
		question: string;
		answer: string;
	}

	let { faqs = [] }: { faqs?: FAQ[] } = $props();
</script>

{#if faqs && faqs.length > 0}
	{@html `
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        ${faqs
					.map(
						(faq, i) => `
          {
            "@type": "Question",
            "name": "${faq.question.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${faq.answer.replace(/"/g, '\\"')}"
            }
          }${i < faqs.length - 1 ? ',' : ''}
        `
					)
					.join('')}
      ]
    }
  </script>
  `}
{/if}
