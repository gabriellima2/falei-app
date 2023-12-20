import * as ReactQuery from "react-query";
import { screen } from "@testing-library/react-native";

import { Exercises } from "./Exercises";
import * as ExercisesState from "./hooks/use-exercises-state";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { WithQueryClientProvider } from "@/__mocks__/with-query-client-provider";
import { breathingResponseMock } from "@/__mocks__/breathing-response-mock";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { categoriesPortuguese } from "@/constants/categories-portuguese";
import { exerciseCategories } from "./constants/exercise-categories";

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(),
}));

const useExercisesStateSpy = jest.spyOn(ExercisesState, "useExercisesState");

const renderComponent = () =>
	renderWithThemeProvider(
		<WithQueryClientProvider>
			<Exercises data={{ appointments: [], exercises: [] }} />
		</WithQueryClientProvider>
	);

describe("<Exercises />", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(ReactQuery, "useQuery").mockImplementationOnce(
			jest.fn().mockReturnValue({
				isLoading: false,
				error: null,
				data: [],
			})
		);
	});

	const USE_EXERCISES_STATE_DEFAULT_RETURN: ExercisesState.UseExercisesStateReturn =
		{
			category: ExerciseCategoryEntity.Incomplete,
			error: undefined,
			exercises: undefined,
			isLoading: false,
			handleCategoryChange: jest.fn(),
		};

	describe("Render", () => {
		const getExercisesEl = () => screen.queryAllByTestId("exercise");
		const getLoadingEl = () => screen.queryByLabelText("Carregando...");
		const getErrorEl = () => screen.queryByRole("alert");

		function expectStaticElementsToHaveBeenPresent() {
			expect(screen.getByText("Exercícios")).toBeTruthy();
			expect(screen.getByTestId("categories")).toBeTruthy();
			expect(screen.getAllByTestId("check-option")).toHaveLength(
				exerciseCategories.length
			);
		}

		function expectExercisesToHaveBeenPresentWith(quantity: number) {
			expect(getExercisesEl()).toHaveLength(quantity);
		}

		it("should render loading when 'useExercisesState' return 'isLoading' with true value", () => {
			useExercisesStateSpy.mockReturnValue({
				...USE_EXERCISES_STATE_DEFAULT_RETURN,
				isLoading: true,
			});

			renderComponent();

			expectStaticElementsToHaveBeenPresent();
			expectExercisesToHaveBeenPresentWith(0);
			expect(getLoadingEl()).toBeTruthy();
			expect(getErrorEl()).toBeFalsy();
		});
		it("should render error when 'useExercisesState' return an error", () => {
			const ERROR_MESSAGE = "any_message";
			useExercisesStateSpy.mockReturnValue({
				...USE_EXERCISES_STATE_DEFAULT_RETURN,
				error: new Error(ERROR_MESSAGE),
			});

			renderComponent();

			expectStaticElementsToHaveBeenPresent();
			expectExercisesToHaveBeenPresentWith(0);
			expect(getErrorEl()).toBeTruthy();
			expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
			expect(getLoadingEl()).toBeFalsy();
		});
		it("should render exercises when 'useExercisesState' return 'exercises' correctly", () => {
			const EXERCISES = breathingResponseMock.exercises;
			const EXERCISES_TOTAL = EXERCISES.length;
			const CATEGORY_TITLE = categoriesPortuguese.breathing_exercises;
			useExercisesStateSpy.mockReturnValue({
				...USE_EXERCISES_STATE_DEFAULT_RETURN,
				category: ExerciseCategoryEntity.Breathing,
				exercises: EXERCISES,
			});

			renderComponent();

			expectStaticElementsToHaveBeenPresent();
			expectExercisesToHaveBeenPresentWith(EXERCISES_TOTAL);
			expect(screen.getAllByText(CATEGORY_TITLE)[1]).toBeTruthy();
			expect(getLoadingEl()).toBeFalsy();
			expect(getErrorEl()).toBeFalsy();
		});
		it("should render incomplete exercises when 'useExercisesState' return 'exercises' correctly", () => {
			const INCOMPLETE_EXERCISES = [breathingResponseMock.exercises[0]];
			const EXERCISES_TOTAL = INCOMPLETE_EXERCISES.length;
			const CATEGORY_TITLE = categoriesPortuguese.incomplete;
			useExercisesStateSpy.mockReturnValue({
				...USE_EXERCISES_STATE_DEFAULT_RETURN,
				exercises: INCOMPLETE_EXERCISES,
			});

			renderComponent();

			expectStaticElementsToHaveBeenPresent();
			expectExercisesToHaveBeenPresentWith(EXERCISES_TOTAL);
			expect(screen.getAllByText(CATEGORY_TITLE)[1]).toBeTruthy();
			expect(getLoadingEl()).toBeFalsy();
			expect(getErrorEl()).toBeFalsy();
		});
	});
});
