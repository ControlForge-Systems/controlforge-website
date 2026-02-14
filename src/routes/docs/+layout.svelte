<script lang="ts">
	import DocsSidebar from '$lib/components/DocsSidebar.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import CanonicalLink from '$lib/components/CanonicalLink.svelte';
	import BreadcrumbSchema from '$lib/components/BreadcrumbSchema.svelte';
	import SocialMeta from '$lib/components/SocialMeta.svelte';
	import '../../app.css';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let isSidebarOpen = $state(false);

	function closeSidebar() {
		isSidebarOpen = false;
	}

	let breadcrumbs = $derived(getBreadcrumbs($page.url.pathname));
	let breadcrumbItems = $derived(
		breadcrumbs.map((b, i) => ({
			label: b.name,
			href: i < breadcrumbs.length - 1 ? b.url : undefined,
			current: i === breadcrumbs.length - 1
		}))
	);

	function getBreadcrumbs(path: string) {
		const parts = path.split('/').filter(Boolean);
		const breadcrumbs = [{ name: 'Home', url: '/' }];

		let currentPath = '';
		for (const part of parts) {
			currentPath += `/${part}`;

			// Format the name from the URL part
			let name = part.charAt(0).toUpperCase() + part.slice(1);
			name = name.replace(/-/g, ' ');

			breadcrumbs.push({ name, url: currentPath });
		}

		return breadcrumbs;
	}
</script>

<svelte:head>
	<title>Structured Text Documentation - ControlForge Systems</title>
	<meta
		name="description"
		content="Complete documentation for IEC 61131-3 Structured Text programming language. Learn syntax, variables, control structures, and best practices."
	/>
	<CanonicalLink path={$page.url.pathname} />
	<BreadcrumbSchema {breadcrumbs} />
	<SocialMeta
		title="Structured Text Documentation - ControlForge Systems"
		description="Complete guide to IEC 61131-3 Structured Text for industrial automation. Master PLC programming with our comprehensive documentation."
		url={$page.url.pathname}
	/>
</svelte:head>

<div class="flex min-h-screen">
	<!-- Mobile overlay -->
	{#if isSidebarOpen}
		<div
			class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
			onclick={closeSidebar}
			onkeydown={(e) => {
				if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					closeSidebar();
				}
			}}
			role="button"
			tabindex="0"
			aria-label="Close sidebar"
		></div>
	{/if}

	<!-- Sidebar - Hidden by default on mobile, always visible on desktop -->
	<div
		class="fixed md:relative top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out {isSidebarOpen
			? 'translate-x-0'
			: '-translate-x-full md:translate-x-0'}"
	>
		<DocsSidebar on:navigate={closeSidebar} />
	</div>

	<!-- Main content with proper margins -->
	<main class="flex-1 p-4 md:p-8 max-w-4xl md:ml-0 {isSidebarOpen ? 'md:ml-64' : ''}">
		<Breadcrumbs items={breadcrumbItems} />
		{@render children()}
	</main>
</div>

<style>
	/* Ensure responsive behavior */
	@media (max-width: 768px) {
		:global(body) {
			overflow-x: hidden;
		}
	}
</style>
