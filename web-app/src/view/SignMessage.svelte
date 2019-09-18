<script>
	export let message;
	export let address;

	import Timer from "./Timer.svelte"

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let timerFinish = false
	let signature = ''
	let star = ''
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
		<div>
			<h3>Add a new star</h3>
			<button on:click={onReset}>Reset</button>
		</div>
<form on:submit={onSubmit}>
	<h4>Please, sign message:</h4>
	<Timer startTimer={message.split(":")[1]} duration={0.5 * 60} on:timerFinish={onTimerFinish}/>
	<p>address: {address}</p>
	<p>message: {message}</p>

	<label>
		signature:
		<input bind:value={signature} disabled={state !== 'edit'}/>
	</label>

	<label>
		star:
		<input bind:value={star} disabled={state !== 'edit'}/>
	</label>

	<button type="submit" disabled={!timerFinish || signature === "" || star === "" || state !== 'edit'}>
		Add star
	</button>
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
		left:0;
		right: 0;
		bottom:0;
		z-index: 9;
		background: rgba(0,0,0,.8);
	}
</style>
