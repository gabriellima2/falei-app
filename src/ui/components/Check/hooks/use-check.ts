export type UseCheckParams = {
	values: string[];
	withMultipleValues?: boolean;
	withToggle?: boolean;
	onChange: (values: string[]) => Promise<void> | void;
};

type UseCheckReturn = {
	handlePress: (newValue: string) => void;
	isChecked: (value: string) => boolean;
};

export function useCheck(params: UseCheckParams): UseCheckReturn {
	const { values, withMultipleValues, withToggle, onChange } = params;

	const isAlreadyCheckedValue = (value: string) => {
		return values.includes(value);
	};

	const removeCheckedValue = (checkedValue: string) => {
		return values.filter((value) => value !== checkedValue);
	};

	const updateCheckedValues = (newValue: string) => {
		if (isAlreadyCheckedValue(newValue) && withToggle) {
			return onChange(removeCheckedValue(newValue));
		}
		if (withMultipleValues) {
			return onChange([...values, newValue]);
		}
		onChange([newValue]);
	};

	return {
		handlePress: updateCheckedValues,
		isChecked: isAlreadyCheckedValue,
	};
}
