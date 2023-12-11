import { fireEvent, screen } from "@testing-library/react-native";

import { Exercises } from "./Exercises";
import * as ExercisesState from "./hooks/use-exercises-state";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { BreathingExerciseEntity } from "@/entities/breathing-entities";
import { categoriesPortuguese } from "@/constants/categories-portuguese";

const useExercisesStateSpy = jest.spyOn(ExercisesState, "useExercisesState");

const renderComponent = () => renderWithThemeProvider(<Exercises />);

describe("<Exercises />", () => {
	const defaultCategory = ExerciseCategoryEntity.Breathing;
	const useExercisesStateDefaultReturn: ExercisesState.UseExercisesStateReturn =
		{
			isLoading: false,
			exercises: undefined,
			error: undefined,
			category: defaultCategory,
			handleCategoryChange: jest.fn(),
		};

	const getLoadingEl = () => screen.queryByLabelText("Carregando...");
	const getExerciseEls = () => screen.queryAllByTestId("exercise");
	const getErrorEl = () => screen.queryByRole("alert");

	describe("Render", () => {
		function expectStaticElsToHaveBeenPresent() {
			expect(screen.getByText("Exercícios")).toBeTruthy();
			expect(screen.getByTestId("categories")).toBeTruthy();
		}

		it("should render correctly when is loading", () => {
			useExercisesStateSpy.mockReturnValue({
				...useExercisesStateDefaultReturn,
				isLoading: true,
			});
			renderComponent();

			expectStaticElsToHaveBeenPresent();
			expect(getExerciseEls()).toHaveLength(0);
			expect(getLoadingEl()).toBeTruthy();
			expect(getErrorEl()).toBeFalsy();
		});
		it("should render correctly when there is an error", () => {
			const ERROR_MESSAGE = "any_error";
			useExercisesStateSpy.mockReturnValue({
				...useExercisesStateDefaultReturn,
				error: ERROR_MESSAGE,
			});
			renderComponent();

			expectStaticElsToHaveBeenPresent();
			expect(getExerciseEls()).toHaveLength(0);
			expect(getLoadingEl()).toBeFalsy();
			expect(getErrorEl()).toBeTruthy();
			expect(screen.findByText(ERROR_MESSAGE)).toBeTruthy();
		});
		it("should render correctly when 'exercises' are returned", () => {
			const EXERCISES = [
				{
					id: "1",
					title: "any_title",
					category: ExerciseCategoryEntity.Breathing,
					rounds: {
						duration_per_round_in_min: 1,
						rounds_completed: 2,
						rounds_total: 3,
					},
				},
			] as BreathingExerciseEntity[];
			useExercisesStateSpy.mockReturnValue({
				...useExercisesStateDefaultReturn,
				exercises: EXERCISES,
			});
			renderComponent();

			const categoryTitle = categoriesPortuguese[defaultCategory];

			expectStaticElsToHaveBeenPresent();
			expect(getExerciseEls()).toHaveLength(EXERCISES.length);
			expect(screen.getAllByText(categoryTitle)[1]).toBeTruthy();
			expect(getLoadingEl()).toBeFalsy();
			expect(getErrorEl()).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("HandleCategoryChange", () => {
				const getCategoryOptionEls = () =>
					screen.getAllByTestId("check-option");

				it("should call the 'handleCategoryChange' function when category has changed", () => {
					const mockHandleCategoryChange = jest.fn();
					useExercisesStateSpy.mockReturnValue({
						...useExercisesStateDefaultReturn,
						handleCategoryChange: mockHandleCategoryChange,
					});
					renderComponent();

					const category = ExerciseCategoryEntity.TongueTwister;
					const [, option] = getCategoryOptionEls();
					fireEvent.press(option);

					expect(mockHandleCategoryChange).toHaveBeenCalled();
					expect(mockHandleCategoryChange).toHaveBeenCalledWith(category);
				});
			});
		});
	});
});
