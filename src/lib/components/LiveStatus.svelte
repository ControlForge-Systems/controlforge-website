<script lang="ts">
	/**
	 * ARIA live region for screen reader announcements
	 * Visually hidden but announced to assistive technology
	 */
	let {
		message = '',
		priority = 'polite'
	}: {
		message: string;
		priority?: 'polite' | 'assertive';
	} = $props();
</script>

{#if message}
	<div aria-live={priority} aria-atomic="true" class="sr-only">
		{message}
	</div>
{/if}

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
