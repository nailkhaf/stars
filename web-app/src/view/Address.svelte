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
		<input bind:value={address} disabled={state === "submit"}/>
	</label>

	{#if state === "submit"}
		<button type="button" class="button-edit" on:click={onEdit}></button>
	{/if}

	{#if state === "edit"}
		<button type="submit" class="button-submit" disabled={!address || address === ""}></button>
	{/if}

</form>

<style>
	input {
		height: 36px;
		width:100%;
		border: 1px solid var(--border);
		box-sizing: border-box;
		border-radius: 4px;
	}

	input:hover, input:focus {
		border: 1px solid #5275FF;
		outline: none;
	}

	input:disabled {
		background-color: #E5EAFF;
		border: 1px solid #E5EAFF;
	}

	button {
		width: 36px;
		height: 36px;
		background-color: #5275FF;
		box-sizing: border-box;
		border-radius: 4px;
		border: 0px;
	}

	button:disabled {
		background-color: #E5EAFF;
	}

	.button-edit {
		margin-left: 10px;
		background-repeat: no-repeat;
		background-image: url(/Edit.svg);
		background-position: center center;
	}

	.button-submit {
		margin-left: 10px;
		background-repeat: no-repeat;
		background-image: url(/Success.svg);
		background-position: center center;
	}

	form {
		display: flex;
	}

</style>
