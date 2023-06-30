import { screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { Input, InputProps } from "./Input";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const INPUT_TESTID = "input";
const INPUT_LEFT_ICON = "any_left_icon";
const INPUT_RIGHT_ICON = "any_right_icon";
const INPUT_INVALID_ICON_LABEL = "Campo inválido";
const renderComponent = (props?: InputProps) =>
	renderWithThemeProvider(<Input {...props} />);

describe("<Input />", () => {
	describe("Render", () => {
		it("should render correctly without icons", () => {
			renderComponent();

			expect(screen.getByTestId(INPUT_TESTID)).toBeTruthy();
			expect(screen.queryByText(INPUT_LEFT_ICON)).toBeFalsy();
			expect(screen.queryByText(INPUT_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with left icon", () => {
			renderComponent({ leftIcon: () => <Text>{INPUT_LEFT_ICON}</Text> });

			expect(screen.getByTestId(INPUT_TESTID)).toBeTruthy();
			expect(screen.getByText(INPUT_LEFT_ICON)).toBeTruthy();
			expect(screen.queryByText(INPUT_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with right icon", () => {
			renderComponent({ rightIcon: () => <Text>{INPUT_RIGHT_ICON}</Text> });

			expect(screen.getByTestId(INPUT_TESTID)).toBeTruthy();
			expect(screen.queryByText(INPUT_LEFT_ICON)).toBeFalsy();
			expect(screen.getByText(INPUT_RIGHT_ICON)).toBeTruthy();
		});
		it("should render correctly with icons", () => {
			renderComponent({
				leftIcon: () => <Text>{INPUT_LEFT_ICON}</Text>,
				rightIcon: () => <Text>{INPUT_RIGHT_ICON}</Text>,
			});

			expect(screen.getByTestId(INPUT_TESTID)).toBeTruthy();
			expect(screen.getByText(INPUT_LEFT_ICON)).toBeTruthy();
			expect(screen.getByText(INPUT_RIGHT_ICON)).toBeTruthy();
		});
		it("should render alert icon when it is invalid", () => {
			renderComponent({
				isInvalid: true,
				rightIcon: () => <Text>{INPUT_RIGHT_ICON}</Text>,
			});

			expect(screen.getByLabelText(INPUT_INVALID_ICON_LABEL)).toBeTruthy();
			expect(screen.queryByText(INPUT_RIGHT_ICON)).toBeFalsy();
		});
		it("should not render alert icon when it is invalid", () => {
			renderComponent({
				isInvalid: false,
				rightIcon: () => <Text>{INPUT_RIGHT_ICON}</Text>,
			});

			expect(screen.queryByLabelText(INPUT_INVALID_ICON_LABEL)).toBeFalsy();
			expect(screen.getByText(INPUT_RIGHT_ICON)).toBeTruthy();
		});
	});
});
