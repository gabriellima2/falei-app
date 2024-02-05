export function increment(value: string, limit = 10) {
	let formattedValue = Number(value);
	if (isNaN(formattedValue) || formattedValue === limit) return value;
	return (++formattedValue).toString();
}
