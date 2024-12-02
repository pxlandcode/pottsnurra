<script lang="ts">
	export let header = '';
</script>

<div class="w-full p-4 shadow-xl card bg-slate-500/5">
	{#if header}
		<div class="mb-4 card-header">
			<h2 class="justify-center card-title md:justify-start text-secondary">{header}</h2>
		</div>
	{/if}
	<slot />
</div>
