import { screen } from "@testing-library/react-native";

import { Options, type OptionsProps } from "./Options";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";

const defaultProps: OptionsProps = {
	items: [
		{
			text: "any_text",
			href: { pathname: "any_pathname" },
			icon: () => <FakeIconComponent icon="any_icon" />,
		},
	],
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<Options {...props} />);

describe("<Options />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { items } = defaultProps;

			expect(screen.getAllByTestId("options-item")).toHaveLength(items!.length);
		});
	});
});
