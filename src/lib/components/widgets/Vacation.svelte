<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	export let value: number;
	export let income: string;
	export let choice = 1;

	$: if (choice === 1) {
		value = Math.round(+income * 0.6 * 0.12 * 0.8);
	} else {
		value = Math.round(+income * 0.6 * 0.144 * 0.8);
	}
</script>

<Card header="Semester">
	<div class="join">
		<input
			class="flex-1 join-item btn"
			type="radio"
			bind:group={choice}
			value={1}
			aria-label="25 Dagar"
		/>
		<input
			class="flex-1 join-item btn"
			type="radio"
			bind:group={choice}
			value={2}
			aria-label="30 Dagar"
		/>
	</div>

	<Output>
		{formatterToSek.format(value)}
	</Output>
</Card>
