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
</script>

<form on:submit={onSubmit}>
	<h4>Please, sign message:</h4>
	<Timer startTimer={message.split(":")[1]} duration={5 * 60} on:timerFinish={onTimerFinish}/>
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
