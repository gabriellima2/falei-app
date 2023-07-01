import { fireEvent, screen } from "@testing-library/react-native";

import { Field, type FieldProps } from "./Field";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const FIELD_LABEL_ID = "any_id";
const FIELD_LABEL_TEXT = "any_text";
const FIELD_INPUT_PLACEHOLDER = "any_placeholder";
const FIELD_ERROR_MESSAGE = "any_message";

const defaultProps: FieldProps = {
	labelText: FIELD_LABEL_TEXT,
	labelId: FIELD_LABEL_ID,
};
const renderComponent = (props: FieldProps = defaultProps) =>
	renderWithThemeProvider(
		<Field placeholder={FIELD_INPUT_PLACEHOLDER} {...props} />
	);

describe("<Field />", () => {
	const getLabelEl = () => screen.getByText(FIELD_LABEL_TEXT);
	const getInputEl = () => screen.getByPlaceholderText(FIELD_INPUT_PLACEHOLDER);
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const labelEl = getLabelEl();
			const inputEl = getInputEl();

			expect(labelEl).toBeTruthy();
			expect(labelEl.props.nativeID).toBe(FIELD_LABEL_ID);
			expect(inputEl).toBeTruthy();
			expect(inputEl.props.accessibilityLabelledBy).toBe(FIELD_LABEL_ID);
			expect(inputEl.props["aria-labelledby"]).toBe(FIELD_LABEL_ID);
			expect(inputEl.props.isInvalid).toBeFalsy();
			expect(screen.queryByText(FIELD_ERROR_MESSAGE)).toBeFalsy();
		});
		it("should render correctly when has error message", () => {
			renderComponent({ ...defaultProps, errorMessage: FIELD_ERROR_MESSAGE });

			const labelEl = getLabelEl();
			const inputEl = getInputEl();

			expect(labelEl).toBeTruthy();
			expect(labelEl.props.nativeID).toBe(FIELD_LABEL_ID);
			expect(inputEl).toBeTruthy();
			expect(inputEl.props.accessibilityLabelledBy).toBe(FIELD_LABEL_ID);
			expect(inputEl.props["aria-labelledby"]).toBe(FIELD_LABEL_ID);
			expect(inputEl.props.isInvalid).toBeTruthy();
			expect(screen.getByText(FIELD_ERROR_MESSAGE)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Input", () => {
			it("should pass the typed value to the onChangeText function", () => {
				const typedValue = "any_value";
				const onChangeText = jest.fn();
				renderComponent({ ...defaultProps, onChangeText });

				const inputEl = getInputEl();
				fireEvent.changeText(inputEl, typedValue);

				expect(onChangeText).toHaveBeenCalledWith(typedValue);
			});
		});
	});
});
