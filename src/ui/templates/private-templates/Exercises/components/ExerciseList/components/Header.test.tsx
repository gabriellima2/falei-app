import { screen } from "@testing-library/react-native";

import { Header, type HeaderProps } from "./Header";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: HeaderProps = { title: "any_title" };

const renderComponent = () =>
	renderWithThemeProvider(<Header {...defaultProps} />);

describe("<Header />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText(defaultProps.title!)).toBeTruthy();
		});
	});
});
