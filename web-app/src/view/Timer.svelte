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

	function formatTime(timer) {
		const date = new Date(timer * 1000)
		return `${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
	}

</script>

<p class="blue-text"><span>{formatTime(timer)}</span></p>

<style>
	.blue-text {
		color: var(--violet);
	}
</style>
