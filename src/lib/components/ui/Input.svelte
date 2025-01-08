<script lang="ts">
	export let type: 'text' | 'number' = 'text';
	export let value: string | number = '';
	export let placeholder: string = '';
	export let label: string = '';
	export let className: string = '';
</script>

<div class="flex flex-col gap-2 w-full">
	{#if label}
		<label class="text-sm font-medium text-secondary">{label}</label>
	{/if}

	<input class={`w-full input ${className}`} bind:value {placeholder} {...{ type }} />
</div>
