import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import githubLight from 'shiki/themes/github-light.mjs';
import structuredTextGrammar from '$lib/grammars/structured-text.tmLanguage.json';

let highlighterInstance: HighlighterCore | null = null;
let initPromise: Promise<HighlighterCore> | null = null;

/**
 * Get singleton Shiki highlighter instance
 * Cached globally to prevent memory leak from multiple instances
 */
export async function getHighlighter(): Promise<HighlighterCore> {
	// Return existing instance if available
	if (highlighterInstance) {
		return highlighterInstance;
	}

	// Return in-progress init if already started
	if (initPromise) {
		return initPromise;
	}

	// Initialize once
	initPromise = createHighlighterCore({
		themes: [githubLight],
		langs: [structuredTextGrammar as any],
		engine: createOnigurumaEngine(import('shiki/wasm'))
	}).then((highlighter) => {
		highlighterInstance = highlighter;
		initPromise = null;
		return highlighter;
	});

	return initPromise;
}
