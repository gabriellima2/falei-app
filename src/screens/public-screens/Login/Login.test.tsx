import { screen } from "@testing-library/react-native";

import { Login } from "./Login";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const renderComponent = () => renderWithThemeProvider(<Login />);

describe("<Login />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Entrar")).toBeTruthy();
			expect(
				screen.getByText("Olá, novamente! Entre para continuar")
			).toBeTruthy();
		});
	});
});
