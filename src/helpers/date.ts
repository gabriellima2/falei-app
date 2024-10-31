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

export function formatRemainingTime(seconds: number) {
	if (seconds < 60) return `${seconds} segundos`
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return remainingSeconds === 0
		? `${minutes} minuto${minutes > 1 ? 's' : ''}`
		: `${minutes} minuto${minutes > 1 ? 's' : ''} e ${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''}`
}
