<script lang="ts">
	import CardWithTabs from '$ui/CardWithTabs.svelte';
	import Input from '$ui/Input.svelte';
	import Output from '$ui/Output.svelte';
	import { formatterToSek } from '$lib/helpers';
	export let value = '';

	let assignments = [{ id: 1, label: '', hours: 168, pricePerHour: 0, percentage: 0 }];

	const addAssignment = () => {
		assignments.push({
			id: Date.now(),
			label: '',
			hours: 0,
			pricePerHour: 0,
			percentage: 0
		});
		assignments = [...assignments];
	};

	const removeAssignment = (id: number) => {
		assignments = assignments.filter((assignment) => assignment.id !== id);
	};

	$: totalVariableIncome = assignments.reduce((acc, { hours, pricePerHour, percentage }) => {
		const assignmentIncome = hours * pricePerHour * (percentage / 100);
		return acc + assignmentIncome;
	}, 0);

	$: if (tabOptions[1].selected) {
		value = totalVariableIncome.toString();
	}

	let tabOptions = [
		{ id: 'fixed', label: 'Fast inkomst', selected: true },
		{ id: 'variable', label: 'Rörlig inkomst', selected: false }
	];

	const handleTabChange = (event: CustomEvent<string>) => {
		const selectedTabId = event.detail;
		tabOptions = tabOptions.map((tab) => ({
			...tab,
			selected: tab.id === selectedTabId
		}));
	};
</script>

<CardWithTabs {tabOptions} on:tabChange={handleTabChange}>
	{#if tabOptions[0].selected}
		<div>
			<Input type="number" bind:value label="Fast inkomst" placeholder="Ange belopp..." />
			<Output>{formatterToSek.format(+value)}/mån</Output>
		</div>
	{/if}

	{#if tabOptions[1].selected}
		<div class="flex flex-col gap-4">
			{#each assignments as assignment, i}
				<div class=" flex flex-col gap-2">
					<h3 class="text-md font-bold">Uppdrag {i + 1}</h3>
					<Input type="number" bind:value={assignment.hours} label="Antal timmar" placeholder="0" />

					<Input
						type="number"
						bind:value={assignment.pricePerHour}
						label="Pris per timme"
						placeholder="0"
					/>

					<Input
						type="number"
						bind:value={assignment.percentage}
						label="Procent (% av totalen)"
						placeholder="100"
					/>

					<button
						class="self-end text-red-500 hover:text-red-400 underline"
						on:click={() => removeAssignment(assignment.id)}
					>
						Ta bort
					</button>
				</div>
			{/each}

			<button class="w-full mt-2 btn btn-primary btn-outline" on:click={addAssignment}>
				Lägg till uppdrag +
			</button>

			<Output>{formatterToSek.format(totalVariableIncome)}/mån</Output>
		</div>
	{/if}
</CardWithTabs>
