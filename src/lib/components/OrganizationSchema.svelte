<script lang="ts">
	/**
	 * This component adds Organization schema for better company representation in search
	 */
	export let name: string = 'ControlForge Systems';
	export let url: string = 'https://controlforge.dev';
	export let logo: string = 'https://controlforge.dev/controlforge_logo_1024x1024.webp';
	export let description: string = '';
	export let email: string = 'hello@controlforge.dev';
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
