<script lang="ts">
  /**
   * This component adds Open Graph and Twitter card tags for social media sharing
   */
  export let title: string;
  export let description: string;
  export let url: string = "";
  export let image: string = "/controlforge_logo_512x512_optimized.webp";
  export let type: string = "article";
</script>

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content="https://controlforge.dev{url}" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="https://controlforge.dev{image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://controlforge.dev{url}" />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content="https://controlforge.dev{image}" />
