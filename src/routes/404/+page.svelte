<!-- 404 Error Page -->
<script lang="ts">
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';

	const errorDetails = {
		status: 404,
		title: 'Page Not Found',
		description: "The page you're looking for doesn't exist. It might have been moved or deleted.",
		icon: '🔍'
	};
</script>

<svelte:head>
	<title>Error 404 - ControlForge Systems</title>
	<meta name="robots" content="noindex" />
	<CanonicalLink path="/404" />
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen px-4">
	<div class="text-center max-w-2xl mx-auto">
		<!-- Error Icon and Status -->
		<div class="mb-8">
			<div class="text-8xl mb-4">{errorDetails.icon}</div>
			<h1
				class="text-6xl font-bold mb-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
			>
				{errorDetails.status}
			</h1>
		</div>

		<!-- Error Details -->
		<div class="mb-8">
			<h2 class="text-3xl font-semibold mb-4 text-gray-800">{errorDetails.title}</h2>
			<p class="text-lg text-gray-600 leading-relaxed">
				{errorDetails.description}
			</p>
		</div>

		<!-- Action Button -->
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
			<a
				href="mailto:hello@controlforge.dev"
				class="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center text-sm"
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
				hello@controlforge.dev
			</a>
		</div>
	</div>
</main>
