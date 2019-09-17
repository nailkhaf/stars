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

<button on:click={onRequest}>Request message</button>
