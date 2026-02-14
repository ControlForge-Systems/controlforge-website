<script lang="ts">
	import { page } from '$app/stores';

	let status = $derived($page.status);
	let message = $derived($page.error?.message || 'An unexpected error occurred');

	// Determine error category
	let is4xx = $derived(status >= 400 && status < 500);
	let is5xx = $derived(status >= 500 && status < 600);

	// Get specific error details
	function getErrorDetails(status: number) {
		switch (status) {
			case 400:
				return {
					title: 'Bad Request',
					description: 'The request could not be understood or was missing required parameters.',
					icon: '⚠️'
				};
			case 401:
				return {
					title: 'Unauthorized',
					description: 'Authentication is required to access this resource.',
					icon: '🔐'
				};
			case 403:
				return {
					title: 'Access Forbidden',
					description: "You don't have permission to access this resource.",
					icon: '🚫'
				};
			case 404:
				return {
					title: 'Page Not Found',
					description:
						"The page you're looking for doesn't exist. It might have been moved or deleted.",
					icon: '🔍'
				};
			case 405:
				return {
					title: 'Method Not Allowed',
					description: 'The requested method is not supported for this resource.',
					icon: '❌'
				};
			case 408:
				return {
					title: 'Request Timeout',
					description: 'The request took too long to complete.',
					icon: '⏱️'
				};
			case 429:
				return {
					title: 'Too Many Requests',
					description: "You've made too many requests. Please try again later.",
					icon: '🚦'
				};
			case 500:
				return {
					title: 'Internal Server Error',
					description: "We're experiencing technical difficulties. Our team has been notified.",
					icon: '🔧'
				};
			case 502:
				return {
					title: 'Bad Gateway',
					description: 'The server received an invalid response from an upstream server.',
					icon: '🌐'
				};
			case 503:
				return {
					title: 'Service Unavailable',
					description: 'The service is temporarily unavailable. Please try again in a few moments.',
					icon: '🔧'
				};
			case 504:
				return {
					title: 'Gateway Timeout',
					description: "The server didn't receive a timely response from an upstream server.",
					icon: '⏱️'
				};
			default:
				if (is4xx) {
					return {
						title: 'Client Error',
						description: 'There was an issue with your request.',
						icon: '⚠️'
					};
				} else if (is5xx) {
					return {
						title: 'Server Error',
						description: "We're experiencing technical difficulties. Please try again later.",
						icon: '🔧'
					};
				} else {
					return {
						title: 'Something went wrong',
						description: message,
						icon: '❓'
					};
				}
		}
	}

	let errorDetails = $derived(getErrorDetails(status));
</script>

<svelte:head>
	<title>Error {status} - ControlForge Systems</title>
	<meta name="robots" content="noindex" />
	<!-- No canonical link for error pages as they should not be indexed -->
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen px-4">
	<div class="text-center max-w-2xl mx-auto">
		<!-- Error Icon and Status -->
		<div class="mb-8">
			<div class="text-8xl mb-4">{errorDetails.icon}</div>
			<h1
				class="text-6xl font-bold mb-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
			>
				{status}
			</h1>
		</div>

		<!-- Error Details -->
		<div class="mb-8">
			<h2 class="text-3xl font-semibold mb-4 text-gray-800">{errorDetails.title}</h2>
			<p class="text-lg text-gray-600 leading-relaxed">
				{errorDetails.description}
			</p>
		</div>

		<!-- Additional Info for Server Errors Only -->
		{#if is5xx}
			<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
				<div class="flex items-center justify-center mb-2">
					<svg
						class="w-5 h-5 text-red-500 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-red-800 font-medium">Server Error</span>
				</div>
				<p class="text-red-700 text-sm">
					This is on our end. Our team has been automatically notified and is working on a fix.
				</p>
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="flex justify-center mb-8">
			<a
				href="/"
				class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
			>
				<svg
					class="w-4 h-4 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				Go Home
			</a>
		</div>

		<!-- Contact Information -->
		<div class="mt-8 pt-6 border-t border-gray-200">
			<p class="text-sm text-gray-500 mb-2">Still having trouble? We're here to help.</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
				<a
					href="mailto:contact@controlforge.dev"
					class="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
				>
					<svg
						class="w-4 h-4 mr-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					contact@controlforge.dev
				</a>
				{#if is5xx}
					<span class="text-gray-400">|</span>
					<span class="text-gray-500">
						Error ID: {Math.random().toString(36).substring(2, 15)}
					</span>
				{/if}
			</div>
		</div>
	</div>
</main>
