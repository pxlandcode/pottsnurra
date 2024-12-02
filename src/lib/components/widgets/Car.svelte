<script lang="ts">
	import { slide } from 'svelte/transition';
	import { formatterToSek } from '$lib/helpers';
	import CarKeyVal from '$ui/CarKeyVal.svelte';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	type Car = {
		id: number;
		brand: string;
		price: number;
		benefitValue: number;
		employeeBenefitValue: number;
	};

	export let value = 0;
	export let choice: number;

	const residualValue = 48;
	const deposit = 15;
	const leasingTime = 36;
	const milagePerYear = '1 500';

	const cars: Car[] = [
		{
			id: 1,
			brand: 'Nissan Leaf 40kwh Acenta',
			price: 400000,
			benefitValue: 3500,
			employeeBenefitValue: 1100
		},
		{
			id: 2,
			brand: 'Tesla Model 3',
			price: 630000,
			benefitValue: 6000,
			employeeBenefitValue: 1900
		}
	];

	$: car = choice ? cars.find((c) => c.id === choice) : null;
	$: value = car ? car.benefitValue + car.employeeBenefitValue : 0;
</script>

<Card header="Förmånsbil">
	<div class="join">
		<input
			class="flex-1 join-item btn"
			type="radio"
			bind:group={choice}
			value={0}
			aria-label="Ingen"
		/>
		<input
			class="flex-1 join-item btn"
			type="radio"
			bind:group={choice}
			value={1}
			aria-label="Small"
		/>
		<input
			class="flex-1 join-item btn"
			type="radio"
			bind:group={choice}
			value={2}
			aria-label="Medium"
		/>
	</div>

	{#if choice !== 0}
		<div transition:slide>
			<p class="p-4 text-sm italic">
				Dessa exempel är endast i illustrativt syfte för att visa hur kostnaden kan se ut.
			</p>

			{#if car}
				<div class="grid grid-cols-1 py-2 divide-y divide-slate-600">
					<CarKeyVal key="Märkte" value={car.brand} />
					<CarKeyVal key="Pris" value={formatterToSek.format(car.price)} />
					<CarKeyVal key="Restvärde" value={`${residualValue}%`} />
					<CarKeyVal key="Handpenning" value={`${deposit}%`} />
					<CarKeyVal key="Leasingtid" value={`${leasingTime} mån`} />
					<CarKeyVal key="Mil per år" value={milagePerYear} />
					<CarKeyVal
						key="Förmånsvärde"
						value={`~${formatterToSek.format(car.benefitValue)}/mån brutto`}
					/>
					<div class="p-2 text-sm italic">Kostnaderna utgår även från miljöbonus på 70 000 kr.</div>
				</div>

				<Output>
					~{formatterToSek.format(car.benefitValue + car.employeeBenefitValue)}/mån
				</Output>
			{/if}
		</div>
	{/if}
</Card>
