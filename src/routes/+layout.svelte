<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import CanonicalLink from '$lib/components/CanonicalLink.svelte';
  import ResourceHints from '$lib/components/ResourceHints.svelte';
  import { page } from '$app/stores';
  import '../app.css'; // Import the global stylesheet
  
  // Critical resources that should be preloaded
  const criticalAssets = [
    { path: '/controlforge_horizontal_white_240x60.webp', type: 'image', rel: 'preload' },
    { path: '/controlforge_ST_icon_1024x1024.png', type: 'image', rel: 'preload' }
    // Remove the app.css preload as it's causing an error
  ];
</script>

<!-- Skip adding canonical link in head here since pages will add their own -->
<svelte:head>
  <ResourceHints assets={criticalAssets} />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Header />
  <main class="flex-grow container mx-auto p-4">
    <slot />
  </main>
  <Footer />
</div>