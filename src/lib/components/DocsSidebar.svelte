<script lang="ts">
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const navItems = [
    { href: '/docs', label: 'Overview', icon: '📖' },
    { href: '/docs/syntax', label: 'Syntax Basics', icon: '🔤' },
    { href: '/docs/variables', label: 'Variables & Types', icon: '📦' },
    { href: '/docs/data-types', label: 'Complete Data Types', icon: '🔢' },
    { href: '/docs/control', label: 'Control Structures', icon: '🔀' },
    { href: '/docs/functions', label: 'Functions & Function Blocks', icon: '⚙️' },
    { href: '/docs/standard-function-blocks', label: 'Standard Function Blocks', icon: '🧱' },
    { href: '/docs/standard-functions', label: 'Standard Functions', icon: '🔧' },
    { href: '/docs/advanced-constructs', label: 'Advanced Constructs', icon: '🏗️' },
    { href: '/docs/best-practices', label: 'Best Practices', icon: '✨' }
  ];
  
  function handleNavigation() {
    dispatch('navigate');
  }
</script>

<aside class="w-64 bg-gray-50 border-r border-gray-200 min-h-screen flex flex-col">
  <div class="flex-1 overflow-y-auto">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-6">Structured Text Documentation</h2>
      <nav class="space-y-1">
        {#each navItems as item}
          <a
            href={item.href}
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors {
              $page.url.pathname === item.href
                ? 'bg-brand-blue text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }"
            on:click={handleNavigation}
          >
            <span class="mr-3">{item.icon}</span>
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  </div>
  
  <!-- Quick Links Section -->
  <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
    <h3 class="text-sm font-medium text-gray-500 mb-3">Quick Links</h3>
    <div class="space-y-2">
      <a
        href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-xs text-brand-blue hover:text-blue-800 transition-colors"
        on:click={handleNavigation}
      >
        VS Code Extension →
      </a>
      <a
        href="/"
        class="block text-xs text-gray-600 hover:text-gray-800 transition-colors"
        on:click={handleNavigation}
      >
        ← Back to Home
      </a>
    </div>
  </div>
</aside>
