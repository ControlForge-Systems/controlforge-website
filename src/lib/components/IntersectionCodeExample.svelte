<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let code: string = '';
  export let title: string = '';
  export let height: string = '300px';
  export let readonly: boolean = true;

  let container: HTMLDivElement;
  let CodeExample: any;
  let loading = false;
  let loaded = false;
  let visible = false;

  onMount(() => {
    if (!browser) return;

    // Set up intersection observer to load Monaco only when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded && !loading) {
            visible = true;
            loadEditor();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before it comes into view
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      observer.disconnect();
    };
  });

  async function loadEditor() {
    if (loading || loaded) return;
    loading = true;
    
    try {
      const module = await import('$lib/components/CodeExample.svelte');
      CodeExample = module.default;
      loaded = true;
    } catch (err) {
      console.error('Failed to load CodeExample:', err);
    } finally {
      loading = false;
    }
  }
</script>

{#if title}
  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
    <h4 class="text-sm font-medium text-gray-700">{title}</h4>
  </div>
{/if}

<div bind:this={container} class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
  {#if !visible}
    <!-- Placeholder that matches the height -->
    <div class="flex items-center justify-center bg-gray-50" style="height: {height}; width: 100%;">
      <div class="text-sm text-gray-500">Code example</div>
    </div>
  {:else if loading}
    <!-- Loading state -->
    <div class="flex items-center justify-center" style="height: {height}; width: 100%;">
      <div class="flex flex-col items-center space-y-2">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <p class="text-xs text-gray-500">Loading editor...</p>
      </div>
    </div>
  {:else if loaded && CodeExample}
    <!-- Loaded Monaco Editor -->
    <svelte:component this={CodeExample} {code} title="" {height} {readonly} />
  {:else}
    <!-- Fallback simple code display -->
    <div class="p-4" style="height: {height}; width: 100%;">
      <pre class="text-sm text-gray-700 font-mono overflow-auto h-full"><code>{code}</code></pre>
    </div>
  {/if}
</div>
