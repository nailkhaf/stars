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
		max-width: 600px;
		min-width: 340px;
		width: 100%;
		background-color: var(--white);
		border-radius: 6px;
		padding: 30px;
	}
</style>

<div class="container">

	<h3>My wallet address</h3>
	<Address on:addressChange={onAddressChange}/>

	{#if address}
	<MyStars address={address}/>
	<NewStarBlock  address="{address}"/>
	<AllBlocks/>
	{/if}

</div>
