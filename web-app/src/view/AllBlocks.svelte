<script>
	let blocks = [];

	import { onMount } from 'svelte';

	onMount(() => {
		onUpdate()
	})

	function onUpdate() {
		blocks = []
		updateBlocks(0)
	}

	function updateBlocks(counter) {
		fetch(`/block/${counter}`, {method: 'GET'})
			.then(response => response.json())
			.then(data => blocks = [...blocks, data])
			.then(() => updateBlocks(++counter))
	}

</script>

<h3>All Blocks:</h3>

<button on:click={onUpdate}>update</button>

<table>
	<tr>
	    <th>height</th>
	    <th>hash</th>
	    <th>prev hash</th>
	    <th>time</th>
	</tr>
	{#each blocks as block, i}
	<tr>
	    <th>{block.height}</th>
	    <th>{block.hash.slice(0, 6)}</th>
	    <th>{(block.previousBlockHash ? block.previousBlockHash : "null").slice(0, 6)}</th>
	    <th>{block.time}</th>
	</tr>
	{/each}
</table>
