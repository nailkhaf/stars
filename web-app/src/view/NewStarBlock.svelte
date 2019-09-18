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

	<RequestMessage address={address} on:receiveMessage={onReceiveMessage}/>

{#if message}
	<SignMessage message={message} address={address} on:starAdded={onStarAdded} on:reset={reset} />
{/if}
