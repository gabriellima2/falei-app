export function getCurrentTime() {
	const date = new Date();
	const hour = `${date.getHours()}:${date.getMinutes()}`;
	return new Date(`1970-01-01T${hour}Z`).getTime();
}
