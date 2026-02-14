<script lang="ts">
	let {
		src,
		alt,
		className = '',
		style = '',
		width = undefined,
		height = undefined,
		webpSrc = undefined
	}: {
		src: string;
		alt: string;
		className?: string;
		style?: string;
		width?: number;
		height?: number;
		webpSrc?: string;
	} = $props();

	// Auto-detect WebP version if not provided
	let autoWebpSrc = $derived(webpSrc || src.replace(/\.(png|jpg|jpeg)$/, '.webp'));

	// Check if we should try WebP
	let hasWebpVersion = $derived(
		webpSrc ||
			src.includes('controlforge_horizontal_white_240x60') ||
			src.includes('controlforge_logo_512x512_optimized')
	);
</script>

<picture>
	{#if hasWebpVersion}
		<!-- Try WebP first for better compression -->
		<source srcset={autoWebpSrc} type="image/webp" />
	{/if}

	<!-- Fallback to original format -->
	<img {src} {alt} class={className} {style} {width} {height} loading="lazy" decoding="async" />
</picture>
