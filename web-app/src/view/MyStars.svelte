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

<div class="container">

	<div class='row'>
		<h3>My Stars</h3>
		<button class="update" on:click={updateStars}></button>
	</div>
	
	{#if stars.length !== 0}
		<ul>
			{#each stars as star, i}
				<li>
					⭐️  {star}
				</li>
			{/each}
		</ul>
	{/if}
	
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
</style>
