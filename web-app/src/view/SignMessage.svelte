<script>
	export let message;
	export let address;

	import Timer from "./Timer.svelte"

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let timerFinish = false
	let signature = ''
	let star = {
		dec: "",
		ra: "",
		story: "",
	}
	let state = 'edit'

	function onTimerFinish() {
		timerFinish = true
	}

	function onSubmit(event) {
		event.preventDefault()
		state = 'submit'
		fetch('/submitstar',{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({address, message, signature, star})
			})
			.then(response => response.json())
			.then(json => console.log("Block added"))
			.then(() => dispatch('starAdded'))
			.catch(error => console.error(error))
	}

	function onReset() {
		dispatch('reset');
	}

</script>

<div class='wrapper'>
	<div class='modal'>

		<div class="title">
			<h3 class="inline">Please, sign message</h3>
			<button class="close" on:click={onReset}></button>
		</div>

		<div class="delimiter"></div>

		<form on:submit={onSubmit}>
			<p class="beautiful-font">Address: <span class="grey-text">{address}</span></p>
			<p class="beautiful-font">Message: <span class="grey-text">{message}</span></p>

			<label class="beautiful-font" for="signature-input">Signature:</label>
			<input id="signature-input" class="signature" bind:value={signature} disabled={state !== 'edit'}/>

			<p class="beautiful-font">Star data:</p>

			<label class="beautiful-font">dec:
				<input class="star-field" bind:value={star.dec} disabled={state !== 'edit'}/>
			</label>

			<label class="beautiful-font">ra:
				<input class="star-field" bind:value={star.ra} disabled={state !== 'edit'}/>
			</label>

			<label class="beautiful-font">story:
				<input class="star-field" bind:value={star.story} disabled={state !== 'edit'}/>
			</label>

			<div class="timer-add">
			<Timer startTimer={message.split(":")[1]} duration={5 * 60} on:timerFinish={onTimerFinish}/>

			<button class="add-button" type="submit" disabled={timerFinish || signature === "" || star === {} || state !== 'edit'}>
				Add
			</button>

			</div>
		</form>
	</div>
</div>
<div class='blur' />

<style>
	.wrapper {
		position: fixed;
		z-index: 10;
		overflow: hidden;
		top: 0;
		left:0;
		right: 0;
		bottom:0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal {
		max-width: 500px;
		min-width: 340px;
		width: 100%;
		border-radius: 8px;
		background-color: var(--white);
		box-shadow: 0 6px 32px rgba(21,24,31,.03);
	}

	form {
		padding: 20px;
	}

	.blur {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background: rgba(0,0,0,.6);
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		margin: 0 0 0 0;
	}

	.inline {
		display: inline;
		margin: 0;
	}

	.delimiter {
		width: 100%;
		border: 0.2px solid var(--border);
	}

	p {
		margin: 0 0 16px 0;
	}

	.signature {
		display: block;
		width: 100%;
	}

	.star-field {
		width: 80%;
	}

	input {
		margin-top: 8px;
		height: 32px;
		border: 1px solid var(--border);
		color: var(--grey);
		box-sizing: border-box;
		border-radius: 4px;
	}

	input:hover, input:focus {
		border: 1px solid #5275FF;
		outline: none;
	}

	.add-button {
		width: 82px;
		height: 32px;
		padding: 0;
		margin: 0 0 0 16px;
		color: var(--white);
		text-align: center;
		background-color: #5275FF;
		box-sizing: border-box;
		border-radius: 4px;
		border: 0px;
	}

	.add-button:disabled {
		background-color: #E5EAFF;
	}

	.close {
		width: 12px;
		height: 12px;
		border: none;
		padding: 0;
		margin: 0;
		background-color: none !important;
		background-image: url("/Close.svg");
	}

	.beautiful-font {
		font-family: Rubik;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 17px;
		color: var(--black);
	}

	.grey-text {
		color: var(--grey);
	}

	.timer-add {
		margin-top: 16px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

</style>
