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

	function formatTimestamp(timestamp) {
		const date = new Date(timestamp)
		return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
	}

</script>

<div class='row'>
	<h3>All Blocks</h3>
	<button on:click={onUpdate} class='update'>update</button>
</div>

<table>
	<tr>
	    <th>height</th>
	    <th>hash</th>
	    <th>prev hash</th>
	    <th>time</th>
	</tr>
	{#each blocks as block, i}
	<tr>
	    <td>{block.height}</td>
	    <td>{block.hash.slice(0, 6)}</td>
	    <td>{(block.previousBlockHash ? block.previousBlockHash : "null").slice(0, 6)}</td>
	    <td>{formatTimestamp(block.time)}</td>
	</tr>
	{/each}
</table>

<style>
	.update {
		width: 16px;
		height: 16px;
		background-image: url("/Refresh.svg");
		border: none;
		background-repeat: no-repeat;
		margin:0 0 12px 16px;
		font-size:0;
	}

	table {
		width: 100%;
	}

	tr {
		border-radius: 4px;
	}

	tr:hover {
		background-color: var(--light-background);
	}

	td {
		color: var(--black);
		text-align: center;
	}

	th {
		background-color: var(--light-background);
		color: #9FAAC4;
		font-size: 12px;
		line-height: 18px;
		padding:7px;
	}



</style>
