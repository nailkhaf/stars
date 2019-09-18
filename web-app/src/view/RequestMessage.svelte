<script>
	export let address;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function onRequest() {
		fetch('/requestValidation',	{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({address})
			})
			.then(response => response.json())
			.then(json => dispatch('receiveMessage', {message: json}))
			.catch(error => console.error(error))
	}
</script>

<button on:click={onRequest}>Add a new star</button>

<style>
	button {
		margin-top: 16px;
		width: 100%;
		text-align: center;
		background: var(--violet);
		padding: 9px;
		color: var(--white);
		border: none !important;
		border-radius: 4px;
		margin-bottom: 30px;
	}
</style>
