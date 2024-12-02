<script lang="ts">
	import '../app.css';
	import Logotype from '$widgets/Logotype.svelte';
</script>

<div class="container max-w-6xl p-4 mx-auto">
	<Logotype src="/zefyr_logo.png" />
	<slot />
</div>
