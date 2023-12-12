import { renderHook } from "@testing-library/react-hooks";

import { useGetExercisesOrderedByLastProgress } from "./use-get-exercises-ordered-by-last-progress";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const executeHook = (params: BreathingExerciseEntity[]) =>
	renderHook(() => useGetExercisesOrderedByLastProgress(params));

describe("useGetExercisesOrderedByLastProgress", () => {
	describe("Initial Values", () => {
		const fakeExercises = {
			first: { last_progress_at: { nanoseconds: 5, seconds: 5 } },
			middle: { last_progress_at: { nanoseconds: 50, seconds: 50 } },
			last: { last_progress_at: { nanoseconds: 500, seconds: 500 } },
		};
		const orderedExercises = [
			fakeExercises.first,
			fakeExercises.middle,
			fakeExercises.last,
		] as BreathingExerciseEntity[];

		it("should return the initial values correctly", () => {
			const { result } = executeHook([]);

			expect(typeof result.current).toBe("object");
			expect(result.current).toMatchObject([]);
		});
		it("should return ordered data when an disordered parameter is passed", () => {
			const { result } = executeHook([
				fakeExercises.last,
				fakeExercises.first,
				fakeExercises.middle,
			] as BreathingExerciseEntity[]);

			expect(result.current).toMatchObject(orderedExercises);
		});
		it("should return ordered data when an already ordered parameter is passed", () => {
			const { result } = executeHook(orderedExercises);

			expect(result.current).toMatchObject(orderedExercises);
		});
	});
});
