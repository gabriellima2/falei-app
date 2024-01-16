import { renderHook } from "@testing-library/react-hooks";

import { useGetIncompleteExercises } from ".";

import { createFakeRoundExercise } from "@/__mocks__/create-fake-round-exercise";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const executeHook = (
	exercises: BreathingExerciseEntity[],
	additional?: jest.Mock
) => renderHook(() => useGetIncompleteExercises(exercises, additional));

describe("UseIncompleteBreathingExercises", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook([]);

			expect(typeof result.current).toBe("object");
		});
		it("should return a empty array when exercises is empty", () => {
			const { result } = executeHook([] as BreathingExerciseEntity[]);
			expect(result.current).toMatchObject([]);
		});
	});
	describe("Interactions", () => {
		describe("Get Incomplete Exercises", () => {
			const cases = [
				{
					params: {
						exercises: [
							createFakeRoundExercise({ roundsCompleted: 0, roundsTotal: 1 }),
							createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
							createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 1 }),
						],
					},
					result: [
						createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
					],
				},
				{
					params: {
						exercises: [
							createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 3 }),
						],
						additional: jest.fn().mockReturnValue(true),
					},
					result: [
						createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 3 }),
					],
				},
				{
					params: {
						exercises: [
							createFakeRoundExercise({ roundsCompleted: 0, roundsTotal: 3 }),
						],
					},
					result: [],
				},
			];
			test.each(cases)(
				"should handle exercises correctly",
				({ params, result }) => {
					const { current } = executeHook(
						params.exercises as BreathingExerciseEntity[],
						params.additional
					).result;

					if (!result) {
						expect(current).toBeUndefined();
					} else {
						expect(current).toMatchObject(result);
					}
					if (params.additional) {
						expect(params.additional).toHaveBeenCalled();
					}
				}
			);
		});
	});
});
