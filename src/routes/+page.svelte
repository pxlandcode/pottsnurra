<script lang="ts">
	import { incomeData } from '$lib/income-data';
	import Card from '$ui/Card.svelte';
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

	const employerFeeSalary = 1.3142;
	const employerFeePension = 1.2426;
	const payrollTax = 0.3142;
	const pensionTax = 0.2426;

	const minSavingsLimit = -10000;
	const minIncomeLimit = 0;

	let ready = false;
	let insurance = '1000';
	let car: number;

	let totalExpenses = 0;
	let totalPension = 0;
	let totalSalary = 0;

	let selectedIncomeTab = 'fixed';
	let calculatedSavings = 0;

	let maxGrossSalary = 0;
	let grossSalary = 0;

	let vacationDays = 25;
	let vacationCost = 0;

	$: {
		const initialIncome = Number($incomeData.income);
		const pensionCost = +$incomeData.pension * employerFeePension;
		const fixedCosts = +insurance + +totalExpenses + +car + pensionCost;

		let availableBudget = initialIncome - fixedCosts - minSavingsLimit;

		let vacationMultiplier = selectedIncomeTab === 'fixed' ? 0.008 : 0.054;
		let vacationFactor = (vacationMultiplier * employerFeeSalary * vacationDays) / 12;

		// Solve directly for max gross salary
		maxGrossSalary = Math.floor(availableBudget / (employerFeeSalary + vacationFactor));

		// If grossSalary is unset or too high, clamp it
		if (!grossSalary || isNaN(grossSalary) || grossSalary > maxGrossSalary) {
			grossSalary = maxGrossSalary;
		}

		// Final vacation cost
		vacationCost = grossSalary * vacationFactor;

		const salaryCost = grossSalary * employerFeeSalary;
		const totalUsed = salaryCost + vacationCost;

		const availableForSavings = Math.max(initialIncome - fixedCosts - totalUsed, minSavingsLimit);
		calculatedSavings = isNaN(availableForSavings) ? 0 : availableForSavings;

		if (grossSalary > 0) {
			totalPension = +$incomeData.pension + +$incomeData.pension * pensionTax;
			totalSalary = Math.round(calculateIncomeWithPayrollTax(grossSalary - totalPension));
		}

		console.log('Initial income:', initialIncome);
		console.log('Max gross salary:', maxGrossSalary);
		console.log('Final grossSalary:', grossSalary);
		console.log('Vacation cost:', vacationCost);
		console.log('Final salary cost:', salaryCost);
		console.log('Savings (with min limit):', calculatedSavings);
	}

	const getTotalExpenses = (e: CustomEvent) => (totalExpenses = e.detail);

	const calculateIncomeWithPayrollTax = (salary: number) => {
		return Math.round(salary / (1 + payrollTax));
	};

	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Pottsnurran</title>
</svelte:head>

{#if ready}
	<div class="flex flex-col gap-4" transition:scale>
		<div class="flex justify-end">
			<button class="w-full md:w-auto btn btn-outline btn-primary" on:click={incomeData.reset}>
				Återställ
			</button>
		</div>

		<Income
			bind:value={$incomeData.income}
			on:selectedTabChange={(e) => (selectedIncomeTab = e.detail)}
		/>

		{#if Number($incomeData.income) > minIncomeLimit}
			<GrossSalary
				salary={grossSalary}
				maxSalary={maxGrossSalary}
				onSalaryChange={(newSalary) => (grossSalary = newSalary)}
			/>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Pension bind:value={$incomeData.pension} />
				<Savings {calculatedSavings} />
				<Vacation bind:choice={vacationDays} fixed={selectedIncomeTab === 'fixed'} {vacationCost} />
				<Insurance bind:value={insurance} />
				<Expenses on:total={getTotalExpenses} />
				<Car bind:value={car} bind:choice={$incomeData.carChoice} />
			</div>
		{:else}
			<Card header="Inkomst saknas">
				<p class="text-center font-semibold mt-4">
					Lägg till en inkomst innan du kan justera dina utgifter.
				</p>
			</Card>
		{/if}
	</div>
{/if}
