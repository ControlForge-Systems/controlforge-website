<script lang="ts">
	import { createHighlighterCore } from 'shiki/core';
	import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
	import githubLight from 'shiki/themes/github-light.mjs';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import structuredTextGrammar from '$lib/grammars/structured-text.tmLanguage.json';

	export let code: string = '';
	export let title: string = '';
	export let height: string = '300px';
	export let readonly: boolean = true;

	let highlightedHtml: string = '';
	let isLoading: boolean = true;
	let error: string | null = null;
	let highlighter: any = null;

	console.log('[CodeExample] Script loaded, browser:', browser);

	// Initialize highlighter once
	onMount(async () => {
		console.log('[CodeExample] onMount started, code length:', code.length);

		if (!browser) {
			console.log('[CodeExample] Not in browser, skipping');
			return;
		}

		try {
			console.log('[CodeExample] Creating highlighter...');

			// Create highlighter with fine-grained bundle
			highlighter = await createHighlighterCore({
				themes: [githubLight],
				langs: [structuredTextGrammar as any],
				engine: createOnigurumaEngine(import('shiki/wasm'))
			});

			console.log('[CodeExample] Highlighter created successfully');
			console.log('[CodeExample] Loaded languages:', highlighter.getLoadedLanguages());
			console.log('[CodeExample] Loaded themes:', highlighter.getLoadedThemes());

			// Highlight initial code
			highlightedHtml = highlighter.codeToHtml(code, {
				lang: 'Structured Text',
				theme: 'github-light'
			});

			console.log('[CodeExample] Initial highlight complete, HTML length:', highlightedHtml.length);
			isLoading = false;
		} catch (err) {
			console.error('[CodeExample] Shiki error:', err);
			console.error('[CodeExample] Error stack:', err instanceof Error ? err.stack : 'No stack');
			error = err instanceof Error ? err.message : String(err);
			isLoading = false;
		}
	});

	// Re-highlight when code changes
	$: if (browser && highlighter && code) {
		console.log('[CodeExample] Reactive highlight triggered');
		try {
			highlightedHtml = highlighter.codeToHtml(code, {
				lang: 'Structured Text',
				theme: 'github-light'
			});
		} catch (err) {
			console.error('[CodeExample] Re-highlight error:', err);
		}
	}
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
