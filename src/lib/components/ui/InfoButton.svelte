<script lang="ts">
	import { tooltip } from '$lib/actions/tooltip';
	export let info: string = 'Info tooltip';
	export let preferred: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
	export let delay = 0;
	export let clickable = true;
</script>

<button
	use:tooltip={{
		content: info,
		preferred,
		delay,
		clickable
	}}
	class="flex h-6 w-6 items-center justify-center rounded-full border border-secondary bg-transparent text-secondary font-bold text-xs hover:opacity-80 cursor-help"
>
	i
</button>
