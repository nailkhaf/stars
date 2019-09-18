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

	<h3>My Stars</h3>
	<button on:click={updateStars}></button>

	{#if stars.length === 0}
		<p>Yet empty</p>
	{/if}
	
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

	button {
		width: 16px;
		height: 16px;
		background-image: url("/Refresh.svg");
		background-color: #00000000;
		border: none;
		background-repeat: no-repeat;
		padding-top: 16px;
		margin-left: 16px;
	}

	h3 {
		display: inline;
		margin-top: px;
	}	

	.container {
		margin-top: 16px;
	}
</style>
