<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  
  let isMenuOpen = false;
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Documentation' },
    { href: '/docs/syntax', label: 'Syntax Basics' },
    { href: '/docs/variables', label: 'Variables & Types' },
    { href: '/docs/control', label: 'Control Structures' },
    { href: '/docs/functions', label: 'Functions' },
    { href: '/docs/best-practices', label: 'Best Practices' }
  ];
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<header class="bg-gray-900 text-white">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="block" on:click={closeMenu}>
          <img
            src="/controlforge_horizontal_white_1434x359.png"
            alt="ControlForge Logo"
            class="max-h-10 w-auto object-contain hover:opacity-80 transition-opacity"
            style="height:40px"
          >
        </a>
      </div>

      <!-- Desktop Navigation - Only show on md screens and up -->
      <nav class="hidden md:flex items-center space-x-6">
        <a 
          href="/docs" 
          class="text-lg hover:text-gray-300 transition-colors {
            $page.url.pathname.startsWith('/docs') ? 'text-blue-400' : ''
          }"
        >
          Documentation
        </a>
      </nav>

      <!-- Mobile hamburger button - Only show on screens smaller than md -->
      <button
        class="block md:hidden p-2 rounded hover:bg-gray-700 transition-colors"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if isMenuOpen}
          <!-- X icon when menu is open -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {:else}
          <!-- Hamburger icon when menu is closed -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Navigation Menu - Only show when isMenuOpen is true -->
  {#if isMenuOpen}
    <div class="md:hidden bg-gray-800 border-t border-gray-700">
      <nav class="px-4 py-4 space-y-2">
        {#each navItems as item}
          <a
            href={item.href}
            class="block px-4 py-3 text-white hover:bg-gray-700 rounded transition-colors {
              $page.url.pathname === item.href ? 'bg-gray-600' : ''
            }"
            on:click={closeMenu}
          >
            {item.label}
          </a>
        {/each}
      </nav>
      
      <!-- Quick Links -->
      <div class="px-4 pb-4 border-t border-gray-700 pt-4">
        <a
          href="https://marketplace.visualstudio.com/items?itemName=controlforge.controlforge-structured-text"
          target="_blank"
          rel="noopener noreferrer"
          class="block px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          on:click={closeMenu}
        >
          📦 VS Code Extension →
        </a>
      </div>
    </div>
  {/if}
</header>
