<script lang="ts">
	import { incomeData } from '$lib/income-data';
	import Card from '$ui/Card.svelte';
	import ExpenseInput from '$ui/ExpenseInput.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const dispatchExpenses = () => {
		const totalExpenses = $incomeData.expenses.reduce((acc, { value }) => {
			acc += value ? parseInt(value) : 0;
			return acc;
		}, 0);

		dispatch('total', totalExpenses);
	};

	const addExpense = () => {
		$incomeData.expenses.push({ label: '', value: '' });
		$incomeData.expenses = [...$incomeData.expenses];
	};

	const removeExpense = (i: number) => {
		$incomeData.expenses.splice(i, 1);
		$incomeData.expenses = [...$incomeData.expenses];
	};

	onMount(() => dispatchExpenses());
</script>

<Card header="Utgifter">
	<div class="flex flex-col gap-2">
		{#each $incomeData.expenses as _e, i}
			<ExpenseInput
				on:input={dispatchExpenses}
				bind:label={$incomeData.expenses[i].label}
				bind:value={$incomeData.expenses[i].value}
				on:click={() => removeExpense(i)}
			/>
		{/each}
	</div>
	<div>
		<button class="w-full mt-2 btn btn-primary btn-outline" on:click={addExpense}>
			Lägg till +
		</button>
	</div>
</Card>
