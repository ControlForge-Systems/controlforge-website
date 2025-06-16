<script>
  // Redirect to the main docs page
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  
  if (browser) {
    goto('/docs');
  }
</script>

<!-- This page is no longer available -->
<div>Redirecting...</div>
