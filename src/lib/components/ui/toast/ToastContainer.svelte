<script lang="ts">
	import { removeToast, toasts } from '$lib/store/toastStore';
	import Toast from './Toast.svelte';
</script>

<div class="fixed bottom-4 left-4 z-[9999] flex flex-col-reverse items-end gap-2 space-y-2">
	{#each $toasts as { id, type, message, description } (id)}
		<Toast {id} {type} {message} {description} on:close={() => removeToast(id)} />
	{/each}
</div>
