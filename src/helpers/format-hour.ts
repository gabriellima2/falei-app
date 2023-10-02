export function formatHour(hour: string) {
	const [h, m] = hour.split(":");
	return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}
