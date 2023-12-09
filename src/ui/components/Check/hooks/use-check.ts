import { useEffect, useState } from "react";

export type UseCheckParams = {
	initialValue: string;
	multipleValues?: boolean;
	toggle?: boolean;
	onChange?: (values: string[]) => Promise<void> | void;
};

type UseCheckReturn = {
	values: string[];
	handlePress: (newValue: string) => void;
	isChecked: (value: string) => boolean;
};

export function useCheck(params: UseCheckParams): UseCheckReturn {
	const { initialValue, multipleValues, toggle, onChange } = params;
	const [currentValues, setCurrentValues] = useState([initialValue]);

	const isAlreadyCheckedValue = (value: string) => {
		return currentValues.includes(value);
	};

	const removeCheckedValue = (checkedValue: string) => {
		return currentValues.filter((value) => value !== checkedValue);
	};

	const updateCheckedValues = (newValue: string) => {
		if (isAlreadyCheckedValue(newValue) && toggle) {
			return setCurrentValues(removeCheckedValue(newValue));
		}
		if (multipleValues) {
			return setCurrentValues((prevState) => [...prevState, newValue]);
		}
		setCurrentValues([newValue]);
	};

	useEffect(() => {
		if (!onChange) return;
		onChange(currentValues);
	}, [currentValues]);

	return {
		values: currentValues,
		handlePress: updateCheckedValues,
		isChecked: isAlreadyCheckedValue,
	};
}