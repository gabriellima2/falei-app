import { screen } from "@testing-library/react-native";

import { Item, type ItemProps } from "./Item";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: ItemProps = {
	title: "any_title",
	description: "any_description",
	img: { src: "any_src", alt: "any_alt" },
};

const renderComponent = () =>
	renderWithThemeProvider(<Item {...defaultProps} />);

describe("<Onboarding />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { title, description, img } = defaultProps;

			expect(screen.getByLabelText(img.alt)).toBeTruthy();
			expect(screen.getByText(title)).toBeTruthy();
			expect(screen.getByText(description)).toBeTruthy();
		});
	});
});
