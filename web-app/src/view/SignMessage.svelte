<script>
	export let message;
	export let address;

	import Timer from "./Timer.svelte"

	let timerFinish = false
	let signature = ''
	let star = ''

	function onTimerFinish() {
		timerFinish = true
	}

	function onSubmit() {
		fetch('/submitstar',	{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({address, message, signature, star})
			})
			.then(response => response.json())
			.then(json => console.log("Block added"))
			.catch(error => console.error(error))
	}

</script>

<form on:submit={onSubmit}>
	<h3>Please, sign message:</h3>
	<Timer startTimer={message.split(":")[1]} duration={5 * 60} on:timerFinish={onTimerFinish}/>
	<p>address: {address}</p>
	<p>message: {message}</p>

	<label>
		signature:
		<input bind:value={signature}/>
	</label>

	<label>
		star:
		<input bind:value={star}/>
	</label>

	<button type="submit" disabled={!timerFinish || signature=== "" || star === ""}>
		Add star
	</button>
</form>
