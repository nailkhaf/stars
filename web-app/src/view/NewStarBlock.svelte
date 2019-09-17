<script>
	export let address;

	import RequestMessage from "./RequestMessage.svelte"
	import SignMessage from "./SignMessage.svelte"
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let message = null

	function onReceiveMessage(event) {
		message = event.detail.message
	}

	function onStarAdded() {
		dispatch('newStarAdded')
		reset()
	}

	function reset() {
		message = null
	}

</script>

<h3>Add New Star</h3>

{#if !message}
	<RequestMessage address={address} on:receiveMessage={onReceiveMessage}/>
{/if}

{#if message}
	<button on:click={reset}>reset</button>
	<SignMessage message={message} address={address} on:starAdded={onStarAdded}/>
{/if}
