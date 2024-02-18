import { renderHook } from "@testing-library/react-hooks";

import {
	useFindIncompleteBreathingExercises,
	type UseFindIncompleteBreathingExercisesParams,
} from "./use-find-incomplete-breathing-exercises";

import { createFakeRoundExercise } from "@/test-utils/create-fake-round-exercise";

const executeHook = (params: UseFindIncompleteBreathingExercisesParams) =>
	renderHook(() => useFindIncompleteBreathingExercises(params));

describe("useFindIncompleteBreathingExercises", () => {
	describe("Return Values", () => {
		const exercises = [
			{
				id: "3",
				...createFakeRoundExercise({
					roundsCompleted: 1,
					roundsTotal: 2,
				}),
			},
			{
				id: "1",
				...createFakeRoundExercise({
					roundsCompleted: 2,
					roundsTotal: 4,
				}),
			},
		];
		const appointments = [
			{
				id: "1",
				exerciseID: exercises[0].id,
				rounds: exercises[0].rounds,
				lastProgressAt: exercises[0].lastProgressAt,
				scheduledAt: { days: [new Date().getDay()] },
			},
		];

		it("should return the initial values correctly", () => {
			const { result } = executeHook({ exercises: [], appointments: [] });
			expect(typeof result.current).toBe("object");
		});
		const cases = [
			{
				params: { exercises, appointments },
				result: [appointments[0], exercises[1]],
			},
			{
				params: { exercises, appointments: [] },
				result: [...exercises],
			},
			{
				params: { exercises: [], appointments },
				result: [...appointments],
			},
			{
				params: { exercises: [], appointments: [] },
				result: [],
			},
		];
		test.each(cases)(
			"should return the data correctly",
			({ params, result }) => {
				const {
					result: { current },
				} = executeHook(params as UseFindIncompleteBreathingExercisesParams);

				expect(current).toMatchObject(result);
			}
		);
	});
});
