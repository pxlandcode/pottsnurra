<script lang="ts">
	export let src: string;
	export let alt = '';
</script>

<div class="flex justify-center w-4/5 max-w-sm mx-auto my-8">
	<img {src} {alt} />
</div>
