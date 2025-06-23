<script lang="ts">
  /**
   * This component adds preload/prefetch links for critical resources
   * to improve page loading performance
   */
  export let assets: { path: string; type: string; rel: string }[] = [];
</script>

{#each assets as asset}
  <link rel={asset.rel} href={asset.path} as={asset.type} />
{/each}
