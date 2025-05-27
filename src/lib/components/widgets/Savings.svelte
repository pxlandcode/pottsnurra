<script lang="ts">
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import Output from '$ui/Output.svelte';

	export let calculatedSavings: number;
</script>

<Card header="Sparande">
	<p class="pb-4">Kan användas till extra ledighet, arbetsrelaterade inköp, löneväxling etc.</p>
	<Output>
		{formatterToSek.format(calculatedSavings)}
	</Output>
</Card>
