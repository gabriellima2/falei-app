import { renderHook } from "@testing-library/react-hooks";

import { useOrderExercisesByLastProgress } from "./use-order-exercises-by-last-progress";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const executeHook = (params: BreathingExerciseEntity[]) =>
	renderHook(() => useOrderExercisesByLastProgress(params));

describe("useOrderExercisesByLastProgress", () => {
	describe("Return Values", () => {
		const fakeExercises = {
			first: { lastProgressAt: { nanoseconds: 5, seconds: 5 } },
			middle: { lastProgressAt: { nanoseconds: 50, seconds: 50 } },
			last: { lastProgressAt: { nanoseconds: 500, seconds: 500 } },
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
