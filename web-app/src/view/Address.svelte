<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let address = null
	let state = 'edit'

	function onSubmit(event) {
		event.preventDefault()
		dispatch('addressChange', {address})
		state = 'submit'
	}

	function onEdit() {
		state = 'edit'
	}

</script>

<form on:submit={onSubmit}>

	<label>
		address:
		<input bind:value={address} disabled={state === "submit"}/>
	</label>

	<button type="submit" disabled={!address || state === "submit"}>Submit</button>
	<button type="button" on:click={onEdit}>Edit</button>
</form>
