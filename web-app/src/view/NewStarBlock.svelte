<script>
	export let address;

	import RequestMessage from "./RequestMessage.svelte"
	import SignMessage from "./SignMessage.svelte"

	let message = null

	function onReceiveMessage(event) {
		message = event.detail.message
	}

</script>

{#if !message}
	<RequestMessage address={address} on:receiveMessage={onReceiveMessage}/>
{/if}

{#if message}
	<SignMessage message={message} address={address}/>
{/if}
