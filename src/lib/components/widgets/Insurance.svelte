<script lang="ts">
	import Card from '$ui/Card.svelte';
	import { formatterToSek } from '$lib/helpers';
	import Output from '$ui/Output.svelte';

	export let value: string;
</script>

<Card header="Försäkring">
	<div class="flex flex-col items-center gap-2">
		<p>Schablonkostnad för sjukförsäkring, sjukvårdsförsäkring samt premiebefrielse</p>
	</div>

	<Output>
		{formatterToSek.format(+value)}/mån
	</Output>
</Card>
