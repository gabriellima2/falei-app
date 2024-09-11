import { DAYS_OF_THE_WEEK } from '@/constants/utils'

export function getDayOfTheWeek(day: number) {
	const isWeekOver = day === 7
	return DAYS_OF_THE_WEEK[isWeekOver ? 0 : day]
}

export function formatTime(hour: number, minutes: number) {
	return `${hour.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}`
}

export function timestampToDate(timestamp: Timestamp): Date {
	return new Date(timestamp.seconds * 1000)
}
