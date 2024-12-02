<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	export let value: string;
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
		<div class="min-h-0 px-6 py-2 text-sm font-bold collapse-title">Se ITP 1 nivåer</div>
		<div class="collapse-content">
			<table class="table">
				<tbody>
					<tr>
						<td>ITP 1-nivå 40 000 kr/mån</td>
						<th>1800 kr/mån</th>
					</tr>
					<tr>
						<td>ITP 1-nivå 50 000 kr/mån</td>
						<th>3158 kr/mån</th>
					</tr>
					<tr>
						<td>ITP 1-nivå 60 000 kr/mån</td>
						<th>6158 kr/mån</th>
					</tr>
					<tr>
						<td>ITP 1-nivå 70 000 kr/mån</td>
						<th>9158 kr/mån</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</Card>
