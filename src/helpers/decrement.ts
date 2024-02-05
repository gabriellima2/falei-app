export function decrement(value: string, limit = 1) {
	let formattedValue = Number(value);
	if (isNaN(formattedValue) || limit === 1) return value;
	return (--formattedValue).toString();
}
