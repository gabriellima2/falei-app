import { act, renderHook } from "@testing-library/react-hooks";
import type { UseQueryResult } from "react-query";

import {
	useExercisesState,
	type UseExercisesStateParams,
	type UseExercisesStateReturn,
} from "./use-exercises-state";
import * as FindIncompleteBreathingExercises from "@/hooks/use-find-incomplete-breathing-exercises";
import * as GetExercisesByCategory from "@/hooks/use-get-exercises-by-category";

import { breathingResponseMock } from "@/__mocks__/breathing-response-mock";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { ExerciseEntity } from "@/entities/exercise.entity";

const useGetExercisesByCategorySpy = jest.spyOn(
	GetExercisesByCategory,
	"useGetExercisesByCategory"
);

const useFindIncompleteBreathingExercisesSpy = jest.spyOn(
	FindIncompleteBreathingExercises,
	"useFindIncompleteBreathingExercises"
);

const defaultParams: UseExercisesStateParams = {
	...breathingResponseMock,
	initialCategory: ExerciseCategoryEntity.Incomplete,
};

const executeHook = (params = defaultParams) =>
	renderHook(() => useExercisesState(params));

describe("useExercisesState", () => {
	describe("Return Values", () => {
		const exercises = {
			all: [breathingResponseMock.exercises[1]],
			incomplete: [breathingResponseMock.exercises[0]],
		};
		const getExercisesByCategoryDefaultReturn = {
			data: [] as ExerciseEntity[],
			error: undefined,
			isLoading: false,
		} as UseQueryResult<ExerciseEntity[]>;

		function expectReturnHaveBeenSuccessful(
			current: Pick<
				UseExercisesStateReturn,
				"exercises" | "category" | "isLoading"
			>,
			values: { category: ExerciseCategoryEntity; exercises: ExerciseEntity[] }
		) {
			const { category, exercises, isLoading } = current;
			expect(category).toBe(values.category);
			expect(exercises).toMatchObject(values.exercises);
			expect(isLoading).toBeFalsy();
		}

		it("should return the initial values correctly", () => {
			useFindIncompleteBreathingExercisesSpy.mockReturnValue([]);
			useGetExercisesByCategorySpy.mockReturnValue(
				getExercisesByCategoryDefaultReturn
			);

			const { result } = executeHook();

			const {
				current: {
					exercises,
					error,
					isLoading,
					category,
					handleCategoryChange,
				},
			} = result;

			expect(typeof exercises).toBe("object");
			expect(typeof error).toBe("undefined");
			expect(typeof isLoading).toBe("boolean");
			expect(typeof category).toBe("string");
			expect(typeof handleCategoryChange).toBe("function");
			expectReturnHaveBeenSuccessful(result.current, {
				category: defaultParams.initialCategory,
				exercises: [],
			});
		});
		it("should return the exercises filled with incomplete exercises when category is 'incomplete'", () => {
			useFindIncompleteBreathingExercisesSpy.mockReturnValue(
				exercises.incomplete
			);
			useGetExercisesByCategorySpy.mockReturnValue({
				...getExercisesByCategoryDefaultReturn,
				data: exercises.all,
			} as UseQueryResult<ExerciseEntity[]>);

			const { result } = executeHook();

			expectReturnHaveBeenSuccessful(result.current, {
				category: defaultParams.initialCategory,
				exercises: exercises.incomplete,
			});
		});
		it("should return the exercises filled with all exercises when category is anything other than 'incomplete'", () => {
			useFindIncompleteBreathingExercisesSpy.mockReturnValue(
				exercises.incomplete
			);
			useGetExercisesByCategorySpy.mockReturnValue({
				...getExercisesByCategoryDefaultReturn,
				data: exercises.all,
			} as UseQueryResult<ExerciseEntity[]>);

			const INITIAL_CATEGORY = ExerciseCategoryEntity.Breathing;
			const { result } = executeHook({
				...defaultParams,
				initialCategory: INITIAL_CATEGORY,
			});

			expectReturnHaveBeenSuccessful(result.current, {
				category: INITIAL_CATEGORY,
				exercises: exercises.all,
			});
		});
	});
	describe("Interactions", () => {
		describe("HandleCategoryChange", () => {
			it("should change category value", () => {
				const { result } = executeHook();
				const previousCategory = ExerciseCategoryEntity.Incomplete;
				const newCategory = ExerciseCategoryEntity.Poem;

				expect(result.current.category).toBe(previousCategory);

				act(() => {
					result.current.handleCategoryChange(newCategory);
				});

				expect(result.current.category).toBe(newCategory);
			});
			it("should not change category value when the parameter passed is empty", () => {
				const { result } = executeHook();

				act(() => {
					result.current.handleCategoryChange("" as ExerciseCategoryEntity);
				});

				expect(result.current.category).toBe(ExerciseCategoryEntity.Incomplete);
			});
		});
	});
});
