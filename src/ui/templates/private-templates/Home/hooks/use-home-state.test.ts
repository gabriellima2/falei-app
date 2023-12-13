import { renderHook } from "@testing-library/react-hooks";

import { useHomeState } from "./use-home-state";

import * as useGetIncompleteBreathingExercises from "./use-get-incomplete-breathing-exercises";
import * as useGetAppointments from "../../../../../hooks/use-get-appointments";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

const useGetAppointmentsSpyOn = jest.spyOn(
	useGetAppointments,
	"useGetAppointments"
);
const useGetIncompleteBreathingExercisesSpyOn = jest.spyOn(
	useGetIncompleteBreathingExercises,
	"useGetIncompleteBreathingExercises"
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
	describe("Default", () => {
		it("should return correctly with values", () => {
			useGetAppointmentsSpyOn.mockReturnValue(mock.appointments);
			useGetIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(mock);

			const { result } = executeHook();

			expect(result.current.title).toBeTruthy();
			expect(result.current.incompleteExercises).toMatchObject([
				...mock.exercises,
				...mock.appointments,
			]);
			expect(result.current.filteredAppointments).toMatchObject(
				mock.appointments
			);
		});
		it("should return correctly when hooks return empty values", () => {
			useGetAppointmentsSpyOn.mockReturnValue([]);
			useGetIncompleteBreathingExercisesSpyOn.mockReturnValueOnce({
				exercises: [],
				appointments: [],
			});

			const { result } = executeHook();

			expect(result.current.title).toBe(
				"Torne um exercício parte de sua rotina"
			);
			expect(result.current.filteredAppointments).toMatchObject([]);
			expect(result.current.incompleteExercises).toMatchObject([]);
		});
	});

	describe("useGetIncompleteExercises", () => {
		const cases = [
			{
				mock: { exercises: mock.exercises, appointments: [] },
				expected: mock.exercises,
			},
			{
				mock: { appointments: mock.appointments, exercises: [] },
				expected: mock.appointments,
			},
			{ mock, expected: [...mock.exercises, ...mock.appointments] },
		];
		test.each(cases)(
			"should handle incomplete-exercises correctly",
			({ mock, expected }) => {
				useGetIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(mock);

				const { result } = executeHook();

				expect(result.current.incompleteExercises).toMatchObject(expected);
			}
		);
	});
});
