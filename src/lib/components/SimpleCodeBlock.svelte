<script lang="ts">
	let {
		code = '',
		title = '',
		height = '300px'
	}: { code?: string; title?: string; height?: string } = $props();

	// Simple syntax highlighting for Structured Text without Monaco Editor
	function highlightCode(code: string): string {
		// Clean the input code first and check if it already contains HTML
		const cleanCode = code.trim();

		// If the code already contains HTML spans, just return the clean text
		if (cleanCode.includes('<span class=') || cleanCode.includes('</span>')) {
			return cleanCode.replace(/<[^>]*>/g, ''); // Strip all HTML tags
		}

		return (
			cleanCode
				// Keywords
				.replace(
					/\b(IF|THEN|ELSE|ELSIF|END_IF|CASE|OF|END_CASE|FOR|TO|BY|DO|END_FOR|WHILE|END_WHILE|REPEAT|UNTIL|END_REPEAT|VAR|VAR_INPUT|VAR_OUTPUT|VAR_IN_OUT|VAR_GLOBAL|VAR_EXTERNAL|END_VAR|FUNCTION|FUNCTION_BLOCK|PROGRAM|END_FUNCTION|END_FUNCTION_BLOCK|END_PROGRAM|AND|OR|NOT|XOR|MOD|DIV|TRUE|FALSE)\b/gi,
					'<span class="keyword">$1</span>'
				)
				// Data types
				.replace(
					/\b(BOOL|BYTE|WORD|DWORD|LWORD|SINT|USINT|INT|UINT|DINT|UDINT|LINT|ULINT|REAL|LREAL|TIME|DATE|TIME_OF_DAY|DATE_AND_TIME|STRING|WSTRING|AT|ARRAY|STRUCT|END_STRUCT)\b/gi,
					'<span class="type">$1</span>'
				)
				// Time literals first (before numbers)
				.replace(/\bT#\w+/gi, '<span class="number">$&</span>')
				// Numbers
				.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>')
				// Strings
				.replace(/'([^']*?)'/g, '<span class="string">\'$1\'</span>')
				.replace(/"([^"]*?)"/g, '<span class="string">"$1"</span>')
				// Comments
				.replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
				.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
				.replace(/\(\*[\s\S]*?\*\)/g, '<span class="comment">$&</span>')
				// Operators
				.replace(/:=/g, '<span class="operator">:=</span>')
				.replace(/[=<>!]=?/g, '<span class="operator">$&</span>')
				.replace(/[+\-*\/]/g, '<span class="operator">$&</span>')
		);
	}

	let highlightedCode = $derived(highlightCode(code));
</script>

{#if title}
	<div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
		<h4 class="text-sm font-medium text-gray-700">{title}</h4>
	</div>
{/if}

<div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
	<div class="code-container" style="height: {height};">
		<pre class="code-pre"><code class="code-content">{@html highlightedCode}</code></pre>
	</div>
</div>

<style>
	.code-container {
		overflow: auto;
		background: #fafafa;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.4;
		contain: layout style paint;
	}

	.code-pre {
		margin: 0;
		padding: 16px;
		white-space: pre-wrap;
		word-wrap: break-word;
		background: transparent;
		border: none;
		height: 100%;
		box-sizing: border-box;
	}

	.code-content {
		background: transparent;
		border: none;
		color: #333;
	}

	/* Syntax highlighting styles */
	:global(.code-content .keyword) {
		color: #0000ff;
		font-weight: bold;
	}

	:global(.code-content .type) {
		color: #2b91af;
		font-weight: bold;
	}

	:global(.code-content .comment) {
		color: #008000;
		font-style: italic;
	}

	:global(.code-content .string) {
		color: #a31515;
	}

	:global(.code-content .number) {
		color: #098658;
	}

	:global(.code-content .operator) {
		color: #000000;
	}
</style>
