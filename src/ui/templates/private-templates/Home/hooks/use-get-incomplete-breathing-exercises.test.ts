import { renderHook } from "@testing-library/react-hooks";

import {
	useGetIncompleteBreathingExercises,
	type UseGetIncompleteBreathingExercisesParams,
} from "./use-get-incomplete-breathing-exercises";

import { createFakeRoundExercise } from "@/__mocks__/create-fake-round-exercise";
import { getDayOfTheWeek } from "@/helpers/get-day-of-the-week";

const executeHook = (params: UseGetIncompleteBreathingExercisesParams) =>
	renderHook(() => useGetIncompleteBreathingExercises(params));

describe("useGetIncompleteBreathingExercises", () => {
	const day = new Date().getDay();

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook({ exercises: [], appointments: [] });

			const {
				current: { exercises, appointments },
			} = result;

			expect(typeof exercises).toBe("object");
			expect(typeof appointments).toBe("object");
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
						scheduled_at: {
							days: [getDayOfTheWeek(day === 0 ? day + 1 : day - 1)],
						},
					},
					{
						...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						scheduled_at: { days: [getDayOfTheWeek(day)] },
					},
				],
				incomplete: [
					{
						...createFakeRoundExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						scheduled_at: { days: [getDayOfTheWeek(new Date().getDay())] },
					},
				],
			};
			const {
				result: { current },
			} = executeHook({
				exercises: exercises.all,
				appointments: appointments.all,
			} as UseGetIncompleteBreathingExercisesParams);

			expect(current.exercises).toMatchObject(exercises.incomplete);
			expect(current.appointments).toMatchObject(appointments.incomplete);
		});
	});
});
