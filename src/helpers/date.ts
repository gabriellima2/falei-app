export function parseTimestamp(timestamp: Timestamp): Date {
	return new Date(timestamp.seconds * 1000)
}
