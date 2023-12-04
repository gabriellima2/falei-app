import { screen } from "@testing-library/react-native";

import { Input, InputProps } from "./Input";

import { hasTextElement } from "@/__mocks__/has-text-element";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const renderComponent = (props?: InputProps) =>
	renderWithThemeProvider(<Input {...props} />);

describe("<Input />", () => {
	describe("Render", () => {
		const LEFT_ICON = "any_left_icon";
		const RIGHT_ICON = "any_right_icon";
		const INVALID_ICON_LABEL = "Campo inválido";

		function expectInputToBePresent() {
			expect(screen.getByTestId("input")).toBeTruthy();
		}

		it("should render correctly without icons", () => {
			renderComponent();

			expectInputToBePresent();
			expect(hasTextElement(LEFT_ICON)).toBeFalsy();
			expect(hasTextElement(RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with left icon", () => {
			renderComponent({
				leftIcon: () => <FakeIconComponent icon={LEFT_ICON} />,
			});

			expectInputToBePresent();
			expect(hasTextElement(LEFT_ICON)).toBeTruthy();
			expect(hasTextElement(RIGHT_ICON)).toBeFalsy();
		});
		it("should render correctly with right icon", () => {
			renderComponent({
				rightIcon: () => <FakeIconComponent icon={RIGHT_ICON} />,
			});

			expectInputToBePresent();
			expect(hasTextElement(LEFT_ICON)).toBeFalsy();
			expect(hasTextElement(RIGHT_ICON)).toBeTruthy();
		});
		it("should render correctly with icons", () => {
			renderComponent({
				leftIcon: () => <FakeIconComponent icon={LEFT_ICON} />,
				rightIcon: () => <FakeIconComponent icon={RIGHT_ICON} />,
			});

			expectInputToBePresent();
			expect(hasTextElement(LEFT_ICON)).toBeTruthy();
			expect(hasTextElement(RIGHT_ICON)).toBeTruthy();
		});
		it("should render alert icon when it is invalid", () => {
			renderComponent({
				isInvalid: true,
				rightIcon: () => <FakeIconComponent icon={RIGHT_ICON} />,
			});

			expect(screen.getByLabelText(INVALID_ICON_LABEL)).toBeTruthy();
			expect(hasTextElement(RIGHT_ICON)).toBeFalsy();
		});
		it("should not render alert icon when it is invalid", () => {
			renderComponent({
				isInvalid: false,
				rightIcon: () => <FakeIconComponent icon={RIGHT_ICON} />,
			});

			expect(screen.queryByLabelText(INVALID_ICON_LABEL)).toBeFalsy();
			expect(hasTextElement(RIGHT_ICON)).toBeTruthy();
		});
	});
});
