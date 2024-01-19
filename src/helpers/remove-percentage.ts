export function removePercentage(value: string): number {
	const indexOfPercentage = value.indexOf("%");
	const hasPercentage = indexOfPercentage !== -1;
	const valueWithoutPercentage =
		hasPercentage && value.slice(0, indexOfPercentage);
	return Number(valueWithoutPercentage || value);
}
