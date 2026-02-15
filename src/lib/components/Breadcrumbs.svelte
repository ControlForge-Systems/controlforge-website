<script lang="ts">
	let { items = [] }: { items?: Array<{ label: string; href?: string; current?: boolean }> } =
		$props();
</script>

<nav aria-label="Breadcrumb" class="mb-4 sm:mb-6">
	<ol class="flex items-center gap-1 text-sm text-gray-600 overflow-x-auto">
		{#each items as item, index}
			{#if index > 0}
				<li class="shrink-0" aria-hidden="true">
					<svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</li>
			{/if}

			<li class="shrink-0">
				{#if item.current}
					<span class="font-semibold text-gray-900" aria-current="page">
						{item.label}
					</span>
				{:else}
					<a href={item.href} class="hover:text-brand-blue transition-colors whitespace-nowrap">
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
