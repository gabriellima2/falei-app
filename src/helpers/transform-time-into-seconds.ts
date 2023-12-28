const TOTAL_SECONDS_IN_AN_MINUTE = 60;
const TOTAL_SECONDS_IN_AN_HOUR = 3600;

export function transformTimeIntoSeconds(hour: number, minutes: number) {
	const currentHourInSeconds = hour * TOTAL_SECONDS_IN_AN_HOUR;
	const currentMinutesInSeconds = minutes * TOTAL_SECONDS_IN_AN_MINUTE;
	return currentHourInSeconds + currentMinutesInSeconds;
}
