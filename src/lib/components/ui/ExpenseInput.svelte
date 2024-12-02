<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<div class="flex items-center gap-1">
	<input class="w-2/3 input" type="text" bind:value={label} placeholder="Beskrivning" />
	<input class="w-1/3 input" type="number" bind:value placeholder="kr" on:input />
	<button class="text-xl text-primary btn btn-secondary btn-sm btn-ghost" on:click>&times;</button>
</div>
