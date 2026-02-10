<script lang="ts">
	import { onMount } from 'svelte';
	import OrganizationSchema from '$lib/components/OrganizationSchema.svelte';

	let isCopying = false;
	let copied = false;
	let VSCodeDemo: any = null;

	// Lazy load VSCodeDemo component
	onMount(async () => {
		// Load VSCodeDemo component
		const { default: VSCodeDemoComponent } = await import('$lib/components/VSCodeDemo.svelte');
		VSCodeDemo = VSCodeDemoComponent;
	});

	function trackGAClick(buttonName: string) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'cta_click',
			button_name: buttonName
		});
	}

	function copyToClipboard() {
		if (isCopying) return;
		isCopying = true;
		copied = false;
		const text = 'code --install-extension controlforge.controlforge-structured-text';
		navigator.clipboard
			.writeText(text)
			.then(() => {
				copied = true;
				trackGAClick('copy_install_command'); // Track GA event for copy
				setTimeout(() => {
					isCopying = false;
					copied = false;
				}, 500);
			})
			.catch(() => {
				isCopying = false;
				copied = false;
			});
	}
</script>

<svelte:head>
	<title>ControlForge Systems - Structured Text VS Code Extension | IEC 61131-3 Support</title>
	<meta
		name="description"
		content="Modern tools for IEC 61131-3 Structured Text programming. Our VS Code extension offers syntax highlighting, code snippets, and validation for PLC development."
	/>
	<meta
		name="keywords"
		content="structured text, IEC 61131-3, VS Code extension, PLC programming, automation, control systems, ControlForge"
	/>
	<meta name="author" content="ControlForge Systems" />
	<svelte:component
		this={OrganizationSchema}
		description="ControlForge Systems develops modern tools for industrial automation and PLC programming. Our flagship product is a Structured Text VS Code extension supporting the IEC 61131-3 standard."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://controlforge.dev/" />
	<meta property="og:title" content="ControlForge Systems - Structured Text VS Code Extension" />
	<meta
		property="og:description"
		content="Modern tools for IEC 61131-3 Structured Text programming. Our VS Code extension enhances PLC development with syntax highlighting and validation."
	/>
	<meta property="og:image" content="/controlforge_logo_512x512_optimized.webp" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://controlforge.dev/" />
	<meta
		property="twitter:title"
		content="ControlForge Systems - Structured Text VS Code Extension"
	/>
	<meta
		property="twitter:description"
		content="Modern tools for IEC 61131-3 Structured Text programming. Our VS Code extension enhances PLC development with syntax highlighting and validation."
	/>
	<meta property="twitter:image" content="/controlforge_logo_512x512_optimized.webp" />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="canonical" href="https://controlforge.dev/" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "ControlForge Structured Text VS Code Extension",
			"operatingSystem": "Windows, macOS, Linux",
			"applicationCategory": "DeveloperApplication",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "5",
				"reviewCount": "10"
			},
			"description": "Modern tools for IEC 61131-3 Structured Text programming with syntax highlighting, code snippets, and validation for PLC development.",
			"url": "https://controlforge.dev/",
			"image": "https://controlforge.dev/controlforge_ST_icon_512x512.png",
			"author": {
				"@type": "Organization",
				"name": "ControlForge Systems",
				"url": "https://controlforge.dev/"
			}
		}
	</script>
</svelte:head>

