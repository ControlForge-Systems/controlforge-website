<script>
  // This component adds a canonical link to the page
  export let path = ''; // The path of the current page, e.g., "/docs/syntax"
</script>

{#if path}
  <link rel="canonical" href="https://controlforge.dev{path}" />
{/if}
