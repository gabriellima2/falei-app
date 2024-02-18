import { fireEvent, screen } from "@testing-library/react-native";

import { EmailField, type EmailFieldProps } from "./EmailField";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: EmailFieldProps = {
	placeholder: "any_placeholder",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<EmailField {...props} />);

describe("<EmailField />", () => {
	const getInputEl = () =>
		screen.getByPlaceholderText(defaultProps.placeholder!);
	const getErrorEl = () => screen.queryByRole("alert");
	const getErrorText = (text: string) => screen.queryByText(text);

	describe("Render", () => {
		const ERROR_MESSAGE = "any_error";

		function expectFieldElToHaveBeenPresent() {
			const inputEl = getInputEl();
			expect(inputEl).toBeTruthy();
			expect(screen.getByText("Email")).toBeTruthy();
		}

		function expectDefaultPropsToHaveBeenPresent() {
			const props = getInputEl().props;
			expect(props.returnKeyType).toBe("next");
			expect(props.accessibilityLabelledBy).toBe("email");
		}

		it("should render correctly with default props", () => {
			renderComponent();

			const props = getInputEl().props;

			expectFieldElToHaveBeenPresent();
			expectDefaultPropsToHaveBeenPresent();
			expect(props.isInvalid).toBeFalsy();
			expect(getErrorEl()).toBeFalsy();
			expect(getErrorText(ERROR_MESSAGE)).toBeFalsy();
		});
		it("should render correctly with 'error-message' filled", () => {
			renderComponent({ ...defaultProps, errorMessage: ERROR_MESSAGE });

			const props = getInputEl().props;

			expectFieldElToHaveBeenPresent();
			expectDefaultPropsToHaveBeenPresent();
			expect(props.isInvalid).toBeTruthy();
			expect(getErrorEl()).toBeTruthy();
			expect(getErrorText(ERROR_MESSAGE)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Input", () => {
			it("should pass the typed value to the 'on-change-text' function", () => {
				const typedValue = "any_value";
				const onChangeText = jest.fn();
				renderComponent({ ...defaultProps, onChangeText });

				fireEvent.changeText(getInputEl(), typedValue);

				expect(onChangeText).toHaveBeenCalledWith(typedValue);
			});
		});
	});
});
