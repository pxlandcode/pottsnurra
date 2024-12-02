<script lang="ts">
	export let key: string;
	export let value: string;
</script>

<div class="flex justify-between py-2">
	<div class="pl-2 text-secondary">{key}</div>
	<div class="self-end pr-2 font-medium">{value}</div>
</div>
