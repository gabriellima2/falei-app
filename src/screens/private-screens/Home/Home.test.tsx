import { screen } from "@testing-library/react-native";

import { Home } from "./Home";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const renderComponent = () => renderWithThemeProvider(<Home />);

describe("<Home />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Próximo lembrete")).toBeTruthy();
			expect(screen.getByText("Em progresso")).toBeTruthy();
			expect(screen.getByText("Exercícios")).toBeTruthy();
			expect(screen.getByText("Ver Mais")).toBeTruthy();
		});
	});
});
