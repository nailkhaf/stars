<script>
	import Address from "./Address.svelte"
	import NewStarBlock from "./NewStarBlock.svelte"

	let address = null

	function onAddressChange(event) {
		address = event.detail.address
	}

</script>

<h3>Add new star</h3>
<Address on:addressChange={onAddressChange}/>

{#if address}
	<NewStarBlock address={address}/>
{/if}
