<script lang="ts">
	let {
		height = '600px',
		theme = 'light',
		file = 'example.st',
		content = ''
	}: { height?: string; theme?: 'light' | 'dark'; file?: string; content?: string } = $props();

	// VS Code for the Web URL with file content
	let vscodeUrl = $derived(
		`https://vscode.dev/?file=${file}&content=${encodeURIComponent(content)}&theme=${theme}`
	);

	// Alternative: Use GitHub Codespaces or VS Code tunnel
	// This would require your extension to be available in the web marketplace
</script>

<div class="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
	<div class="bg-gray-100 px-4 py-2 border-b border-gray-300">
		<div class="flex items-center justify-between">
			<h3 class="text-sm font-medium text-gray-700">VS Code for the Web</h3>
			<a
				href={vscodeUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-blue-600 hover:text-blue-800"
			>
				Open in New Tab →
			</a>
		</div>
	</div>

	<iframe
		src={vscodeUrl}
		title="VS Code for the Web"
		style="width: 100%; height: {height}; border: none;"
		allow="clipboard-write"
		sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
	></iframe>
</div>

<div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
	<h4 class="text-sm font-medium text-yellow-800 mb-2">📝 Note</h4>
	<p class="text-sm text-yellow-700">
		For the best experience with ControlForge features, install our extension locally in VS Code.
		Web-based VS Code has limitations compared to the desktop version.
	</p>
</div>
