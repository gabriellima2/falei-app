import { TestingLibraryEl } from "@/@types/testing-library-el";
import { act, fireEvent } from "@testing-library/react-native";

type SimulateFormSubmitParams = {
	fields: {
		el: TestingLibraryEl;
		value: string;
	}[];
	buttonEl: TestingLibraryEl;
};

export function simulateFormSubmit(params: SimulateFormSubmitParams) {
	const { buttonEl, fields } = params;
	act(() => {
		fields.forEach((field) => {
			fireEvent.changeText(field.el, field.value);
		});
		fireEvent.press(buttonEl);
	});
}
