import { screen } from "@testing-library/react-native";

import { SelectExerciseType } from "./SelectExerciseType";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const renderComponent = () => renderWithThemeProvider(<SelectExerciseType />);

describe("<SelectExerciseType />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Respiração")).toBeTruthy();
			expect(screen.getByText("Poema")).toBeTruthy();
			expect(screen.getByText("Trava-Língua")).toBeTruthy();
		});
	});
});
