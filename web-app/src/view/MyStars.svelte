<script>
	export let address;

	import { onMount } from 'svelte';

	let stars = [];

	onMount(() => {
		updateStars()
	})

	function updateStars() {
		fetch(`/blocks/${address}`, {method: 'GET'})
			.then(response => response.json())
			.then(data => stars = data)
			.catch(error => console.error(error))
	}

</script>

<h3>My Stars:</h3>

<button on:click={updateStars}>update</button>

<ul>
	{#each stars as star, i}
		<li>
			{i + 1}: {star}
		</li>
	{/each}
</ul>
