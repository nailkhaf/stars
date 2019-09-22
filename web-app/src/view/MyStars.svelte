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
			.then(data => stars = data.map(item => item.star))
			.catch(error => console.error(error))
	}

</script>

<div class="container">

	<div class='row'>
		<h3>My Stars</h3>
		<button class="update" on:click={updateStars}></button>
	</div>
	
	<table>
	<tr>
	    <th></th>
	    <th>dec</th>
	    <th>ra</th>
	    <th>story</th>
	</tr>
	{#each stars as star, i}
	<tr>
			<td>⭐️</td>
	    <td>{star.dec}</td>
	    <td>{star.ra}</td>
	    <td>{star.story}</td>
	</tr>
	{/each}
</table>

</div>

<style>

	.row {
		display: flex;
		align-items: center;
	}

	p {
		margin: 0 0 16px;
	}

	.update {
		width: 16px;
		height: 16px;
		background-image: url("/Refresh.svg");
		border: none;
		background-repeat: no-repeat;
		margin:0 0 12px 16px;
	}

	.container {
		margin-top: 16px;
	}

	ul {
		margin: 0;
	}

	li {
		list-style: none;
		margin-bottom: 8px;
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
