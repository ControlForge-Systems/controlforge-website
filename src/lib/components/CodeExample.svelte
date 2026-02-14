<script lang="ts">
	import { codeToHtml } from 'shiki/bundle/web';
	import { onMount } from 'svelte';

	export let code: string = '';
	export let title: string = '';
	export let height: string = '300px';
	export let readonly: boolean = true;

	let highlightedHtml: string = '';
	let isLoading: boolean = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			console.log('[CodeExample] Starting Shiki web bundle test');

			// Test with JavaScript first (bundled language)
			highlightedHtml = await codeToHtml(code, {
				lang: 'javascript',
				theme: 'github-light'
			});

			console.log('[CodeExample] Code highlighted successfully');
			isLoading = false;
		} catch (err) {
			console.error('[CodeExample] Shiki highlighting failed:', err);
			error = err instanceof Error ? err.message : String(err);
			isLoading = false;
		}
	});
</script>

{#if title}
	<div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
		<h4 class="text-sm font-medium text-gray-700">{title}</h4>
	</div>
{/if}

<div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm max-w-full">
	<div class="code-container" style="height: {height}; width: 100%; max-width: 100%;">
		{#if isLoading}
			<pre class="fallback-code">{code}</pre>
		{:else if error}
			<pre class="fallback-code error">{code}</pre>
		{:else}
			<div class="shiki-wrapper">
				{@html highlightedHtml}
			</div>
		{/if}
	</div>
</div>

<style>
	.code-container {
		overflow: auto;
		position: relative;
		contain: layout style paint;
	}

	.shiki-wrapper :global(pre) {
		margin: 0;
		padding: 12px;
		background: #fafafa !important;
		border: none;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.5;
	}

	.shiki-wrapper :global(code) {
		display: block;
		white-space: pre;
		word-wrap: normal;
	}

	.fallback-code {
		margin: 0;
		padding: 12px;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.5;
		background: #fafafa;
		border: none;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.fallback-code.error {
		border-left: 4px solid #dc2626;
	}
</style>
