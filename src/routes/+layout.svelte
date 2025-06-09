<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import '../app.css'; // Import the global stylesheet
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  <main class="flex-grow container mx-auto p-4">
    <slot />
  </main>
  <Footer />
</div>