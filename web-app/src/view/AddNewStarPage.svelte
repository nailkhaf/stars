<script>
	import Address from "./Address.svelte"
	import NewStarBlock from "./NewStarBlock.svelte"
	import MyStars from "./MyStars.svelte"
	import AllBlocks from "./AllBlocks.svelte"

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

<style>
	.container {
		width: 360px;
		background-color: #fff;
		padding: 20px;
	}
</style>

<div class="container">

	<h3>My wallet address</h3>
	<Address on:addressChange={onAddressChange}/>

	{#if address}
	<MyStars address={address}/>
	<AllBlocks/>
	{/if}

</div>
