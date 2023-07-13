import { screen } from "@testing-library/react-native";

import { CreateAccount } from "./CreateAccount";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const renderComponent = () => renderWithThemeProvider(<CreateAccount />);

describe("<CreateAccount />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Criar conta")).toBeTruthy();
			expect(screen.getByText("Continuar sem conta")).toBeTruthy();
			expect(
				screen.getByText("Bem-vindo! Crie uma conta para continuar")
			).toBeTruthy();
		});
	});
});
