import { renderHook } from "@testing-library/react-hooks";

import { useGetIncompleteExercises } from "./use-get-incomplete-exercises";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const executeHook = (
	exercises: BreathingExerciseEntity[],
	additional?: jest.Mock
) => renderHook(() => useGetIncompleteExercises(exercises, additional));

describe("UseIncompleteBreathingExercises", () => {
	describe("Valid", () => {
		type CreateMockExerciseParams = {
			roundsCompleted: number;
			roundsTotal: number;
		};

		const createMockExercise = (params: CreateMockExerciseParams) => {
			const { roundsCompleted, roundsTotal } = params;
			return {
				rounds: {
					rounds_completed: roundsCompleted,
					rounds_total: roundsTotal,
				},
			};
		};

		const cases = [
			{
				params: {
					exercises: [
						createMockExercise({ roundsCompleted: 0, roundsTotal: 1 }),
						createMockExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						createMockExercise({ roundsCompleted: 1, roundsTotal: 1 }),
					],
				},
				result: [createMockExercise({ roundsCompleted: 1, roundsTotal: 2 })],
			},
			{
				params: {
					exercises: [
						createMockExercise({ roundsCompleted: 1, roundsTotal: 3 }),
					],
					additional: jest.fn().mockReturnValue(true),
				},
				result: [createMockExercise({ roundsCompleted: 1, roundsTotal: 3 })],
			},
			{
				params: {
					exercises: [
						createMockExercise({ roundsCompleted: 0, roundsTotal: 3 }),
					],
				},
				result: undefined,
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
	describe("Invalid", () => {
		const cases = [undefined, []];
		test.each(cases)(
			"should return undefined when exercises is empty",
			(param) => {
				const { result } = executeHook(param as BreathingExerciseEntity[]);
				expect(result.current).toBeUndefined();
			}
		);
	});
});
