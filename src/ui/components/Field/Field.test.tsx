import { fireEvent, screen } from "@testing-library/react-native";

import { Field, type FieldProps } from "./Field";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const LABEL_ID = "any_id";
const LABEL_TEXT = "any_text";
const INPUT_PLACEHOLDER = "any_placeholder";
const ERROR_MESSAGE = "any_message";
const DEFAULT_PROPS: FieldProps = {
	labelText: LABEL_TEXT,
	labelId: LABEL_ID,
};

const renderComponent = (props: FieldProps = DEFAULT_PROPS) =>
	renderWithThemeProvider(<Field placeholder={INPUT_PLACEHOLDER} {...props} />);

const getInputEl = () => screen.getByPlaceholderText(INPUT_PLACEHOLDER);

const hasErrorEls = () => {
	const isInvalid = getInputEl().props.isInvalid;
	const hasErrorMessage = screen.queryByText(ERROR_MESSAGE);
	return isInvalid && hasErrorMessage;
};

describe("<Field />", () => {
	describe("Render", () => {
		function expectFieldToBePresent() {
			const labelEl = screen.getByText(LABEL_TEXT);
			const inputEl = getInputEl();

			expect(labelEl).toBeTruthy();
			expect(labelEl.props.nativeID).toBe(LABEL_ID);
			expect(inputEl).toBeTruthy();
			expect(inputEl.props.accessibilityLabelledBy).toBe(LABEL_ID);
			expect(inputEl.props["aria-labelledby"]).toBe(LABEL_ID);
		}

		it("should render correctly", () => {
			renderComponent();

			expectFieldToBePresent();
			expect(hasErrorEls()).toBeFalsy();
		});
		it("should render correctly when has error message", () => {
			renderComponent({ ...DEFAULT_PROPS, errorMessage: ERROR_MESSAGE });

			expectFieldToBePresent();
			expect(hasErrorEls()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Input", () => {
			it("should pass the typed value to the onChangeText function", () => {
				const typedValue = "any_value";
				const onChangeText = jest.fn();
				renderComponent({ ...DEFAULT_PROPS, onChangeText });

				fireEvent.changeText(getInputEl(), typedValue);

				expect(onChangeText).toHaveBeenCalledWith(typedValue);
			});
		});
	});
});
