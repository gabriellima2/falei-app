import { fireEvent, screen } from "@testing-library/react-native";

import { Option, type OptionProps } from "./Option";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: OptionProps = { name: "any_name", value: "any_value" };
const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<Option {...props} />);

const getEl = () => screen.getByTestId("check-option");

describe("<Option />", () => {
	describe("Render", () => {
		const cases = [
			{ isChecked: true, description: "should render correctly when checked" },
			{
				isChecked: false,
				description: "should render correctly when not checked",
			},
		];
		test.each(cases)("%s", ({ isChecked }) => {
			renderComponent({ ...defaultProps, isChecked });

			const props = getEl().props;

			expect(screen.getByText(defaultProps.name)).toBeTruthy();
			expect(screen.getByLabelText(defaultProps.name)).toBeTruthy();
			if (isChecked) {
				expect(props.accessibilityState.checked).toBeTruthy();
			} else {
				expect(props.accessibilityState.checked).toBeFalsy();
			}
		});
	});
	describe("Interactions", () => {
		describe("onPress", () => {
			it("should call the onPress function when pressed", () => {
				const mockOnPress = jest.fn();
				renderComponent({ ...defaultProps, onPress: mockOnPress });

				const el = getEl();
				fireEvent.press(el);

				expect(mockOnPress).toHaveBeenCalledTimes(1);
				expect(mockOnPress).toHaveBeenCalledWith(defaultProps.value);
			});
		});
	});
});
