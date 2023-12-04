import { screen } from "@testing-library/react-native";

import { Exercise, type ExerciseProps } from "./Exercise";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: ExerciseProps = {
	id: "any_id",
	title: "any_title",
	rounds: { completed: 3, total: 6 },
	href: { pathname: "any_path" },
};
const renderComponent = (props: ExerciseProps = defaultProps) =>
	renderWithThemeProvider(<Exercise {...props} />);

describe("<Exercise />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const progressEl = screen.getByTestId("current-progress");

			expect(screen.getByText(defaultProps.title)).toBeTruthy();
			expect(screen.getByText("Continuar")).toBeTruthy();
			expect(progressEl.props.width).toBe("50%");
		});
	});
});
