export function decrement(value: string, limit = 1) {
	let formattedValue = Number(value);
	if (isNaN(formattedValue) || formattedValue === limit) return value;
	return (--formattedValue).toString();
}
