<script lang="ts">
  import DocsSidebar from '$lib/components/DocsSidebar.svelte';
  import '../../app.css';
</script>

<svelte:head>
  <title>Structured Text Documentation - ControlForge Systems</title>
  <meta name="description" content="Complete documentation for IEC 61131-3 Structured Text programming language. Learn syntax, variables, control structures, and best practices." />
</svelte:head>

<div class="flex min-h-screen">
  <DocsSidebar />
  
  <main class="flex-1 p-4 md:p-8 max-w-4xl">
    <slot />
  </main>
</div>

<style>
  /* Ensure responsive behavior */
  @media (max-width: 768px) {
    :global(.flex) {
      flex-direction: column;
    }
    
    :global(aside) {
      width: 100% !important;
      min-height: auto;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }
  }
</style>
