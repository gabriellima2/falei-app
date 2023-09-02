import { screen } from "@testing-library/react-native";

import {
	ExerciseInProgress,
	type ExerciseInProgressProps,
} from "./ExerciseInProgress";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: ExerciseInProgressProps<{}> = {
	name: "any_name",
	currentProgress: 0,
	href: { pathname: "any_path" },
};
const renderComponent = (props: ExerciseInProgressProps<{}> = defaultProps) =>
	renderWithThemeProvider(<ExerciseInProgress {...props} />);

describe("<ExerciseInProgress />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const progressEl = screen.getByTestId("current-progress");

			expect(screen.getByText(defaultProps.name)).toBeTruthy();
			expect(screen.getByText("Continuar")).toBeTruthy();
			expect(progressEl.props.width).toBe(`${defaultProps.currentProgress}%`);
		});
	});
});
