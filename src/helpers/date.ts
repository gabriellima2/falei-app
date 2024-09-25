import { millisecondsToSeconds, secondsToMinutes } from 'date-fns'
import { secondsInMinute } from 'date-fns/constants'

export function parseTimestamp(timestamp: Timestamp): Date {
	return new Date(timestamp.seconds * 1000)
}

export function formatDurationTime(durationTotal: number) {
	const seconds = millisecondsToSeconds(durationTotal)
	if (seconds < secondsInMinute) {
		return `${seconds} seg.`
	}
	const minutes = secondsToMinutes(seconds)
	return `${minutes} min.`
}
