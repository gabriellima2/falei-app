import { act, renderHook } from "@testing-library/react-hooks";
import type { UseQueryResult } from "react-query";

import { useExercisesState } from "./use-exercises-state";
import * as GetExercisesByCategory from "@/hooks/use-get-exercises-by-category";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { ExerciseEntity } from "@/entities/exercise.entity";

const useGetExercisesByCategorySpy = jest.spyOn(
	GetExercisesByCategory,
	"useGetExercisesByCategory"
);

const executeHook = () => renderHook(useExercisesState);

describe("useExercisesState", () => {
	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			useGetExercisesByCategorySpy.mockReturnValue({
				data: [] as ExerciseEntity[],
				error: undefined,
				isLoading: false,
			} as UseQueryResult<ExerciseEntity[]>);
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
			expect(category).toBe(ExerciseCategoryEntity.Breathing);
			expect(exercises).toMatchObject([]);
			expect(isLoading).toBeFalsy();
		});
	});
	describe("Interactions", () => {
		it("should change category value", () => {
			const { result } = executeHook();
			const oldCategory = ExerciseCategoryEntity.Breathing;
			const newCategory = ExerciseCategoryEntity.Poem;

			expect(result.current.category).toBe(oldCategory);

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

			expect(result.current.category).toBe(ExerciseCategoryEntity.Breathing);
		});
	});
});
