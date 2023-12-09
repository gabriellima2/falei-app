import { screen } from "@testing-library/react-native";

import { ReadExercise, type ReadExerciseProps } from "./ReadExercise";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: ReadExerciseProps = {
	id: "1",
	content: "any_content",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<ReadExercise {...props} />);

describe("<ReadExercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText(defaultProps.content)).toBeTruthy();
		});
	});
});
