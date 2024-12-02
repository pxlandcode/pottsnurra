<script lang="ts">
	export let id: string;
	export let value: string;
	export let label = '';
	export let placeholder = '';
	export let large = false;
</script>

<div class="form-control w-full">
	{#if label}
		<label class="label" for={id}>
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		bind:value
		type="text"
		{placeholder}
		class="input input-bordered w-full bg-transparent"
		class:large
	/>
</div>

<style lang="postcss">
	.large {
		@apply input-lg;
	}
</style>