<main class="flex flex-col items-center justify-center min-h-screen">
	<!-- Product Section -->
	<section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8">
		<div
			class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6"
		>
			<div class="md:w-1/3 flex justify-center">
				<img
					src="/controlforge_ST_icon_1024x1024.png"
					alt="Structured Text by ControlForge Logo"
					class="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div class="md:w-2/3 text-center md:text-left">
				<h1 class="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
					Structured Text VS Code Extension
				</h1>
				<p class="text-sm xs:text-base text-gray-600 mb-1 sm:mb-2">
					Professional IEC 61131-3 Support
				</p>
				<p class="text-xs xs:text-sm sm:text-base max-w-xl mx-auto md:mx-0">
					The ControlForge Structured Text extension brings modern IDE features to industrial
					programming, enhancing your PLC and edge device development workflow.
				</p>
			</div>
		</div>

		<!-- Installation -->
		<div class="text-center mb-6 sm:mb-8">
			<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Installation</h3>

			<!-- VS Code Marketplace Buttons -->
			<div class="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
				<!-- Direct VS Code Link -->
				<div>
					<a
						href="vscode:extension/ControlForgeSystems.controlforge-structured-text"
						class="inline-flex items-center bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-2 focus:outline-brand-blue focus:outline-offset-2"
						on:click={() => trackGAClick('open_in_vscode')}
					>
						<svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
							/>
						</svg>
						Open in VS Code
					</a>
				</div>

				<!-- Web Marketplace Link -->
				<div>
					<a
						href="https://marketplace.visualstudio.com/items?itemName=ControlForgeSystems.controlforge-structured-text"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow hover:shadow-lg focus:outline-2 focus:outline-gray-600 focus:outline-offset-2"
						on:click={() => trackGAClick('view_in_web_browser')}
					>
						<svg
							class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
						View in Web Browser
					</a>
				</div>
			</div>

			<p class="text-sm xs:text-base text-gray-600 mb-3">Or install via command line:</p>
			<div class="max-w-full mx-auto">
				<div class="bg-gray-900 rounded-lg p-3 relative">
					<div class="flex items-center justify-between mb-2">
						<span class="text-gray-400 text-xs font-medium">Terminal</span>
						<button
							on:click={copyToClipboard}
							class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-px rounded flex items-center space-x-1 transition-colors duration-150 focus:outline-2 focus:outline-white focus:outline-offset-1"
							style="min-height: auto;"
							disabled={isCopying}
						>
							{#if copied}
								<svg
									class="h-3 w-3"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
								</svg>
								<span>Copied!</span>
							{:else}
								<svg
									class="h-3 w-3"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
								<span>Copy</span>
							{/if}
						</button>
					</div>
					<div class="flex items-center space-x-2">
						<span class="text-green-400 text-sm">$</span>
						<code class="text-gray-100 text-sm font-mono"
							>code --install-extension controlforge.controlforge-structured-text</code
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Interactive VS Code Demo -->
		<div class="mb-6 sm:mb-8 w-full overflow-hidden">
			<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
				Interactive Demo
			</h3>
			<div class="w-full max-w-full overflow-hidden">
				{#if VSCodeDemo}
					<svelte:component
						this={VSCodeDemo}
						title="ControlForge Interactive Demo"
						height="450px"
					/>
				{:else}
					<div class="bg-gray-100 rounded-lg p-8 text-center">
						<p class="text-gray-600">Loading interactive demo...</p>
					</div>
				{/if}
			</div>
		</div>

		<div class="mb-6 sm:mb-8">
			<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Key Features</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
				<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
					<h4 class="text-lg font-semibold text-gray-900 mb-2">Function Block IntelliSense</h4>
					<p class="text-sm sm:text-base text-gray-700">
						Auto-complete for FB outputs with smart suggestions
					</p>
					<code
						class="text-xs sm:text-sm text-brand-blue bg-white px-2 py-1 rounded mt-2 inline-block"
						>myTimer.Q, upCounter.CV</code
					>
				</div>

				<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
					<h4 class="text-lg font-semibold text-gray-900 mb-2">Rich Syntax Highlighting</h4>
					<p class="text-sm sm:text-base text-gray-700">
						Complete IEC 61131-3 language support with color-coded syntax
					</p>
				</div>

				<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
					<h4 class="text-lg font-semibold text-gray-900 mb-2">Smart Code Completion</h4>
					<p class="text-sm sm:text-base text-gray-700">
						Context-aware suggestions for keywords, types, and variables
					</p>
				</div>

				<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
					<h4 class="text-lg font-semibold text-gray-900 mb-2">Code Validation</h4>
					<p class="text-sm sm:text-base text-gray-700">
						Built-in syntax validation and real-time error detection
					</p>
				</div>

				<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:col-span-2">
					<h4 class="text-lg font-semibold text-gray-900 mb-2">Code Snippets</h4>
					<p class="text-sm sm:text-base text-gray-700">
						Pre-built templates for common PLC patterns and industrial automation constructs
					</p>
				</div>
			</div>
		</div>

		<!-- Developer Resources -->
		<div class="space-y-4 sm:space-y-6">
			<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Developer Resources</h3>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
				<!-- GitHub Repository -->
				<a
					href="https://github.com/ControlForge-Systems/controlforge-structured-text"
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
				>
					<svg
						class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					<span class="text-xs xs:text-sm font-medium text-gray-700">Source Code</span>
				</a>

				<!-- Project Roadmap -->
				<a
					href="https://github.com/orgs/ControlForge-Systems/projects/1"
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
				>
					<svg
						class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
						/>
					</svg>
					<span class="text-xs xs:text-sm font-medium text-gray-700">Roadmap</span>
				</a>

				<!-- Bug Reports -->
				<a
					href="https://github.com/ControlForge-Systems/controlforge-structured-text/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-col items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
				>
					<svg
						class="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
					<span class="text-xs xs:text-sm font-medium text-gray-700">Report Bug</span>
				</a>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10">
		<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
			About ControlForge
		</h3>
		<p class="text-sm xs:text-base sm:text-lg max-w-md sm:max-w-3xl mx-auto text-center">
			At ControlForge Systems, our mission is to bring industrial control programming into the
			modern era. We aim to equip engineers and developers with modern, intuitive tools that match
			the sophistication of today’s software development workflows all while respecting the rigor
			and standards of automation systems.
		</p>
	</section>

	<!-- Contact Section -->
	<section class="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8 sm:mt-10 mb-6">
		<div class="text-center">
			<h3 class="text-lg xs:text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Contact Us</h3>
			<p class="text-sm xs:text-base sm:text-lg mb-2 sm:mb-4">
				Have questions or need support? We'd love to hear from you.
			</p>
			<a
				href="mailto:hello@controlforge.dev"
				class="inline-flex items-center bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 px-3 xs:py-3 xs:px-4 sm:px-6 rounded-lg transition-colors text-xs xs:text-sm sm:text-base"
			>
				📧 hello@controlforge.dev
			</a>
		</div>
	</section>
</main>
