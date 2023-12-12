import { renderHook } from "@testing-library/react-hooks";

import {
	useGetIncompleteBreathingExercises,
	type UseGetIncompleteBreathingExercisesParams,
} from "./use-get-incomplete-breathing-exercises";
import { getDayOfTheWeek } from "@/helpers/get-day-of-the-week";

const executeHook = (params: UseGetIncompleteBreathingExercisesParams) =>
	renderHook(() => useGetIncompleteBreathingExercises(params));

describe("useGetIncompleteBreathingExercises", () => {
	const day = new Date().getDay();

	describe("Return Values", () => {
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
					createMockExercise({ roundsCompleted: 1, roundsTotal: 2 }),
					createMockExercise({ roundsCompleted: 1, roundsTotal: 1 }),
				],
				incomplete: [
					createMockExercise({ roundsCompleted: 1, roundsTotal: 2 }),
				],
			};
			const appointments = {
				all: [
					{
						...createMockExercise({ roundsCompleted: 2, roundsTotal: 4 }),
						scheduled_at: {
							days: [getDayOfTheWeek(day === 0 ? day + 1 : day - 1)],
						},
					},
					{
						...createMockExercise({ roundsCompleted: 1, roundsTotal: 2 }),
						scheduled_at: { days: [getDayOfTheWeek(day)] },
					},
				],
				incomplete: [
					{
						...createMockExercise({ roundsCompleted: 1, roundsTotal: 2 }),
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
