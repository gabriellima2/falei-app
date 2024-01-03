import { act, fireEvent, screen } from "@testing-library/react-native";

import { PasswordField, type PasswordFieldProps } from "./PasswordField";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: PasswordFieldProps = {
	labelId: "any_id",
	labelText: "any_text",
	placeholder: "any_placeholder",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<PasswordField {...props} />);

describe("<PasswordField />", () => {
	const { labelId, labelText, placeholder } = defaultProps;

	const getInputEl = () => screen.getByPlaceholderText(placeholder!);
	const getToggleButtonEl = () => screen.getByRole("button");
	const getErrorEl = () => screen.queryByRole("alert");
	const getErrorText = (text: string) => screen.queryByText(text);

	describe("Render", () => {
		const errorMessage = "any_error";

		function expectFieldElToHaveBeenPresent() {
			const inputEl = getInputEl();
			expect(inputEl).toBeTruthy();
			expect(screen.getByText(labelText)).toBeTruthy();
		}

		function expectDefaultPropsToHaveBeenPresent() {
			const props = getInputEl().props;
			expect(props.returnKeyType).toBe("send");
			expect(props.accessibilityLabelledBy).toBe(labelId);
		}

		it("should render correctly with default props", () => {
			renderComponent();

			const props = getInputEl().props;

			expectFieldElToHaveBeenPresent();
			expectDefaultPropsToHaveBeenPresent();
			expect(getToggleButtonEl()).toBeTruthy();

			expect(props.isInvalid).toBeFalsy();
			expect(getErrorEl()).toBeFalsy();
			expect(getErrorText(errorMessage)).toBeFalsy();
		});
		it("should render correctly with 'error-message' filled", () => {
			renderComponent({ ...defaultProps, errorMessage });

			const props = getInputEl().props;

			expectFieldElToHaveBeenPresent();
			expectDefaultPropsToHaveBeenPresent();
			expect(props.isInvalid).toBeTruthy();
			expect(getErrorEl()).toBeTruthy();
			expect(getErrorText(errorMessage)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		const typedValue = "any_value";

		describe("Input", () => {
			it("should pass the typed value to the 'on-change-text' function", () => {
				const onChangeText = jest.fn();
				renderComponent({ ...defaultProps, onChangeText });

				fireEvent.changeText(getInputEl(), typedValue);

				expect(onChangeText).toHaveBeenCalledWith(typedValue);
			});
		});
		describe("Press", () => {
			function pressToggleButton() {
				const buttonEl = getToggleButtonEl();
				act(() => {
					fireEvent.press(buttonEl);
				});
			}

			it("should show the password value when toggle button is pressed once", () => {
				renderComponent();

				const inputEl = getInputEl();
				pressToggleButton();

				expect(screen.getByLabelText("Ocultar senha")).toBeTruthy();
				expect(inputEl.props.secureTextEntry).toBeFalsy();
			});
			it("should hide the password value when toggle button is pressed twice", () => {
				renderComponent();

				const inputEl = getInputEl();
				pressToggleButton();
				pressToggleButton();

				expect(screen.getByLabelText("Mostrar senha")).toBeTruthy();
				expect(inputEl.props.secureTextEntry).toBeTruthy();
			});
		});
	});
});
