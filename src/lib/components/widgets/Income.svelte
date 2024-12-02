<script>
	import { formatterToSek } from '$lib/helpers';
	import Card from '$ui/Card.svelte';
	import NumberField from '$ui/NumberField.svelte';
	import Output from '$ui/Output.svelte';

	export let value = '';
</script>

<Card header="Intäkt till pott">
	<NumberField id="income" placeholder="Ange intäkt..." bind:value large center />
	<Output>
		{formatterToSek.format(+value)}/mån
	</Output>
</Card>
