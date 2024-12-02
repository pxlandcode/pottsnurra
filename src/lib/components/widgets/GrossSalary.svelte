<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';

	export let salary: number;
</script>

<Card header="Möjlig bruttolön">
	<div class="flex flex-col items-center gap-2">
		<span class="text-4xl font-medium text-primary">
			{formatterToSek.format(salary)}/mån
		</span>
	</div>
</Card>
