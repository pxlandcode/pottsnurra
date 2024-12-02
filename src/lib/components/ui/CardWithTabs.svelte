<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	export let tabOptions: any[] = [];
	const dispatch = createEventDispatcher();

	let clickedTab = '';

	function selectTab(tabId: string) {
		clickedTab = tabId;
		tabOptions = tabOptions.map((tab) => ({
			...tab,
			selected: tab.id === tabId
		}));
		clickedTab = '';
		dispatch('tabChange', tabId);
	}
</script>

<div class="w-full">
	{#if tabOptions.length > 0}
		<div class="flex">
			{#each tabOptions as tab, index}
				<button
					on:click={() => selectTab(tab.id)}
					class={`px-8 py-2 font-semibold text-lg transition duration-200 
                        ${
													tab.selected
														? ' bg-primary text-white  hover:bg-primary-hover'
														: ' text-secondary  bg-slate-500/5 hover:bg-darkHover'
												}
                        ${index === 0 ? 'rounded-tl-xl' : ''}
                        ${index === tabOptions.length - 1 ? 'rounded-tr-xl' : ''}`}
					in:scale={{ duration: 200 }}
					out:scale={{ duration: 200 }}
					style={tab.id === clickedTab ? 'transform: scale(0.95);' : ''}
				>
					{tab.label}
				</button>
			{/each}
		</div>
	{/if}

	<div class="p-4 shadow-xl rounded-tl-none rounded-xl bg-slate-500/5">
		<slot />
	</div>
</div>

<style>
	button {
		transition: all 0.3s ease;
	}
	button:active {
		transform: scale(0.95);
	}
</style>
