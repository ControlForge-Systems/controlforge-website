<script lang="ts">
	/**
	 * This component adds Organization schema for better company representation in search
	 */
	let {
		name = 'ControlForge Systems',
		url = 'https://controlforge.dev',
		logo = 'https://controlforge.dev/controlforge_logo_1024x1024.webp',
		description = '',
		email = 'contact@controlforge.dev'
	}: {
		name?: string;
		url?: string;
		logo?: string;
		description?: string;
		email?: string;
	} = $props();
</script>

{@html `
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "${name}",
    "url": "${url}",
    "logo": "${logo}",
    "description": "${description}",
    "email": "${email}",
    "sameAs": [
      "https://github.com/ControlForge-Systems",
      "https://marketplace.visualstudio.com/publishers/ControlForgeSystems"
    ]
  }
</script>
`}
