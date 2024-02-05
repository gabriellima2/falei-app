import { useState } from "react";

type TDate = Date | undefined;
type UseTimePickerReturn = {
	isShowPicker: boolean;
	showPicker: () => void;
	handleTimeChange: (date: TDate, cb: (date: TDate) => void) => void;
};

export function useTimePicker(): UseTimePickerReturn {
	const [isShowPicker, setIsShowPicker] = useState(false);

	const handleTimeChange = (
		date: Date | undefined,
		cb: (date: Date | undefined) => void
	) => {
		setIsShowPicker(false);
		cb(date);
	};

	const showPicker = () => setIsShowPicker(true);

	return {
		isShowPicker,
		showPicker,
		handleTimeChange,
	};
}
