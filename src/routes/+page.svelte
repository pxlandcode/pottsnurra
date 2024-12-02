<script lang="ts">
	import { incomeData } from '$lib/income-data';
	import Car from '$widgets/Car.svelte';
	import Expenses from '$widgets/Expenses.svelte';
	import GrossSalary from '$widgets/GrossSalary.svelte';
	import Income from '$widgets/Income.svelte';
	import Insurance from '$widgets/Insurance.svelte';
	import Pension from '$widgets/Pension.svelte';
	import Savings from '$widgets/Savings.svelte';
	import Vacation from '$widgets/Vacation.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	const payrollTax = 0.3142;
	const pensionTax = 0.2426;

	let ready = false;
	let insurance = '1000';
	let vacation = 1500;
	let car: number;

	let totalExpenses = 0;
	let totalPension = 0;
	let totalSalary = 0;

	const getTotalExpenses = (e: CustomEvent) => (totalExpenses = e.detail);

	const calculateIncomeWithPayrollTax = (salary: number) => {
		return Math.round(salary / (1 + payrollTax));
	};

	onMount(() => (ready = true));

	$: output =
		+$incomeData.income -
		(+insurance + +$incomeData.savings + +totalExpenses + +car + +$incomeData.pension + +vacation);

	$: if (output) {
		totalPension = +$incomeData.pension + +$incomeData.pension * pensionTax;
		totalSalary = Math.round(calculateIncomeWithPayrollTax(output - totalPension));
	}
</script>

<svelte:head>
	<title>Zefyr | Lön</title>
</svelte:head>

{#if ready}
	<div class="flex flex-col gap-4" transition:scale>
		<div class="flex justify-end">
			<button class="w-full md:w-auto btn btn-outline btn-primary" on:click={incomeData.reset}>
				Återställ
			</button>
		</div>
		<Income bind:value={$incomeData.income} />
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Expenses on:total={getTotalExpenses} />
			<Car bind:value={car} bind:choice={$incomeData.carChoice} />
			<Pension bind:value={$incomeData.pension} />
			<Savings bind:value={$incomeData.savings} />
			<Vacation
				bind:value={vacation}
				bind:choice={$incomeData.vacationChoice}
				income={$incomeData.income}
			/>
			<Insurance bind:value={insurance} />
		</div>
		<GrossSalary salary={totalSalary} />
	</div>
{/if}
