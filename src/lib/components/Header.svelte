<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import OptimizedImage from './OptimizedImage.svelte';

	let isMenuOpen = false;

	const navItems = [
		{ href: '/', label: 'Home', type: 'main' },
		{
			href: '/docs',
			label: 'Documentation',
			type: 'main',
			subItems: [
				{ href: '/docs/syntax', label: 'Syntax Basics' },
				{ href: '/docs/variables', label: 'Variables & Types' },
				{ href: '/docs/control', label: 'Control Structures' },
				{ href: '/docs/functions', label: 'Functions' },
				{ href: '/docs/best-practices', label: 'Best Practices' }
			]
		}
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="bg-gray-900 text-white">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="block" on:click={closeMenu}>
					<OptimizedImage
						src="/controlforge_horizontal_white_240x60.png"
						webpSrc="/controlforge_horizontal_white_240x60.webp"
						alt="ControlForge Logo"
						className="max-h-10 w-auto object-contain hover:opacity-80 transition-opacity"
						style="height:40px"
						width={240}
						height={60}
					/>
				</a>
			</div>

			<!-- Desktop Navigation - Only show on md screens and up -->
			<nav class="hidden md:flex items-center space-x-6" aria-label="Main navigation">
				<a
					href="/docs"
					class="text-lg hover:text-gray-300 transition-colors leading-none flex items-center focus:outline-2 focus:outline-brand-blue focus:outline-offset-2 rounded px-2 py-1 {$page.url.pathname.startsWith(
						'/docs'
					)
						? 'text-blue-400'
						: ''}"
					aria-current={$page.url.pathname.startsWith('/docs') ? 'page' : undefined}
				>
					Documentation
				</a>
			</nav>

			<!-- Mobile hamburger button - Only show on screens smaller than md -->
			<button
				class="block md:hidden p-2 rounded hover:bg-gray-700 transition-colors"
				on:click={toggleMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={isMenuOpen}
				aria-controls="mobile-menu"
			>
				{#if isMenuOpen}
					<!-- X icon when menu is open -->
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				{:else}
					<!-- Hamburger icon when menu is closed -->
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Navigation Menu - Only show when isMenuOpen is true -->
	{#if isMenuOpen}
		<div class="md:hidden bg-gray-800 border-t border-gray-700" id="mobile-menu">
			<nav class="px-4 py-4 space-y-2" aria-label="Mobile navigation">
				{#each navItems as item}
					<!-- Main navigation item -->
					<a
						href={item.href}
						class="block px-4 py-3 text-white hover:bg-gray-700 rounded transition-colors font-medium focus:outline-2 focus:outline-brand-blue focus:outline-offset-2 {$page
							.url.pathname === item.href
							? 'bg-gray-600'
							: ''}"
						aria-current={$page.url.pathname === item.href ? 'page' : undefined}
						on:click={closeMenu}
					>
						{item.label}
					</a>

					<!-- Sub-items if they exist and we're in docs section -->
					{#if item.subItems && $page.url.pathname.startsWith('/docs')}
						<div class="ml-4 space-y-1 border-l-2 border-gray-600 pl-4">
							{#each item.subItems as subItem}
								<a
									href={subItem.href}
									class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors focus:outline-2 focus:outline-brand-blue focus:outline-offset-2 {$page
										.url.pathname === subItem.href
										? 'bg-gray-600 text-white'
										: ''}"
									aria-current={$page.url.pathname === subItem.href ? 'page' : undefined}
									on:click={closeMenu}
								>
									{subItem.label}
								</a>
							{/each}
						</div>
					{/if}
				{/each}
			</nav>

			<!-- Quick Links -->
			<div class="px-4 pb-4 border-t border-gray-700 pt-4">
				<a
					href="https://marketplace.visualstudio.com/items?itemName=controlforge.controlforge-structured-text"
					target="_blank"
					rel="noopener noreferrer"
					class="block px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors focus:outline-2 focus:outline-brand-blue focus:outline-offset-2 rounded"
					on:click={closeMenu}
				>
					📦 VS Code Extension →
				</a>
			</div>
		</div>
	{/if}
</header>
