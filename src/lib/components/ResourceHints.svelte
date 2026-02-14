<script lang="ts">
	/**
	 * This component adds preload/prefetch links for critical resources
	 * to improve page loading performance
	 */
	let { assets = [] }: { assets?: { path: string; type: string; rel: string }[] } = $props();
</script>

{#each assets as asset}
	<link rel={asset.rel} href={asset.path} as={asset.type as any} />
{/each}
