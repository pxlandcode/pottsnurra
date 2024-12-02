<script lang="ts">
	export let id: string;
	export let value: string;
	export let label = '';
	export let placeholder = '';
	export let large = false;
	export let center = false;
</script>

<div class="w-full form-control">
	{#if label}
		<label class="label" for={id}>
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		bind:value
		type="number"
		{placeholder}
		class="w-full bg-transparent input input-bordered"
		class:large
		class:center
	/>
</div>

<style lang="postcss">
	.large {
		@apply input-lg;
	}

	.center {
		@apply text-center;
	}
</style>
