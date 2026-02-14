<script lang="ts">
	// This component adds a canonical link to the page
	let { path = '' }: { path?: string } = $props(); // The path of the current page, e.g., "/docs/syntax"
</script>

{#if path}
	<link rel="canonical" href="https://controlforge.dev{path}" />
{/if}
