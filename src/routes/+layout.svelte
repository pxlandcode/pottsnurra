<script lang="ts">
	import '../app.css';
	import Logotype from '$widgets/Logotype.svelte';
	import ToastContainer from '$lib/components/ui/toast/ToastContainer.svelte';
</script>

<div class="container max-w-6xl p-4 mx-auto">
	<div class="flex flex-row justify-center my-8">
		<h1 class="text-8xl">Pottsnurran</h1>
	</div>

	<slot />
	<div class="mt-8 w-full flex flex-row justify-end">
		<p class="text-xs">Uppdaterad 28 Maj, 2025</p>
	</div>
</div>

<ToastContainer />
