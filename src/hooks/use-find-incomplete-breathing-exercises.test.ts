import { renderHook } from "@testing-library/react-hooks";

import {
	useFindIncompleteBreathingExercises,
	type UseFindIncompleteBreathingExercisesParams,
} from "./use-find-incomplete-breathing-exercises";

import { createFakeRoundExercise } from "@/__mocks__/create-fake-round-exercise";

const executeHook = (params: UseFindIncompleteBreathingExercisesParams) =>
	renderHook(() => useFindIncompleteBreathingExercises(params));

describe("useFindIncompleteBreathingExercises", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook({ exercises: [], appointments: [] });
			expect(typeof result.current).toBe("object");
		});
		it("should return 'incomplete data' correctly", () => {
			const incompleteExercises = [
				{
					id: "3",
					...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
				},
				{
					id: "1",
					...createFakeRoundExercise({ roundsCompleted: 2, roundsTotal: 4 }),
				},
			];
			const incompleteAppointments = [
				{
					id: "1",
					exerciseID: "3",
					...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
					scheduledAt: { days: [new Date().getDay()] },
				},
			];
			const {
				result: { current },
			} = executeHook({
				exercises: incompleteExercises,
				appointments: incompleteAppointments,
			} as UseFindIncompleteBreathingExercisesParams);

			expect(current).toMatchObject([
				...incompleteAppointments,
				incompleteExercises[1],
			]);
		});
	});
});
