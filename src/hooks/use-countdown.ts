import { useCallback, useMemo } from 'react'

import { useInterval } from './use-interval'
import { useBoolean } from './use-boolean'
import { useCounter } from './use-counter'

type CountdownOptions = {
	countStart: number
	interval?: number
	isIncrement?: boolean
	countStop?: number
}

type CountdownControllers = {
	startCountdown: () => void
	stopCountdown: () => void
	resetCountdown: () => void
}

export function useCountdown({
	countStart,
	countStop = 0,
	interval = 1,
	isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
	const {
		count,
		increment,
		decrement,
		reset: resetCounter,
	} = useCounter(countStart)

	const {
		value: isCountdownRunning,
		setTrue: startCountdown,
		setFalse: stopCountdown,
	} = useBoolean(false)

	const resetCountdown = useCallback(() => {
		stopCountdown()
		resetCounter()
	}, [stopCountdown, resetCounter])

	const countdownCallback = useCallback(() => {
		if (count === countStop) {
			stopCountdown()
			return
		}

		if (isIncrement) {
			increment()
		} else {
			decrement()
		}
	}, [count, countStop, decrement, increment, isIncrement, stopCountdown])

	const intervalMs = useMemo(() => interval * 1000, [interval])

	useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

	return [count, { startCountdown, stopCountdown, resetCountdown }]
}
