<script lang="ts">
  import DocsSidebar from '$lib/components/DocsSidebar.svelte';
  import '../../app.css';
  
  let isSidebarOpen = false;
  
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
  
  function closeSidebar() {
    isSidebarOpen = false;
  }
</script>

<svelte:head>
  <title>Structured Text Documentation - ControlForge Systems</title>
  <meta name="description" content="Complete documentation for IEC 61131-3 Structured Text programming language. Learn syntax, variables, control structures, and best practices." />
</svelte:head>

<div class="flex min-h-screen">
  <!-- Mobile sidebar toggle button - Only show when sidebar is closed -->
  {#if !isSidebarOpen}
    <button
      class="md:hidden fixed top-20 left-4 z-30 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      on:click={toggleSidebar}
      aria-label="Show documentation menu"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>
  {/if}

  <!-- Mobile overlay -->
  {#if isSidebarOpen}
    <div 
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
      on:click={closeSidebar}
      on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
      role="button"
      tabindex="0"
    ></div>
  {/if}

  <!-- Sidebar - Hidden by default on mobile, always visible on desktop -->
  <div 
    class="fixed md:relative top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out {
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }"
  >
    <DocsSidebar on:navigate={closeSidebar} />
  </div>
  
  <!-- Main content with proper margins -->
  <main class="flex-1 p-4 md:p-8 max-w-4xl md:ml-0 {isSidebarOpen ? 'md:ml-64' : ''}">
    <slot />
  </main>
</div>

<style>
  /* Ensure responsive behavior */
  @media (max-width: 768px) {
    :global(body) {
      overflow-x: hidden;
    }
  }
</style>
