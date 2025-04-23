<script lang="ts">
	import InfoButton from './InfoButton.svelte';

	export let header = '';
	export let info: string | undefined = undefined;
</script>

<div class="w-full p-4 shadow-xl card bg-slate-500/5">
	{#if header}
		<div class="mb-4 card-header flex flex-row gap-4 items-center">
			<h2 class="justify-center card-title md:justify-start text-secondary">{header}</h2>
			{#if info}
				<InfoButton {info} />
			{/if}
		</div>
	{/if}
	<slot />
</div>
