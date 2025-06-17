<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let code: string = '';
  export let title: string = '';
  export let height: string = '300px';
  export let readonly: boolean = true;

  let CodeExample: any;
  let loading = true;
  let error = false;

  onMount(async () => {
    if (!browser) return;
    
    try {
      // Dynamically import the CodeExample component which includes Monaco Editor
      const module = await import('./CodeExample.svelte');
      CodeExample = module.default;
      loading = false;
    } catch (err) {
      console.error('Failed to load CodeExample:', err);
      error = true;
      loading = false;
    }
  });
</script>

{#if title}
  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
    <h4 class="text-sm font-medium text-gray-700">{title}</h4>
  </div>
{/if}

{#if loading}
  <div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
    <div class="flex items-center justify-center" style="height: {height}; width: 100%;">
      <div class="flex flex-col items-center space-y-2">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="text-sm text-gray-500">Loading code editor...</p>
      </div>
    </div>
  </div>
{:else if error}
  <div class="border border-red-200 rounded-lg overflow-hidden bg-red-50 shadow-sm">
    <div class="flex items-center justify-center p-4" style="height: {height}; width: 100%;">
      <p class="text-red-600">Failed to load code editor</p>
    </div>
  </div>
{:else if CodeExample}
  <svelte:component this={CodeExample} {code} {title} {height} {readonly} />
{/if}
