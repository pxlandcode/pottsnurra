<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	export let choice = 25;
	export let fixed = false;
	export let vacationCost = 0;

	const vacationOptions = [
		{ value: 25, label: '25 Dagar' },
		{ value: 30, label: '30 Dagar' }
	];
</script>

<Card header="Semester">
	<div class="join">
		{#each vacationOptions as option}
			<input
				class="flex-1 join-item btn"
				type="radio"
				bind:group={choice}
				value={option.value}
				aria-label={option.label}
			/>
		{/each}
	</div>

	{#if !fixed}
		<Output>{formatterToSek.format(vacationCost)}</Output>
	{/if}
</Card>
