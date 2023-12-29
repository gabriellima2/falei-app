import { renderHook } from "@testing-library/react-hooks";

import {
	useFindIncompleteBreathingExercises,
	type UseFindIncompleteBreathingExercisesParams,
} from "./use-find-incomplete-breathing-exercises";

import { createFakeRoundExercise } from "@/__mocks__/create-fake-round-exercise";

const executeHook = (params: UseFindIncompleteBreathingExercisesParams) =>
	renderHook(() => useFindIncompleteBreathingExercises(params));

describe("useFindIncompleteBreathingExercises", () => {
	const day = new Date().getDay();

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook({ exercises: [], appointments: [] });

			const { current } = result;

			expect(typeof current).toBe("object");
		});
		it("should return 'incomplete exercises' correctly", () => {
			const exercises = {
				all: [
					createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
					createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 1 }),
				],
				incomplete: [
					createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
				],
			};
			const appointments = {
				all: [
					{
						...createFakeRoundExercise({ roundsCompleted: 2, roundsTotal: 4 }),
						scheduledAt: {
							days: [day === 0 ? day + 1 : day - 1],
						},
					},
					{
						...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						scheduledAt: { days: [day] },
					},
				],
				incomplete: [
					{
						...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						scheduledAt: { days: [new Date().getDay()] },
					},
				],
			};
			const {
				result: { current },
			} = executeHook({
				exercises: exercises.all,
				appointments: appointments.all,
			} as UseFindIncompleteBreathingExercisesParams);

			expect(current).toMatchObject([
				...exercises.incomplete,
				...appointments.incomplete,
			]);
		});
	});
});
