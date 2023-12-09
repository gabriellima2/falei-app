import { Text } from "react-native";
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
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Render", () => {
		function expectOptionsToHaveBeenPresent() {
			const { items } = defaultProps;
			expect(screen.getAllByTestId("options-item")).toHaveLength(items!.length);
		}

		it("should render correctly without 'additional' props", () => {
			renderComponent();

			expectOptionsToHaveBeenPresent();
		});
		it("should render correctly with 'additional' props", () => {
			const ADDITIONAL_CONTENT_TEXT = "any_text";
			renderComponent({
				...defaultProps,
				additional: () => <Text>any_text</Text>,
			});

			expectOptionsToHaveBeenPresent();
			expect(screen.findByText(ADDITIONAL_CONTENT_TEXT)).toBeTruthy();
		});
	});
});
