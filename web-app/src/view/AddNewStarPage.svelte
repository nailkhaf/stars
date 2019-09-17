<script>
	import Address from "./Address.svelte"
	import NewStarBlock from "./NewStarBlock.svelte"
	import MyStars from "./MyStars.svelte"

	let address = null

	let myStarsUpdater = 0

	function onAddressChange(event) {
		address = event.detail.address
	}

	function reset() {
		const localAddress = address
		address = null
		setTimeout(() => address = localAddress, 10)
	}

</script>

<h3>My wallet address</h3>
<Address on:addressChange={onAddressChange}/>

{#if address}
	<NewStarBlock address={address} on:newStarAdded={reset}/>
{/if}

{#if address}
	<MyStars address={address}/>
{/if}
