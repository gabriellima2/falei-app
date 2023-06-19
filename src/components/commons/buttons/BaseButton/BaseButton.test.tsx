import { screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { BaseButton, BaseButtonProps } from "./BaseButton";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const BUTTON_TEXT = "any_text";
const BUTTON_LEFT_ICON = "any_left_icon";
const BUTTON_RIGHT_ICON = "any_right_icon";

const renderComponent = (props?: BaseButtonProps) =>
	renderWithThemeProvider(<BaseButton {...props}>{BUTTON_TEXT}</BaseButton>);

describe("<BaseButton />", () => {
	describe("Render", () => {
		it("should render correctly with only text", () => {
			renderComponent();

			expect(screen.getByText(BUTTON_TEXT)).toBeTruthy();
			expect(screen.queryByText(BUTTON_LEFT_ICON)).toBeFalsy();
			expect(screen.queryByText(BUTTON_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with text and left-icon", () => {
			renderComponent({ leftIcon: () => <Text>{BUTTON_LEFT_ICON}</Text> });

			expect(screen.getByText(BUTTON_TEXT)).toBeTruthy();
			expect(screen.getByText(BUTTON_LEFT_ICON)).toBeTruthy();
			expect(screen.queryByText(BUTTON_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with text and right-icon", () => {
			renderComponent({ rightIcon: () => <Text>{BUTTON_RIGHT_ICON}</Text> });

			expect(screen.getByText(BUTTON_TEXT)).toBeTruthy();
			expect(screen.queryByText(BUTTON_LEFT_ICON)).toBeFalsy();
			expect(screen.getByText(BUTTON_RIGHT_ICON)).toBeTruthy();
		});
	});
});
