<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';

	export let salary: number;
	export let maxSalary: number;

	export let onSalaryChange: (newSalary: number) => void;

	let editing = false;
	let inputValue = salary;

	function handleBlur() {
		editing = false;
		onSalaryChange(Number(inputValue));
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === 'Escape') {
			event.preventDefault();
			handleBlur();
		}
	}
</script>

<Card header="Bruttolön">
	<div class="flex flex-col gap-4">
		{#if maxSalary > 0}
			<div class="mb-4 w-full flex justify-center text-center items-center">
				{#if editing}
					<input
						type="number"
						min="0"
						max={maxSalary}
						bind:value={inputValue}
						on:blur={handleBlur}
						on:keydown={handleKeydown}
						class="text-4xl font-medium text-primary text-right outline-none bg-transparent border-none w-32"
						style="appearance: textfield;"
						autofocus
					/>
				{:else}
					<button
						class="text-4xl font-medium text-primary cursor-pointer text-right w-32"
						on:click={() => {
							inputValue = salary;
							editing = true;
						}}
					>
						{salary}
					</button>
				{/if}
				<span class="text-2xl font-medium text-primary ml-2">kr/mån</span>
			</div>

			<input
				type="range"
				min="0"
				max={maxSalary}
				step="500"
				bind:value={salary}
				on:input={(e) => onSalaryChange(+e.target.value)}
				class="range range-primary mb-2"
			/>
		{:else}
			<p class="text-center">Du har för höga utgifter för din intäkt</p>
		{/if}
	</div>
</Card>
