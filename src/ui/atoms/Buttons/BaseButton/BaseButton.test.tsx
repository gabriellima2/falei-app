import { screen } from "@testing-library/react-native";

import { BaseButton, BaseButtonProps } from "./BaseButton";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { FakeIconComponent } from "@/test-utils/fake-icon-component";
import { hasTextElement } from "@/test-utils/has-text-element";

const BUTTON_TEXT = "any_text";

const renderComponent = (props?: BaseButtonProps) =>
	renderWithThemeProvider(<BaseButton {...props}>{BUTTON_TEXT}</BaseButton>);

describe("<BaseButton />", () => {
	describe("Render", () => {
		const BUTTON_LEFT_ICON = "any_left_icon";
		const BUTTON_RIGHT_ICON = "any_right_icon";

		function expectBaseButtonToBePresent() {
			expect(screen.getByText(BUTTON_TEXT)).toBeTruthy();
		}

		it("should render correctly with only text", () => {
			renderComponent();

			expectBaseButtonToBePresent();
			expect(hasTextElement(BUTTON_LEFT_ICON)).toBeFalsy();
			expect(hasTextElement(BUTTON_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with text and left-icon", () => {
			renderComponent({
				leftIcon: () => <FakeIconComponent icon={BUTTON_LEFT_ICON} />,
			});

			expectBaseButtonToBePresent();
			expect(hasTextElement(BUTTON_LEFT_ICON)).toBeTruthy();
			expect(hasTextElement(BUTTON_RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with text and right-icon", () => {
			renderComponent({
				rightIcon: () => <FakeIconComponent icon={BUTTON_RIGHT_ICON} />,
			});

			expectBaseButtonToBePresent();
			expect(hasTextElement(BUTTON_LEFT_ICON)).toBeFalsy();
			expect(hasTextElement(BUTTON_RIGHT_ICON)).toBeTruthy();
		});
	});
});
