<script>
  import { page } from '$app/stores';
  
  $: status = $page.status;
  $: message = $page.error?.message || 'Page not found';
</script>

<svelte:head>
  <title>Error {status} - ControlForge Systems</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen px-4">
  <div class="text-center max-w-2xl mx-auto">
   
    <h1 class="text-6xl font-bold text-gray-800 mb-4">{status}</h1>
    
    {#if status === 404}
      <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p class="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
    {:else if status >= 500}
      <h2 class="text-2xl font-semibold mb-4">Server Error</h2>
      <p class="text-lg text-gray-600 mb-8">
        We're experiencing technical difficulties. Please try again in a few moments.
      </p>
    {:else if status === 403}
      <h2 class="text-2xl font-semibold mb-4">Access Forbidden</h2>
      <p class="text-lg text-gray-600 mb-8">
        You don't have permission to access this resource.
      </p>
    {:else}
      <h2 class="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p class="text-lg text-gray-600 mb-8">{message}</p>
    {/if}
    
    <div class="space-y-4">
      <a 
        href="/" 
        class="inline-block bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Go Home
      </a>
      
      <div class="text-sm text-gray-500">
        <p>Need help? Contact us at <a href="mailto:hello@controlforge.dev" class="text-brand-blue hover:underline">hello@controlforge.dev</a></p>
      </div>
    </div>
  </div>
</main>
