import { screen } from "@testing-library/react-native";

import { ExerciseList, type ExerciseListProps } from "./ExerciseList";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

const defaultProps: ExerciseListProps = {
	category: ExerciseCategoryEntity.Poem,
	exercises: [{ id: "any_id" }],
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<ExerciseList {...props} />);

describe("<ExerciseList />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			const { exercises } = defaultProps;

			expect(screen.getByText("Poemas")).toBeTruthy();
			expect(screen.getAllByTestId("exercise")).toHaveLength(exercises.length);
		});
	});
});
