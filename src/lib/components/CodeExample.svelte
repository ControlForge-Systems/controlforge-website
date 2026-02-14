<script lang="ts">
	import { createHighlighterCore } from 'shiki/core';
	import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
	import githubLight from 'shiki/themes/github-light.mjs';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import structuredTextGrammar from '$lib/grammars/structured-text.tmLanguage.json';

	let {
		code = '',
		title = '',
		height = '300px',
		readonly = true
	}: { code?: string; title?: string; height?: string; readonly?: boolean } = $props();

	let highlightedHtml: string = $state('');
	let isLoading: boolean = $state(true);
	let error: string | null = $state(null);
	let highlighter: any = $state(null);

	// Initialize highlighter once
	onMount(async () => {
		if (!browser) return;

		try {
			// Create highlighter with fine-grained bundle
			highlighter = await createHighlighterCore({
				themes: [githubLight],
				langs: [structuredTextGrammar as any],
				engine: createOnigurumaEngine(import('shiki/wasm'))
			});

			// Highlight initial code
			highlightedHtml = highlighter.codeToHtml(code, {
				lang: 'Structured Text',
				theme: 'github-light'
			});

			isLoading = false;
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
			isLoading = false;
		}
	});

	// Re-highlight when code changes
	$effect(() => {
		if (browser && highlighter && code) {
			try {
				highlightedHtml = highlighter.codeToHtml(code, {
					lang: 'Structured Text',
					theme: 'github-light'
				});
			} catch (err) {
				console.error('CodeExample re-highlight error:', err);
			}
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
