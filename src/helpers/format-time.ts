export function formatTime(hour: number, minutes: number) {
	return `${hour.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
}
