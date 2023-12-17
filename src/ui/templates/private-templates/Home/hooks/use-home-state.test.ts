import { renderHook } from "@testing-library/react-hooks";

import { useHomeState } from "./use-home-state";

import * as useFindIncompleteBreathingExercises from "@/hooks/use-find-incomplete-breathing-exercises";
import * as useWeekAppointments from "@/hooks/use-week-appointments";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

const useWeekAppointmentsSpyOn = jest.spyOn(
	useWeekAppointments,
	"useWeekAppointments"
);
const useFindIncompleteBreathingExercisesSpyOn = jest.spyOn(
	useFindIncompleteBreathingExercises,
	"useFindIncompleteBreathingExercises"
);

export const mock = {
	appointments: [
		{
			id: "appointment_1",
			title: "any_title_schedule_1",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[2]], hour: "18:00" },
			rounds: {},
		},
	] as BreathingAppointmentEntity[],
	exercises: [
		{
			id: "exercise_1",
			title: "any_title_exercise",
			rounds: {
				rounds_completed: 1,
				rounds_total: 3,
				duration_per_round_in_min: 10,
			},
		},
	] as BreathingExerciseEntity[],
};

const executeHook = () => renderHook(() => useHomeState(mock));

describe("UseHome", () => {
	describe("Initial Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			const {
				current: { title, weekAppointments, incompleteExercises },
			} = result;

			expect(typeof title).toBe("string");
			expect(typeof weekAppointments).toBe("object");
			expect(typeof incompleteExercises).toBe("object");
		});
		it("should return correctly with values", () => {
			useWeekAppointmentsSpyOn.mockReturnValue(mock.appointments);
			useFindIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(
				mock.exercises
			);

			const { result } = executeHook();

			expect(result.current.title).toBeTruthy();
			expect(result.current.incompleteExercises).toMatchObject(mock.exercises);
			expect(result.current.weekAppointments).toMatchObject(mock.appointments);
		});
		it("should return correctly when hooks return empty values", () => {
			useWeekAppointmentsSpyOn.mockReturnValue([]);
			useFindIncompleteBreathingExercisesSpyOn.mockReturnValueOnce([]);

			const { result } = executeHook();

			expect(result.current.title).toBe(
				"Torne um exercício parte de sua rotina"
			);
			expect(result.current.weekAppointments).toMatchObject([]);
			expect(result.current.incompleteExercises).toMatchObject([]);
		});
	});
});
