<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	export let value: string;

	const itpLevels = [
		{ salary: 40000, pension: 1800 },
		{ salary: 50000, pension: 2250 },
		{ salary: 60000, pension: 5154 },
		{ salary: 70000, pension: 8154 }
	];

	function setPension(pension) {
		value = pension.toString();
	}
</script>

<Card header="Pension">
	<div>
		<input type="range" min="0" max="15000" step="200" bind:value class="range range-primary" />
	</div>

	<Output>
		{formatterToSek.format(+value)}
	</Output>

	<div
		tabindex="0"
		class="mt-4 border collapse border-base-300 bg-base-200 collapse-arrow"
		role="button"
	>
		<div class="min-h-0 px-6 py-2 text-sm font-bold collapse-title">Se ITP 1 nivåer 2025</div>
		<div class="collapse-content">
			<table class="table">
				<tbody>
					{#each itpLevels as { salary, pension }}
						<tr class="cursor-pointer hover:bg-base-300" on:click={() => setPension(pension)}>
							<td>ITP 1-nivå {formatterToSek.format(salary)}/mån</td>
							<th>{formatterToSek.format(pension)}/mån</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</Card>
