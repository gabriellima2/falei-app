import { screen } from "@testing-library/react-native";

import { SettingOption, type SettingOptionProps } from "./SettingOption";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";

const defaultProps: SettingOptionProps = {
	text: "any_text",
	href: { pathname: "any_pathname" },
	icon: () => <FakeIconComponent icon="any_icon" />,
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<SettingOption {...props} />);

describe("<SettingOption />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText(defaultProps.text)).toBeTruthy();
			expect(screen.getByText("any_icon")).toBeTruthy();
		});
	});
});
