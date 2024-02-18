import { screen } from "@testing-library/react-native";

import { Header, type HeaderProps } from "./Header";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

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
