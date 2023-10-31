import { useEffect, useState } from "react";

export type UseCheckParams = {
	value: string;
	onChange?: (value: string) => Promise<void> | void;
};

type UseCheckReturn = {
	currentValue: string;
	handlePress: (value: string) => void;
};

export function useCheck(params: UseCheckParams): UseCheckReturn {
	const { value, onChange } = params;
	const [currentValue, setCurrentValue] = useState(value);

	const handlePress = (newValue: string) => setCurrentValue(newValue);

	useEffect(() => {
		if (!onChange) return;
		onChange(currentValue);
	}, [currentValue]);

	return {
		currentValue,
		handlePress,
	};
}
