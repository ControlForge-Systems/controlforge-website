<script lang="ts">
  export let src: string;
  export let alt: string;
  export let className: string = '';
  export let style: string = '';
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let webpSrc: string | undefined = undefined;
  
  // Auto-detect WebP version if not provided
  $: autoWebpSrc = webpSrc || src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  // Check if we should try WebP
  $: hasWebpVersion = webpSrc || src.includes('controlforge_horizontal_white_240x60') || src.includes('controlforge_logo_512x512_optimized');
</script>

<picture>
  {#if hasWebpVersion}
    <!-- Try WebP first for better compression -->
    <source srcset={autoWebpSrc} type="image/webp">
  {/if}
  
  <!-- Fallback to original format -->
  <img 
    {src} 
    {alt} 
    class={className}
    {style}
    {width}
    {height}
    loading="lazy"
    decoding="async"
  >
</picture>
