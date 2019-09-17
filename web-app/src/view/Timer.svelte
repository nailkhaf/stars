<script>
	export let startTimer;
	export let duration;

	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const start = parseInt(startTimer)
	let timerId
	let timer

	onMount(() => {
		updateTimer()
		timerId = setInterval(() => updateTimer(), 1000)
	})

	onDestroy(() => {
		clearInterval(timerId)
	})

	function updateTimer() {
		const currentTime = parseInt(new Date()
			.getTime()
			.toString()
			.slice(0, -3))

		timer = Math.max(0, duration - (currentTime - startTimer))
		if (timer === 0) {
			dispatch('timerFinish')
			clearInterval(timerId)
		}
	}

</script>

<p>left time: <span>{timer}</span> sec</p>
