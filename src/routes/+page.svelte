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

	// 💡 Constants
	const employerFeeSalary = 1.3142;
	const employerFeePension = 1.2426;
	const payrollTax = 0.3142;
	const pensionTax = 0.2426;

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
		if ($incomeData.income) {
			const initialIncome = Number($incomeData.income);

			// STEP 1: calculate fixed costs (including pension with employer fees)
			const pensionCost = +$incomeData.pension * employerFeePension;
			const fixedCosts = +insurance + +totalExpenses + +car + pensionCost;

			// STEP 2: how much total budget is left for salary + vacation?
			let availableForSalaryAndVacation = Math.max(initialIncome - fixedCosts, 0);

			// STEP 3: calculate provisional max gross salary (before multiplying)
			maxGrossSalary = Math.floor(availableForSalaryAndVacation / employerFeeSalary);

			// STEP 4: clamp grossSalary to that max
			grossSalary = Math.min(grossSalary, maxGrossSalary);

			// STEP 5: calculate vacation cost (based on grossSalary)
			vacationCost =
				selectedIncomeTab === 'fixed'
					? (grossSalary * 0.008 * employerFeeSalary * vacationDays) / 12
					: (grossSalary * 0.054 * employerFeeSalary * vacationDays) / 12;

			// STEP 6: calculate total salary cost (grossSalary × employer fee)
			const salaryCost = grossSalary * employerFeeSalary;

			// STEP 7: recompute how much is left after salary + vacation
			const totalUsed = salaryCost + vacationCost;
			const availableForSavings = Math.max(availableForSalaryAndVacation - totalUsed, 0);

			// STEP 8: set outputs
			calculatedSavings = availableForSavings;

			// STEP 9: pension & salary net calculation
			if (grossSalary > 0) {
				totalPension = +$incomeData.pension + +$incomeData.pension * pensionTax;
				totalSalary = Math.round(calculateIncomeWithPayrollTax(grossSalary - totalPension));
			}

			console.log('Max Gross Salary (before employer fees):', maxGrossSalary);
			console.log('Pension cost (with employer fees):', pensionCost);
			console.log('Vacation cost:', vacationCost);
			console.log('Salary cost (with employer fees):', salaryCost);
			console.log('Savings:', calculatedSavings);
		}
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

		<GrossSalary
			salary={grossSalary}
			maxSalary={maxGrossSalary}
			onSalaryChange={(newSalary) => (grossSalary = newSalary)}
		/>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Expenses on:total={getTotalExpenses} />
			<Car bind:value={car} bind:choice={$incomeData.carChoice} />
			<Pension bind:value={$incomeData.pension} />
			<Savings {calculatedSavings} />

			<Vacation bind:choice={vacationDays} fixed={selectedIncomeTab === 'fixed'} {vacationCost} />

			<Insurance bind:value={insurance} />
		</div>
	</div>
{/if}
§
